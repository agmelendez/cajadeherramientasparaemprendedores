// --- RENDERINICIO.JS ---

const RenderInicio = {
  render(container) {
    const globalProgress = App.getGlobalProgress();
    const diagnosticoCompletado = Estado.datos.diagnostico.completado;
    const moduloInicial = Estado.datos.diagnostico.resultado.moduloInicial;
    const senda = Estado.datos.diagnostico.resultado.senda;

    // Continue button link determination
    let continueHash = '#/diagnostico';
    let continueText = 'Realizar Diagnóstico';
    let continueIcon = 'compass';

    if (diagnosticoCompletado) {
      if (Estado.datos.ultimaRuta && Estado.datos.ultimaRuta !== '#/diagnostico') {
        continueHash = Estado.datos.ultimaRuta;
        continueText = 'Continuar Aprendizaje';
        continueIcon = 'arrow-right';
      } else {
        continueHash = `#/modulo/${moduloInicial || 'm1'}`;
        continueText = 'Ir al Módulo Recomendado';
        continueIcon = 'book-open';
      }
    }

    let html = `
      <style>
        .accordion-item {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 15px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .accordion-header {
          padding: 18px 20px;
          background-color: #fafbfc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
          font-weight: 600;
          color: var(--ucr-dark);
          font-family: 'Montserrat', sans-serif;
          transition: var(--transition);
          border-bottom: 1px solid transparent;
        }
        .accordion-header:hover {
          background-color: #f1f5f9;
        }
        .accordion-header.active {
          background-color: #f8fafc;
          border-bottom-color: var(--border-color);
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease-out, padding 0.25s ease-out;
          padding: 0 20px;
          background-color: var(--white);
        }
        .accordion-icon {
          transition: transform 0.25s ease;
          color: var(--ucr-blue);
        }
        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        .quick-link-card {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 15px;
          text-decoration: none;
          color: var(--ucr-dark);
          font-weight: 600;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .quick-link-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--ucr-blue);
          color: var(--ucr-blue);
        }
      </style>

      <section class="inicio-dashboard">
        <!-- Hero Welcome Panel -->
        <div class="unit-body-card" style="background: linear-gradient(135deg, var(--ucr-blue) 0%, var(--ucr-dark) 100%); color: white; padding: 35px; border-radius: var(--radius-lg); border: none; margin-bottom: 30px; box-shadow: var(--shadow-lg);">
          <div class="ucr-banner-tag" style="background: rgba(255,255,255,0.15); display: inline-block; padding: 6px 14px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; margin-bottom: 15px; letter-spacing: 0.5px; border: 1px solid rgba(255,255,255,0.25); font-family: 'Montserrat', sans-serif; color: white;">
             EJERCICIO ACADÉMICO COLECTIVO | CIOdD - DIPROVID - UCR
          </div>
          <h2 style="color: white; border: none; padding: 0; font-size: 1.8rem; margin-bottom: 10px;">¡Le damos la bienvenida a la Caja de Herramientas de IA!</h2>
          <p style="color: rgba(255,255,255,0.9); font-size: 1.05rem; margin-bottom: 25px; max-width: 750px; line-height: 1.5;">
            Esta plataforma de formación autogestionada le ayuda a integrar herramientas de inteligencia artificial generativa de forma crítica y práctica en los procesos diarios de su MiPYME, siguiendo la regla de 70% práctica y 30% teoría.
          </p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a href="${continueHash}" class="btn btn-warning"><i class="fas fa-${continueIcon}"></i> ${continueText}</a>
            <a href="#/diagnostico" class="btn btn-secondary" style="border-color: white; color: white !important; background: transparent;"><i class="fas fa-redo"></i> ${diagnosticoCompletado ? 'Repetir Diagnóstico' : 'Ver Diagnóstico'}</a>
          </div>
        </div>

        <!-- Global Progress Tracker -->
        <div class="unit-body-card" style="margin-bottom: 30px; padding: 25px;">
          <h3 style="color: var(--ucr-dark); margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; border: none; padding: 0;"><i class="fas fa-tasks" style="color: var(--ucr-blue);"></i> Progreso General del Programa</h3>
          <div class="progress-container" style="margin: 0;">
            <div class="progress-header">
              <span>Porcentaje de avance</span>
              <span>${globalProgress}% completado</span>
            </div>
            <div class="progress-bar-bg" style="height: 12px;">
              <div class="progress-bar-fill" style="width: ${globalProgress}%; background-color: var(--accent-green);"></div>
            </div>
          </div>
          ${diagnosticoCompletado ? `
            <div style="margin-top: 15px; font-size: 0.9rem; color: var(--text-light); background-color: #fafbfc; padding: 12px; border-radius: var(--radius-sm); border-left: 4px solid var(--accent-green);">
              <strong>Senda activa:</strong> <span style="text-transform: capitalize;">${senda}</span>.
              Su perfil sugiere iniciar por el <strong>Módulo ${moduloInicial.replace('m', '')}</strong>.
              Puede navegar libremente por cualquier sección del programa.
            </div>
          ` : ''}
        </div>

        <!-- Enlaces Rápidos -->
        <div class="quick-links-grid">
          <a href="#/ruta" class="quick-link-card">
            <i class="fas fa-route" style="font-size: 1.2rem; color: var(--ucr-blue);"></i>
            <span>🗺️ Ver Ruta Completa</span>
          </a>
          <a href="#/portafolio" class="quick-link-card">
            <i class="fas fa-folder-open" style="font-size: 1.2rem; color: var(--ucr-blue);"></i>
            <span>📂 Mi Portafolio Local</span>
          </a>
          <a href="#/biblioteca" class="quick-link-card">
            <i class="fas fa-book" style="font-size: 1.2rem; color: var(--ucr-blue);"></i>
            <span>📚 Biblioteca de Recursos</span>
          </a>
        </div>

        <!-- Module Grid -->
        <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.3rem; border: none; padding: 0;">Estructura del Programa</h3>
        <div class="module-grid" style="margin-bottom: 40px;">
    `;

    // Render cards for each module
    App.modulos.forEach(m => {
      const progress = App.getModuleProgress(m.id);
      const isDiagnostico = m.id === 'm0';
      
      let badgeHtml = '';
      let btnText = 'Comenzar';
      let btnClass = 'btn-primary';
      let cardLink = `#/modulo/${m.id}`;

      if (isDiagnostico) {
        cardLink = `#/diagnostico`;
        if (diagnosticoCompletado) {
          badgeHtml = '<span style="background-color: var(--accent-green); color: white; padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700;">COMPLETADO</span>';
          btnText = 'Repetir';
          btnClass = 'btn-secondary';
        } else {
          badgeHtml = '<span style="background-color: var(--accent-yellow); color: var(--ucr-dark); padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700;">RECOMENDADO</span>';
          btnText = 'Realizar';
          btnClass = 'btn-warning';
        }
      } else {
        if (progress === 100) {
          badgeHtml = '<span style="background-color: var(--accent-green); color: white; padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700;">COMPLETADO</span>';
          btnText = 'Revisar';
          btnClass = 'btn-secondary';
        } else if (progress > 0) {
          badgeHtml = '<span style="background-color: var(--ucr-celeste); color: white; padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700;">EN CURSO</span>';
          btnText = 'Continuar';
          btnClass = 'btn-primary';
        } else {
          // Check if recommended by diagnostic
          const isRecomended = diagnosticoCompletado && m.id === moduloInicial;
          if (isRecomended) {
            badgeHtml = '<span style="background-color: var(--accent-yellow); color: var(--ucr-dark); padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700;">SUGERIDO</span>';
            btnClass = 'btn-warning';
          }
        }
      }

      // Count weeks
      const weekCount = App.semanas.filter(s => s.moduloId === m.id).length;

      html += `
        <div class="module-card ${m.id}">
          <div class="module-card-header">
            <span class="module-card-tag">${m.codigo}</span>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
              <h4 class="module-card-title">${m.nombre}</h4>
              ${badgeHtml}
            </div>
            <p class="module-card-frase">"${m.frase}"</p>
          </div>
          <div class="module-card-body">
            <p class="module-card-desc">${m.descripcion}</p>
            
            <div style="margin-top: auto;">
              ${!isDiagnostico ? `
                <div class="progress-container" style="margin-bottom: 15px;">
                  <div class="progress-header">
                    <span>Avance</span>
                    <span>${progress}%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                  </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 15px;">
                  <i class="far fa-calendar-alt"></i> ${weekCount} Semanas de aprendizaje
                </div>
              ` : `
                <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 15px;">
                  <i class="fas fa-info-circle"></i> Duración aproximada: 5 minutos
                </div>
              `}
              <a href="${cardLink}" class="btn ${btnClass}" style="width: 100%;">${btnText} <i class="fas fa-chevron-right" style="font-size: 0.8rem;"></i></a>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <!-- Collapsible Informational Accordions -->
        <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.3rem; border: none; padding: 0;">Guía Metodológica del Programa</h3>
        <div class="accordions-container" style="margin-bottom: 50px;">
          
          <!-- Accordion 1: Cómo usar este curso -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-question-circle" style="color: var(--ucr-blue); margin-right: 10px;"></i> ¿Cómo usar este curso?</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <p style="margin-top: 15px; margin-bottom: 20px; color: #555;">
                Esta caja de herramientas está diseñada para personas emprendedoras que necesitan aplicar la inteligencia artificial a problemas reales de su negocio, sin depender de horarios fijos ni de acompañamiento permanente.
              </p>
              <div class="info-grid" style="margin-bottom: 15px;">
                <article class="info-card">
                  <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--ucr-dark); font-weight: 700;"><i class="fas fa-route" style="color: var(--ucr-blue); margin-right: 8px;"></i>1. Inicie con el diagnóstico</h4>
                  <p style="font-size: 0.88rem; color: #666; line-height: 1.4;">
                    Antes de usar herramientas, complete el diagnóstico de entrada. Este paso le ayuda a decidir si debe comenzar en el Toolkit Pre-Operativo o avanzar directamente al Módulo 2.
                  </p>
                </article>

                <article class="info-card">
                  <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--ucr-dark); font-weight: 700;"><i class="fas fa-file-invoice" style="color: var(--ucr-blue); margin-right: 8px;"></i>2. Produzca evidencias</h4>
                  <p style="font-size: 0.88rem; color: #666; line-height: 1.4;">
                    Cada semana termina con un entregable. No se trata solo de leer o ver videos: debe producir una evidencia útil y tangible para su negocio.
                  </p>
                </article>

                <article class="info-card">
                  <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--ucr-dark); font-weight: 700;"><i class="fas fa-user-check" style="color: var(--ucr-blue); margin-right: 8px;"></i>3. Verifique antes de implementar</h4>
                  <p style="font-size: 0.88rem; color: #666; line-height: 1.4;">
                    La IA puede sugerir, ordenar y acelerar, pero las decisiones finales deben revisarse con su propio criterio empresarial, sus datos reales y su conocimiento del cliente.
                  </p>
                </article>

                <article class="info-card">
                  <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--ucr-dark); font-weight: 700;"><i class="fas fa-user-shield" style="color: var(--ucr-blue); margin-right: 8px;"></i>4. Cuide los datos</h4>
                  <p style="font-size: 0.88rem; color: #666; line-height: 1.4;">
                    No ingrese nombres, teléfonos, correos, direcciones, datos bancarios ni información sensible de clientes en herramientas de IA abiertas o gratuitas.
                  </p>
                </article>
              </div>
            </div>
          </div>

          <!-- Accordion 2: Objetivos de aprendizaje -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-bullseye" style="color: var(--ucr-blue); margin-right: 10px;"></i> Objetivos de Aprendizaje</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <p style="margin-top: 15px; margin-bottom: 15px; color: #555;">
                Al finalizar esta caja de herramientas, la persona participante será capaz de utilizar inteligencia artificial de manera crítica, segura y aplicada para diagnosticar, automatizar y fortalecer procesos básicos de una MiPYME.
              </p>
              <div class="learning-objectives" style="border-left: 4px solid var(--ucr-blue); padding-left: 20px; margin-bottom: 20px;">
                <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--ucr-blue); font-weight: 700;">Objetivos específicos:</h4>
                <ul style="padding-left: 15px; list-style-type: disc; font-size: 0.92rem; color: #444; line-height: 1.6;">
                  <li style="margin-bottom: 6px;">Diagnosticar el estado de madurez digital y empresarial de un emprendimiento o MiPYME.</li>
                  <li style="margin-bottom: 6px;">Construir prompts empresariales usando contexto, instrucción, formato, restricciones y criterios de éxito (Modelo CIFRCE).</li>
                  <li style="margin-bottom: 6px;">Validar una idea de negocio mediante tendencias, entrevistas, encuestas y evidencia primaria.</li>
                  <li style="margin-bottom: 6px;">Elaborar un FODA dinámico, un plan de acción y una matriz de priorización IVU.</li>
                  <li style="margin-bottom: 6px;">Diseñar automatizaciones simples para reducir tareas repetitivas sin perder control humano del proceso.</li>
                  <li style="margin-bottom: 6px;">Construir un CRM básico y un flujo de atención inicial cuidando la privacidad de los datos.</li>
                  <li style="margin-bottom: 6px;">Crear piezas de comunicación comercial con IA respetando la transparencia, derechos de autor y autenticidad de marca.</li>
                  <li style="margin-bottom: 6px;">Evaluar la prefactibilidad de una idea mediante supuestos, costos, punto de equilibrio y criterios de decisión.</li>
                  <li style="margin-bottom: 6px;">Documentar evidencias de aprendizaje y justificar decisiones empresariales con criterio propio.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Accordion 3: Modelo de Aprendizaje Autogestionado -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-graduation-cap" style="color: var(--ucr-blue); margin-right: 10px;"></i> Modelo de Aprendizaje Autogestionado (70/30)</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <p style="margin-top: 15px; color: #555; line-height: 1.5;">
                Este programa ha sido diseñado para adaptarse al ritmo de vida de las personas emprendedoras. Sin horarios fijos, sin dependencia de tutores, pero con una estructura pedagógica sólida avalada por la UCR.
              </p>
              
              <div class="methodology-features" style="margin-top: 20px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex-wrap: wrap;">
                <div class="feature-item" style="display: flex; gap: 15px;">
                  <i class="fas fa-clock fa-2x" style="color: var(--ucr-blue); margin-top: 5px;"></i>
                  <div>
                    <h4 style="margin: 0 0 5px 0; font-size: 1rem; font-weight: 700;">A su propio ritmo</h4>
                    <p style="font-size: 0.88rem; color: #666; margin: 0; line-height: 1.4;">Acceso 24/7 a todos los recursos. Usted decide cuándo y dónde aprender, gestionando su tiempo sin presiones externas.</p>
                  </div>
                </div>
                <div class="feature-item" style="display: flex; gap: 15px;">
                  <i class="fas fa-percentage fa-2x" style="color: var(--ucr-blue); margin-top: 5px;"></i>
                  <div>
                    <h4 style="margin: 0 0 5px 0; font-size: 1rem; font-weight: 700;">Modelo 70/30</h4>
                    <p style="font-size: 0.88rem; color: #666; margin: 0; line-height: 1.4;">
                      <strong>70% Práctica:</strong> "Aprender haciendo" con ejercicios aplicables directamente a su negocio.<br>
                      <strong>30% Teoría:</strong> Fundamentación académica para entender el "por qué" de cada herramienta.
                    </p>
                  </div>
                </div>
              </div>
              
              <div style="background-color: #fffdf5; border-left: 4px solid var(--accent-yellow); padding: 15px; border-radius: var(--radius-sm); font-size: 0.9rem; color: var(--ucr-dark); margin-bottom: 20px; line-height: 1.4;">
                <strong>Principio central:</strong> cada herramienta se introduce <em>después</em> de que la persona emprendedora comprende el proceso que esa herramienta va a optimizar. La IA acelera lo que ya se entiende, no reemplaza lo que aún no se ha aprendido.
              </div>
            </div>
          </div>

          <!-- Accordion 4: Marcos Metodológicos -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-project-diagram" style="color: var(--ucr-blue); margin-right: 10px;"></i> Marcos Metodológicos de Adopción de IA</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <div class="concept-grid" style="margin-top: 15px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                
                <div class="concept-card" style="margin: 0; padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                  <h4 style="font-size: 1.05rem; margin-top: 0; color: var(--ucr-blue); font-weight: 700;"><i class="fas fa-robot"></i> Modelo CIFRCE</h4>
                  <p class="concept-subtitle" style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">Prompts empresariales estructurados</p>
                  <p style="font-size: 0.88rem; line-height: 1.4; color: #555;">Construya instrucciones precisas para la IA. Cada prompt efectivo tiene cinco componentes:</p>
                  <ul style="padding-left: 15px; font-size: 0.85rem; line-height: 1.5; color: #666; margin-top: 10px;">
                    <li><strong>C — Contexto:</strong> Quién es usted y qué negocio opera.</li>
                    <li><strong>I — Instrucción:</strong> Qué tarea exacta debe ejecutar la IA.</li>
                    <li><strong>F — Formato:</strong> Cómo desea recibir la respuesta (ej. tablas).</li>
                    <li><strong>R — Restricciones:</strong> Qué NO debe incluir la respuesta.</li>
                    <li><strong>CE — Criterios de Éxito:</strong> Cómo sabrá si la respuesta sirve.</li>
                  </ul>
                </div>

                <div class="concept-card" style="margin: 0; padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                  <h4 style="font-size: 1.05rem; margin-top: 0; color: var(--ucr-blue); font-weight: 700;"><i class="fas fa-sync-alt"></i> Ciclo RHEC</h4>
                  <p class="concept-subtitle" style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">Secuencia de aprendizaje activo</p>
                  <p style="font-size: 0.88rem; line-height: 1.4; color: #555;">La práctica precede al concepto teórico. Cada semana contiene exactamente 4 fases:</p>
                  <ol style="padding-left: 15px; font-size: 0.85rem; line-height: 1.5; color: #666; margin-top: 10px;">
                    <li><strong>Reto (5%):</strong> Desafío concreto de su negocio real que define el entregable.</li>
                    <li><strong>Hacer (65%):</strong> Núcleo del aprendizaje. Instrucciones paso a paso.</li>
                    <li><strong>Entender (25%):</strong> Explicación académica de lo que acaba de realizar.</li>
                    <li><strong>Compartir (5%):</strong> Reflexión conjunta en Padlet con pares.</li>
                  </ol>
                </div>

                <div class="concept-card" style="margin: 0; padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                  <h4 style="font-size: 1.05rem; margin-top: 0; color: var(--ucr-blue); font-weight: 700;"><i class="fas fa-user-check"></i> Human-in-the-Loop</h4>
                  <p class="concept-subtitle" style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">La IA propone, usted dispone</p>
                  <p style="font-size: 0.88rem; line-height: 1.4; color: #555;">Mantener el control crítico humano. Cuatro pilares éticos y prácticos:</p>
                  <ol style="padding-left: 15px; font-size: 0.85rem; line-height: 1.5; color: #666; margin-top: 10px;">
                    <li><strong>Criterio propio:</strong> Contrastar toda respuesta con su experiencia real.</li>
                    <li><strong>Transparencia:</strong> Declarar el uso de contenido sintético si aplica.</li>
                    <li><strong>Protección de datos:</strong> Acatar la Ley 8968 de Costa Rica.</li>
                    <li><strong>No delegar la estrategia:</strong> La IA es de apoyo, no sustituye su liderazgo.</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>

          <!-- Accordion 5: Matriz de alineación pedagógica -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-table" style="color: var(--ucr-blue); margin-right: 10px;"></i> Matriz de Alineación Pedagógica</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <p style="margin-top: 15px; margin-bottom: 20px; color: #555; line-height: 1.5;">
                Cada módulo vincula objetivos, actividades, herramientas, evidencias y criterios de revisión. Esta alineación permite verificar que el aprendizaje no dependa de respuestas automáticas de IA, sino de productos aplicados y revisados por la persona emprendedora.
              </p>
              
              <div class="table-responsive" style="margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                  <caption>Matriz global de alineación pedagógica del programa</caption>
                  <thead>
                    <tr style="background-color: var(--ucr-blue); color: white;">
                      <th scope="col" style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Módulo</th>
                      <th scope="col" style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Objetivo observable</th>
                      <th scope="col" style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Actividad central</th>
                      <th scope="col" style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Evidencia</th>
                      <th scope="col" style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Criterio de logro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Módulo 0: Diagnóstico</strong></td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Identificar el punto de partida del emprendimiento y la ruta recomendada.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Autodiagnóstico de madurez, urgencia y adopción de IA.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Resultado de ruta personalizada y reflexión inicial.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">La persona justifica por qué inicia en una ruta específica.</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                      <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Módulo 1: Validar antes de invertir</strong></td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Validar una idea de negocio antes de invertir recursos significativos.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Tendencias, buyer persona, encuesta y canvas.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Carpeta con 4 artefactos de validación.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Las decisiones se basan en evidencia, no solo en intuición.</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Módulo 2: Radiografía del negocio con IA</strong></td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Diagnosticar el negocio y priorizar acciones con apoyo de IA.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Configuración segura, prompting, FODA, matriz IVU y plan de acción.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Informe breve de diagnóstico y plan priorizado.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">El plan muestra revisión humana y criterios de priorización explícitos.</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                      <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Módulo 3: Ordenar y automatizar procesos</strong></td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Automatizar tareas repetitivas sin delegar decisiones críticas.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Flujo no-code, chatbot, CRM básico y cálculo de ROI.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Capturas, flujo funcional, base de datos de prueba y cálculo de retorno.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">La automatización resuelve un proceso comprendido y medido.</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Módulo 4: Comunicar, vender y decidir con datos</strong></td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Crear contenido y campañas con IA de forma ética y verificable.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Identidad visual, video, prefactibilidad y campaña AIDA.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">Kit de comunicación, video, prefactibilidad y calendario de campaña.</td>
                      <td style="padding: 10px; border: 1px solid var(--border-color);">La propuesta comunica valor, respeta transparencia y se basa en datos verificables.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Accordion 6: Comunidad y retroalimentación -->
          <div class="accordion-item">
            <div class="accordion-header">
              <span><i class="fas fa-users" style="color: var(--ucr-blue); margin-right: 10px;"></i> Comunidad y Retroalimentación</span>
              <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
              <p style="margin-top: 15px; margin-bottom: 20px; color: #555; line-height: 1.5;">
                La fase Compartir permite aprender de otras personas emprendedoras. Sin embargo, compartir no significa exponer información sensible del negocio ni datos personales de clientes.
              </p>

              <div class="critical-note" style="border-left: 4px solid var(--ucr-blue); background-color: #fffdf5; padding: 15px; border-radius: var(--radius-md); margin-bottom: 20px; line-height: 1.5;">
                <h4 style="font-size: 1rem; margin: 0 0 8px 0; color: var(--ucr-blue); font-weight: 700;">Reglas mínimas para compartir:</h4>
                <ul style="padding-left: 15px; list-style-type: disc; font-size: 0.88rem; color: #444;">
                  <li style="margin-bottom: 6px;">No publicar nombres, teléfonos, correos ni datos privados de clientes.</li>
                  <li style="margin-bottom: 6px;">No compartir capturas con información financiera o sensible del negocio.</li>
                  <li style="margin-bottom: 6px;">Explicar qué decisión se tomó y con qué evidencia.</li>
                  <li style="margin-bottom: 6px;">Dar retroalimentación respetuosa, de apoyo y orientada a la mejora.</li>
                  <li style="margin-bottom: 6px;">Distinguir entre opinión, dato, supuesto y recomendaciones de la IA.</li>
                </ul>
              </div>

              <p style="margin-top: 1.5rem; font-size: 0.88rem; color: #666; font-style: italic; margin-bottom: 20px; text-align: center;">
                El canal oficial de comunidad será definido por la coordinación del programa. Mientras no exista un canal institucional activo, las actividades de Compartir deben realizarse como reflexión individual o en espacios autorizados por la coordinación.
              </p>
            </div>
          </div>

        </div>
        
        <!-- Attribution banner at the very bottom -->
        <div class="ucr-attribution-banner" style="margin-bottom: 30px;">
          <i class="fas fa-info-circle"></i>
          <div>
            <strong>Nota de Atribución Institucional:</strong> Este recurso formativo interactivo ha sido desarrollado en el marco del proyecto de investigación del <strong>Centro de Investigación Observatorio del Desarrollo (CIOdD)</strong> y la <strong>Dirección de Promoción del Vínculo con la Sociedad (DIPROVID)</strong> de la <strong>Universidad de Costa Rica (UCR)</strong>, en colaboración activa con el <strong>Programa Auge</strong>. Se presenta como un ejercicio práctico de transferencia tecnológica y de capacitación autogestionada para el sector microempresarial costarricense.
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;

    // Attach Accordion Toggle Event Listeners
    const accordions = container.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
      header.addEventListener('click', () => {
        const panel = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');
        
        const isActive = header.classList.toggle('active');
        if (isActive) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          panel.style.padding = '15px 20px';
          if (icon) icon.className = 'fas fa-chevron-up accordion-icon';
        } else {
          panel.style.maxHeight = null;
          panel.style.padding = '0 20px';
          if (icon) icon.className = 'fas fa-chevron-down accordion-icon';
        }
      });
    });
  }
};
