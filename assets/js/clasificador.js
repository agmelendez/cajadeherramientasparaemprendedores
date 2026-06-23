// --- CLASIFICADOR.JS ---

const Clasificador = {
  calcular(respuestas, preguntas) {
    const puntajes = {
      CD: 0,
      AIA: 0,
      AT: 0,
      CUB: 0,
      CME: 0
    };

    const maximos = {
      CD: 0,
      AIA: 0,
      AT: 0,
      CUB: 0,
      CME: 0
    };

    // Sum weights and values for each dimension
    preguntas.forEach(q => {
      const valor = respuestas[q.id];
      if (valor !== undefined && valor !== null) {
        // Skip q20 and q21 for numeric score calculation of dimensions as they are categorical/qualitative
        if (q.id === 'q20' || q.id === 'q21') return;

        const peso = q.peso || 1.0;
        const maxVal = 4; // Likert scale max is 4

        puntajes[q.dimension] += Number(valor) * peso;
        maximos[q.dimension] += maxVal * peso;
      }
    });

    // Calculate percentages
    const dimensiones = ['CD', 'AIA', 'AT', 'CUB', 'CME'];
    const resultadoPuntajes = {};
    
    dimensiones.forEach(d => {
      if (maximos[d] > 0) {
        resultadoPuntajes[d] = Math.round((puntajes[d] / maximos[d]) * 100);
      } else {
        resultadoPuntajes[d] = 0;
      }
    });

    // Determine Senda de Acompañamiento
    let senda = 'acelerada';
    let nivelacionRequerida = false;
    
    if (resultadoPuntajes.CD < 45 || resultadoPuntajes.AIA < 35 || resultadoPuntajes.AT < 40) {
      senda = 'guiada';
      nivelacionRequerida = true;
    } else if (resultadoPuntajes.CD >= 65 && resultadoPuntajes.AIA >= 65 && resultadoPuntajes.AT >= 60) {
      senda = 'profunda';
    }

    // Determine Módulo Inicial Sugerido
    let moduloInicial = 'm1';
    let justificacion = [];
    let modulosRecomendados = [];
    let modulosNoPrioritarios = [];
    let testOutSugerido = [];
    let ayudasActivas = [];

    const q16Val = Number(respuestas['q16']); // stage
    const q18Val = Number(respuestas['q18']); // validation
    const q19Val = Number(respuestas['q19']); // registration
    const q13Val = Number(respuestas['q13']); // repetitive load
    const q14Val = Number(respuestas['q14']); // marketing/sales/data interest
    const q20Val = Number(respuestas['q20']); // main urgency

    // Rules matching
    if (resultadoPuntajes.CD < 35 || resultadoPuntajes.AIA < 25) {
      moduloInicial = 'm1'; // start M1 but suggest leveler
      justificacion.push("Dado que sus competencias digitales o de IA están en fase inicial, le sugerimos avanzar con apoyo constante y consultar el glosario interactivo.");
      ayudasActivas.push("glosario-basico", "nivelacion-basica");
    } else if (q20Val === 1) {
      moduloInicial = 'm1';
      justificacion.push("Recomendado por su urgencia declarada en validar su idea o propuesta de mercado.");
    } else if (q20Val === 2) {
      moduloInicial = 'm2';
      justificacion.push("Recomendado por su urgencia declarada en diagnosticar su empresa y ordenar sus números básicos.");
    } else if (q20Val === 3 && resultadoPuntajes.CD >= 50 && resultadoPuntajes.AT >= 50) {
      moduloInicial = 'm3';
      justificacion.push("Recomendado por su urgencia declarada en automatizar procesos y ahorrar tiempo, contando con las competencias tecnológicas requeridas.");
    } else if (q20Val === 4) {
      moduloInicial = 'm4';
      justificacion.push("Recomendado por su urgencia declarada en mejorar ventas, copy comercial y decidir con datos.");
    } else if ((q16Val === 0 || q16Val === 1) && q18Val <= 2) {
      moduloInicial = 'm1';
      justificacion.push("Su negocio se encuentra en etapa de idea o diseño inicial y requiere validar si existe un mercado real y clientes interesados antes de invertir capital.");
    } else if ((q16Val >= 2) && q19Val <= 2) {
      moduloInicial = 'm2';
      justificacion.push("Su negocio ya está operando y generando ventas, pero es crítico realizar un diagnóstico FODA detallado y organizar el registro financiero básico.");
    } else if (q13Val >= 3 && resultadoPuntajes.CD >= 50 && resultadoPuntajes.AT >= 50) {
      moduloInicial = 'm3';
      justificacion.push("Usted tiene procesos operativos lentos o repetitivos y cuenta con la base tecnológica y digital ideal para aprender a automatizar con Make y chatbots.");
    } else if (q14Val >= 3) {
      moduloInicial = 'm4';
      justificacion.push("Su prioridad actual se enfoca en escalar ventas, diseñar copy comercial estructurado (AIDA) y analizar datos comerciales para decidir.");
    } else {
      // Fallback default
      moduloInicial = (q16Val >= 2) ? 'm2' : 'm1';
      justificacion.push("Basado en el nivel de madurez y el sector operativo de su negocio.");
    }

    // Warnings on AT (access)
    if (resultadoPuntajes.AT < 45) {
      justificacion.push("⚠️ Advertencia: Su acceso tecnológico o conexión es limitado. Le recomendamos descargar las plantillas para trabajar fuera de línea cuando sea posible.");
      ayudasActivas.push("soporte-offline");
    }

    // Sequence of modules recommendation
    if (moduloInicial === 'm1') {
      modulosRecomendados = ['m1', 'm2', 'm4', 'm3'];
    } else if (moduloInicial === 'm2') {
      modulosRecomendados = ['m2', 'm3', 'm4'];
      modulosNoPrioritarios = ['m1'];
    } else if (moduloInicial === 'm3') {
      modulosRecomendados = ['m3', 'm2', 'm4'];
      modulosNoPrioritarios = ['m1'];
    } else {
      modulosRecomendados = ['m4', 'm2', 'm3'];
      modulosNoPrioritarios = ['m1'];
    }

    // Test-out suggestions
    if (resultadoPuntajes.CD >= 70) {
      testOutSugerido.push("cuentas-basicas", "seguridad-2fa");
    }
    if (resultadoPuntajes.AIA >= 70) {
      testOutSugerido.push("prompting-basico");
    }

    // Active aids based on Senda
    if (senda === 'guiada') {
      ayudasActivas.push("glosario-siempre-visible", "mensajes-soporte");
    } else if (senda === 'acelerada') {
      ayudasActivas.push("checklists-colapsables");
    } else {
      ayudasActivas.push("retos-avanzados");
    }

    return {
      versionInstrumento: "2.2.0",
      fecha: new Date().toISOString(),
      puntajes: resultadoPuntajes,
      resultado: {
        senda: senda,
        nivelacionRequerida: nivelacionRequerida,
        moduloInicial: moduloInicial,
        modulosRecomendados: modulosRecomendados,
        modulosNoPrioritarios: modulosNoPrioritarios,
        testOutSugerido: testOutSugerido,
        ayudasActivas: ayudasActivas,
        confianzaClasificacion: (resultadoPuntajes.CD > 20) ? "alta" : "media",
        justificacion: justificacion,
        primerPaso: (moduloInicial === 'm1') ? "t1-s1" : `${moduloInicial}-s1` // fallback mapping
      }
    };
  }
};
