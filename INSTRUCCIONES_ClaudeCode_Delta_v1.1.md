# Delta de Cambios Adicionales — Transcripción Completa
**Proyecto:** Caja de Herramientas IA para MiPYME  
**Documento base:** Instrucciones Claude Code v1.0  
**Versión:** 1.1 — Junio 2025  
**Fuente:** Transcripción reunión técnica DIPROVID / Auge (completa)

> Este documento **complementa** las instrucciones v1.0. No repite lo ya acordado. Se enfoca exclusivamente en los hallazgos nuevos o de mayor profundidad que emergen de la lectura completa de la transcripción y que implican cambios concretos al sitio o al `CLAUDE.md`.

---

## 1. Hallazgos nuevos vs. lo ya capturado

La transcripción revela cinco dimensiones que las notas de reunión sintetizadas **no capturaron con suficiente precisión operativa**:

| # | Dimensión | Estado en v1.0 | Estado real según transcripción |
|---|-----------|---------------|----------------------------------|
| 1 | Diagnóstico del Módulo 0 | Definido como diagnóstico "de negocio + herramientas" | **Más específico:** debe clasificar por *tipo de herramienta* (automatización / investigación / análisis financiero) Y debe producir una **ruta de módulos personalizada**, no solo redirigir a dos opciones |
| 2 | Filosofía pedagógica de Auge | Mencionada como principio rector | **Operativizada:** el emprendedor aprende el *proceso manual* primero; la IA llega como acelerador *solo después*. Esto afecta el *copy* de todo el sitio, no solo el Módulo 0 |
| 3 | Listas de chequeo | Incluidas como mejora de navegación | **Origen pedagógico explícito:** vienen de la experiencia con docentes (proyecto Colegios); deben incluir también autoevaluación del módulo, no solo componentes vistos |
| 4 | Modelo de certificación | Mencionado para Toolkit 2 | **Arquitectura completa discutida:** microcredencial/insignia digital para Toolkit 1 gratuito; certificación formal (Moodle) para Toolkit 2 de pago. La insignia es el *único incentivo de completitud* para el gratuito |
| 5 | Laboratorio / licencias | Definido como "4–5 licencias en Auge" | **Protocolo técnico explicitado** en transcripción: borrado de sesiones entre usuarios, no compartir historial; las licencias son compartidas por estación, no por persona |

---

## 2. Cambios adicionales al sitio (instrucciones Claude Code)

### TAREA H — Reescribir el copy del hero con la filosofía pedagógica de Auge

El texto actual del hero dice:
> *"Un programa de autoformación con el modelo 70/30: 70% práctica y 30% teoría. Diagnostique su negocio, automatice procesos y cree contenido con el rigor académico de la Universidad de Costa Rica."*

Este texto **contradice el principio de Auge**: presenta la automatización como destino desde el inicio, antes de que el emprendedor domine el proceso. La transcripción (Speaker E y Speaker F) es explícita: "utilizá la IA como una herramienta una vez que conocés el proceso".

```
> En index.html, localiza el párrafo del hero que dice "Un programa de 
  autoformación con el modelo 70/30..." y reemplázalo con el siguiente texto:

  "Un programa de formación autogestionada que sigue la regla 70/30: 
  70% práctica aplicada a su propio negocio y 30% fundamento teórico. 
  Aquí primero se aprende el proceso, después la IA lo acelera — 
  no al revés. Desarrollado con el rigor académico de la Universidad 
  de Costa Rica."

  Localiza también el bloque "Modelo 70/30" en la sección de metodología 
  y agrega inmediatamente después de la descripción existente:

  <p class="nota-pedagogica">
    <strong>Principio central:</strong> cada herramienta se introduce 
    <em>después</em> de que el emprendedor comprende el proceso que 
    esa herramienta va a optimizar. La IA acelera lo que ya se entiende, 
    no reemplaza lo que aún no se ha aprendido.
  </p>

  CSS para agregar:
  .nota-pedagogica {
    font-size: 0.92rem;
    background: #f0f7ff;
    border-left: 3px solid #003366;
    padding: 0.7rem 1rem;
    margin-top: 0.8rem;
    border-radius: 0 5px 5px 0;
    color: #333;
  }
```

---

### TAREA I — Ampliar el Módulo 0: diagnóstico de tres ejes (no de dos rutas)

La versión de la Tarea D (v1.0) generaba solo dos rutas: "tengo idea" vs. "negocio en marcha". La transcripción (Speaker D y Speaker C) especifica que el diagnóstico debe clasificar al emprendedor en **tres ejes independientes**, no solo por madurez del negocio:

- **Eje 1 — Madurez del negocio:** idea / prototipo / ventas iniciales / en marcha
- **Eje 2 — Tipo de herramienta pertinente:** automatización de procesos / investigación de mercado / análisis financiero / creación de contenido
- **Eje 3 — Nivel de experiencia con IA:** ninguna / básica (uso como Google) / intermedia (prompts conscientes) / avanzada

```
> En la sección del Módulo 0 que ya existe en index.html, reemplaza el 
  bloque de las dos rutas (.rutas con .ruta-idea y .ruta-operativo) por 
  una estructura de tres preguntas secuenciales:

  <div class="diagnostico-secuencial">

    <div class="diag-pregunta" id="diag-q1">
      <p class="diag-label">1 de 3 — ¿En qué etapa está tu emprendimiento?</p>
      <div class="diag-opciones">
        <button class="diag-btn" data-eje="madurez" data-valor="idea">
          🌱 Tengo una idea, aún no he vendido
        </button>
        <button class="diag-btn" data-eje="madurez" data-valor="prototipo">
          🔧 Tengo un prototipo o modelo de negocio en desarrollo
        </button>
        <button class="diag-btn" data-eje="madurez" data-valor="ventas">
          💰 Ya tengo ventas, aunque sean pocas
        </button>
        <button class="diag-btn" data-eje="madurez" data-valor="marcha">
          🏢 Tengo un negocio funcionando con procesos definidos
        </button>
      </div>
    </div>

    <div class="diag-pregunta oculto" id="diag-q2">
      <p class="diag-label">2 de 3 — ¿Qué necesitás resolver con más urgencia?</p>
      <div class="diag-opciones">
        <button class="diag-btn" data-eje="herramienta" data-valor="investigacion">
          🔍 Validar si mi idea o producto tiene demanda real
        </button>
        <button class="diag-btn" data-eje="herramienta" data-valor="financiero">
          📊 Entender los números: costos, proyecciones, rentabilidad
        </button>
        <button class="diag-btn" data-eje="herramienta" data-valor="automatizacion">
          ⚙️ Ahorrar tiempo automatizando tareas repetitivas
        </button>
        <button class="diag-btn" data-eje="herramienta" data-valor="contenido">
          📣 Crear contenido y visibilidad para mi marca
        </button>
      </div>
    </div>

    <div class="diag-pregunta oculto" id="diag-q3">
      <p class="diag-label">3 de 3 — ¿Cómo usás la IA actualmente?</p>
      <div class="diag-opciones">
        <button class="diag-btn" data-eje="experiencia" data-valor="ninguna">
          🚫 Nunca o casi nunca la he usado
        </button>
        <button class="diag-btn" data-eje="herramienta" data-valor="google">
          🔎 La uso como buscador o para preguntas sueltas
        </button>
        <button class="diag-btn" data-eje="experiencia" data-valor="intermedia">
          💬 Hago prompts con cierto criterio, sé lo que quiero pedirle
        </button>
        <button class="diag-btn" data-eje="experiencia" data-valor="avanzada">
          🤖 La integro a flujos de trabajo o la personalizo
        </button>
      </div>
    </div>

    <div class="diag-resultado oculto" id="diag-resultado">
      <h4>Tu ruta recomendada</h4>
      <p id="diag-texto-resultado"></p>
      <a id="diag-btn-ir" href="#toolkit1" class="btn-ruta">
        Ir a mi punto de partida →
      </a>
    </div>

  </div>

  Agrega el siguiente JavaScript al final del <body> (antes del cierre 
  </body>) para manejar la lógica del diagnóstico:

  <script>
  (function() {
    const respuestas = {};
    const preguntas = ['diag-q1', 'diag-q2', 'diag-q3'];
    let paso = 0;

    document.querySelectorAll('.diag-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const eje = this.dataset.eje;
        const valor = this.dataset.valor;
        respuestas[eje] = valor;

        // Marcar selección
        this.closest('.diag-opciones').querySelectorAll('.diag-btn')
            .forEach(b => b.classList.remove('seleccionado'));
        this.classList.add('seleccionado');

        // Avanzar al siguiente paso
        paso++;
        setTimeout(() => {
          if (paso < preguntas.length) {
            document.getElementById(preguntas[paso]).classList.remove('oculto');
            document.getElementById(preguntas[paso])
                .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            mostrarResultado();
          }
        }, 300);
      });
    });

    function mostrarResultado() {
      const resultado = document.getElementById('diag-resultado');
      const texto = document.getElementById('diag-texto-resultado');
      const btnIr = document.getElementById('diag-btn-ir');
      
      // Lógica de enrutamiento
      let ruta = '#toolkit1';
      let mensaje = '';

      if (respuestas.madurez === 'idea' || respuestas.madurez === 'prototipo') {
        ruta = '#toolkit1';
        mensaje = 'Comenzá por el <strong>Toolkit 1 (pre-operativo)</strong>: ' +
                  'validación de ideas, análisis de mercado y modelo de negocio básico. ' +
                  'Los Módulos I–III estarán disponibles cuando tu negocio esté en marcha.';
      } else if (respuestas.herramienta === 'investigacion') {
        ruta = '#modulo1';
        mensaje = 'El <strong>Módulo I — Diagnóstico con IA</strong> es tu punto de entrada: ' +
                  'FODA dinámico, perfil de cliente y plan de acción estratégico.';
      } else if (respuestas.herramienta === 'automatizacion') {
        ruta = '#modulo2';
        mensaje = 'Si ya dominás el Módulo I, podés ir directo al ' +
                  '<strong>Módulo II — Automatización</strong>: flujos no-code, ' +
                  'chatbots y CRM básico.';
      } else if (respuestas.herramienta === 'contenido') {
        ruta = '#modulo3';
        mensaje = 'El <strong>Módulo III — Contenido y Comercialización</strong> ' +
                  'cubre identidad visual, producción audiovisual y campaña de lanzamiento.';
      } else {
        ruta = '#modulo1';
        mensaje = 'Te recomendamos comenzar por el <strong>Módulo I</strong> ' +
                  'para tener una base sólida antes de avanzar.';
      }

      texto.innerHTML = mensaje;
      btnIr.href = ruta;
      resultado.classList.remove('oculto');
      resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  })();
  </script>

  CSS adicional para este bloque:
  .diagnostico-secuencial { margin: 1rem 0; }
  .diag-pregunta { margin-bottom: 1.2rem; }
  .diag-label { font-weight: bold; color: #003366; margin-bottom: 0.6rem; }
  .diag-opciones { display: flex; flex-direction: column; gap: 0.5rem; }
  .diag-btn { 
    background: #f8f9fa; border: 1px solid #dee2e6;
    border-radius: 6px; padding: 0.7rem 1rem; text-align: left;
    cursor: pointer; font-size: 0.93rem; transition: all 0.2s;
  }
  .diag-btn:hover { background: #e8f0fe; border-color: #2E86C1; }
  .diag-btn.seleccionado { background: #003366; color: white; border-color: #003366; }
  .diag-resultado { 
    background: #eaf4ea; border-left: 4px solid #1E8449;
    border-radius: 0 8px 8px 0; padding: 1rem 1.2rem; margin-top: 1rem;
  }
  .oculto { display: none; }
```

---

### TAREA J — Agregar autoevaluación a las listas de chequeo

La transcripción (Speaker C, sección sobre el proyecto de Colegios) especifica que la lista de chequeo efectiva incluye: componentes vistos + herramientas + **autoevaluación de dominio** + retroalimentación de en qué punto falló. Las Tareas C de v1.0 generaban solo una tabla de componentes. Ampliar con fila de autoevaluación:

```
> En las listas de chequeo que ya insertaste para cada módulo 
  (.checklist-modulo), agrega al final de cada tabla una fila de 
  autoevaluación y un bloque de siguiente paso con nivel de confianza:

  Reemplaza el cierre </tbody></table> de la tabla del Módulo I por:

        <tr class="fila-autoevaluacion">
          <td colspan="3">
            <strong>Autoevaluación rápida:</strong><br>
            Antes de pasar al Módulo II, ¿podés hacer esto sin ayuda?<br>
            ✅ Configurar ChatGPT/Claude/Gemini con un propósito específico<br>
            ✅ Escribir un prompt con el modelo CIFRCE completo<br>
            ✅ Generar un FODA dinámico de tu negocio<br>
            ✅ Tener un plan de acción de al menos 3 acciones concretas<br>
            <small>Si respondiste ✅ a todas: estás listo para el Módulo II.<br>
            Si no: repasá la semana que te generó más dudas antes de continuar.</small>
          </td>
        </tr>
      </tbody></table>

  Genera los equivalentes para Módulo II y III con sus propios 
  criterios de dominio (4 ítems cada uno, coherentes con el contenido 
  de cada módulo).

  CSS adicional:
  .fila-autoevaluacion td { 
    background: #f8f9fa; font-size: 0.88rem; 
    padding: 10px 12px; line-height: 1.6;
  }
```

---

### TAREA K — Agregar sección de microcredencial / insignia digital

La transcripción (Speaker C) establece que sin un valor agregado tangible, la tasa de abandono del módulo gratuito será muy alta —lo llama "la gente va a entrar, ver y salir". La solución discutida es una **insignia digital** (Open Badge) que el emprendedor pueda poner en LinkedIn o su sitio web. Esta sección debe existir en el sitio aunque la infraestructura de emisión aún no esté lista.

```
> En index.html, al final de la sección de "Estructura del Programa" 
  y antes del footer, inserta la siguiente sección:

  <section id="credenciales" class="seccion-credenciales">
    <h2>🏅 Credenciales y Valor Agregado</h2>
    <p class="seccion-intro">
      Completar el Programa no es solo aprender — es demostrarlo. 
      Al finalizar cada kit, recibís una credencial que podés 
      compartir profesionalmente.
    </p>
    <div class="cred-grid">
      <div class="cred-card">
        <div class="cred-icon">🆓</div>
        <h3>Toolkit 1 — Gratuito</h3>
        <p>Al completar las 4 semanas y la autoevaluación final:</p>
        <ul>
          <li>Insignia digital (Open Badge) verificable</li>
          <li>Publicable en LinkedIn y portafolios digitales</li>
          <li>Emitida por: UCR / CIOdD – DIPROVID / Auge</li>
        </ul>
        <p class="cred-estado">⏳ Próximamente disponible — Agosto 2025</p>
      </div>
      <div class="cred-card cred-pago">
        <div class="cred-icon">💎</div>
        <h3>Toolkit 2 — Certificación</h3>
        <p>Programa avanzado para negocios en marcha:</p>
        <ul>
          <li>Certificado formal UCR con evaluación estructurada</li>
          <li>Acceso a plataforma Moodle con contenidos extendidos</li>
          <li>Módulos de automatización, análisis financiero y comercialización</li>
        </ul>
        <p class="cred-estado cred-pago-tag">💰 De pago — Detalles en desarrollo</p>
      </div>
    </div>
  </section>

  CSS:
  .seccion-credenciales { 
    background: #f8f9fa; padding: 2.5rem 1.5rem; 
    border-top: 3px solid #003366; 
  }
  .cred-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1.2rem; }
  .cred-card { 
    flex: 1; min-width: 260px; background: white;
    border-radius: 10px; padding: 1.2rem 1.4rem;
    border: 1px solid #dee2e6; box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  }
  .cred-pago { border-color: #D4AC0D; }
  .cred-icon { font-size: 2rem; margin-bottom: 0.5rem; }
  .cred-card h3 { color: #003366; margin-bottom: 0.6rem; }
  .cred-card ul { padding-left: 1.2rem; font-size: 0.92rem; 
                  color: #555; line-height: 1.7; }
  .cred-estado { 
    font-size: 0.85rem; margin-top: 0.8rem; 
    padding: 4px 10px; border-radius: 4px; 
    background: #fff3cd; color: #856404; display: inline-block;
  }
  .cred-pago-tag { background: #fdebd0; color: #784212; }
```

---

### TAREA L — Actualizar el `CLAUDE.md` con las nuevas decisiones de arquitectura

```
> Abre el archivo CLAUDE.md y agrega las siguientes secciones 
  al final del archivo:

  ## Decisiones de arquitectura del programa (Jun 2025)

  ### Modelo de dos niveles (definido en reunión técnica con Auge)
  - **Nivel gratuito:** Toolkit 1 (pre-operativo, 4 semanas) + Módulos I–III 
    como sitio estático GitHub Pages. Incentivo de completitud: insignia digital.
  - **Nivel pago:** Toolkit 2 (avanzado). Plataforma: Moodle (a definir con 
    DIPROVID/METIX). Incluye evaluación estructurada y certificado formal UCR.

  ### Diagnóstico de entrada (Módulo 0)
  - Tres ejes: (1) madurez del negocio, (2) tipo de herramienta pertinente, 
    (3) nivel de experiencia con IA
  - Produce ruta personalizada de módulos (no solo dos opciones)
  - JavaScript vanilla inline en index.html — sin dependencias externas

  ### Filosofía pedagógica de Auge (NO negociable en copy del sitio)
  - La IA es acelerador, no sustituto
  - El emprendedor aprende el proceso primero; la herramienta llega después
  - Este principio debe reflejarse en el texto de introducción de cada módulo
  - Formulación prohibida en el sitio: "automatice sus procesos" como promesa 
    de entrada antes de que el usuario haya completado el Módulo I

  ### Laboratorio presencial Auge
  - 4–5 licencias compartidas por estación (no por persona)
  - Requiere protocolo de borrado de sesión entre usuarios
  - No incluir texto sobre el laboratorio en el sitio hasta que esté operativo
  - Placeholder interno: comentario HTML <!-- LABORATORIO: pendiente activación -->

  ### Sostenibilidad de licencias
  - Licencias actuales vencen: noviembre 2025
  - Monto acordado para renovación: ~$3,000 USD (financiado por Auge)
  - Migración pendiente: GPTs de cuentas personales → cuenta institucional
  - Plataforma target para migración: Google Workspace (según conversación Alonso)
  - Todos los assets deben estar documentados en este CLAUDE.md 
    antes de la migración

  ### Asistentes virtuales — estado actual (Jun 2025)
  | Asistente | Plataforma | Cuenta | Estado |
  |-----------|-----------|--------|--------|
  | GPT Emprendedores V2 | Gemini | Personal | Migración pendiente |
  | OMIPYMES UNED Territorial | ChatGPT | Personal/UNED | Migración pendiente |
  | OMIPYMES UNED Analista | ChatGPT | Personal/UNED | Migración pendiente |
  | GUESSSY | ChatGPT | Personal | Fuera de scope Auge |
  | Guía de Costeo | ChatGPT | Personal | Migración pendiente |
  | Marketing Digital | ChatGPT | Personal | Migración pendiente |
  | OBI | ChatGPT | Personal | Migración pendiente |

  ### Contenidos del Toolkit 1 que aún requieren producción
  - T1-S1: guía Google Trends + Exploding Topics en español
  - T1-S2: plantilla Buyer Persona con Claude/Gemini
  - T1-S3: protocolo de encuesta de validación primaria
  - T1-S4: canvas de modelo de negocio socrático con IA
  - Todos los recursos deben alojarse en cuenta institucional antes de publicarse
```

---

## 3. Cambios al `CLAUDE.md` — tabla de terminología ampliada

La transcripción introduce términos nuevos que deben quedar controlados:

```
> En el CLAUDE.md, en la tabla "Terminología oficial (NO mezclar)", 
  agrega las siguientes filas:

  | Insignia digital | Certificado / Badge / Diploma |
  | Toolkit 2 (de pago) | Curso avanzado / Nivel 2 / Módulo pago |
  | Laboratorio Auge | Centro / Sala / Espacio IA |
  | Asistente virtual institucional | Bot / GPT personal / Agente UNED |
  | Proceso primero, herramienta después | IA como sustituto / Automatizá desde ya |
  | Microcredencial | Certificado completo / Diploma UCR |
```

---

## 4. Lo que NO debe implementarse aún en el sitio

Estos puntos emergieron en la transcripción como deseos o posibilidades, pero **no tienen decisión firme** y no deben materializarse en código hasta que estén confirmados:

| Elemento | Por qué esperar |
|----------|----------------|
| Enlace o referencia al módulo Moodle de Toolkit 2 | La plataforma no está definida (¿METIX? ¿Moodle DIPROVID?) |
| Precio o costo del Toolkit 2 | No discutido en la reunión; depende del modelo de financiamiento |
| Integración con Google Workspace / Gemini institucional | Pendiente conversación con Alonso; aún es hipótesis |
| Sistema de evaluación de 3 intentos | Requiere backend; GitHub Pages es estático — no implementable sin plataforma externa |
| Laboratorio presencial activo | No tiene fecha de apertura confirmada |
| Referencia a Claude Mythos / modelos avanzados específicos | Los modelos cambian rápido; evitar referencias a versiones específicas en el sitio |

Para todos los anteriores, usar **comentarios HTML internos** como marcadores de posición:

```html
<!-- TODO: [descripción del elemento pendiente] — pendiente confirmación [fecha] -->
```

---

## 5. Orden de implementación recomendado

Dado que ya realizaste cambios en el ambiente local, este es el orden de prioridad para las tareas nuevas:

1. **TAREA L** (actualizar `CLAUDE.md`) — primero, para que todas las sesiones siguientes de Claude Code arranquen con el contexto correcto
2. **TAREA H** (reescribir copy del hero) — impacto alto, riesgo bajo, cambio de texto solamente
3. **TAREA I** (diagnóstico de tres ejes) — reemplaza la versión de dos rutas de la Tarea D; si ya implementaste la Tarea D, esta la sobreescribe
4. **TAREA J** (ampliar listas de chequeo con autoevaluación) — complementa la Tarea C
5. **TAREA K** (sección de credenciales) — nueva sección; agregar al final antes del footer

---

## 6. Commit recomendado por tarea nueva

```bash
# Después de TAREA L
git commit -m "docs: actualizar CLAUDE.md con decisiones arquitectura jun 2025"

# Después de TAREA H
git commit -m "content: reescribir hero con filosofía pedagógica Auge"

# Después de TAREA I
git commit -m "feat: módulo 0 con diagnóstico de tres ejes y enrutamiento JS"

# Después de TAREA J
git commit -m "content: ampliar checklists con autoevaluación por módulo"

# Después de TAREA K
git commit -m "feat: agregar sección de credenciales Toolkit 1/2"
```

---

*Documento generado por el Observatorio del Desarrollo (CIOdD-UCR) — Delta v1.1 derivado de transcripción completa reunión técnica DIPROVID/Auge*
