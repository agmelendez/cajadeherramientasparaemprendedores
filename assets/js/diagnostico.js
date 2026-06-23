// --- DIAGNOSTICO.JS ---

const Diagnostico = {
  currentQuestionIndex: 0,
  respuestasLocales: {},

  render(container) {
    const diagnosticState = Estado.datos.diagnostico;
    
    // If already completed, show results by default
    if (diagnosticState.completado) {
      this.renderResultados(container);
    } else {
      // Initialize local answers from state
      this.respuestasLocales = { ...diagnosticState.respuestas };
      this.currentQuestionIndex = 0;
      this.renderPregunta(container);
    }
  },

  renderPregunta(container) {
    const preguntas = App.preguntas;
    if (preguntas.length === 0) {
      container.innerHTML = "<p>Cargando preguntas...</p>";
      return;
    }

    const q = preguntas[this.currentQuestionIndex];
    const total = preguntas.length;
    const progressPercent = Math.round(((this.currentQuestionIndex) / total) * 100);
    const selectedVal = this.respuestasLocales[q.id];

    let html = `
      <section class="diagnostico-secuencial">
        <!-- Diagnostic header -->
        <div class="unit-body-card" style="padding: 25px; margin-bottom: 25px;">
          <h2 style="border: none; padding: 0; font-size: 1.5rem; margin-bottom: 10px;"><i class="fas fa-compass" style="color: var(--ucr-blue);"></i> Autodiagnóstico de Clasificación</h2>
          <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 15px;">
            Responda con honestidad sobre su negocio y competencias. Sus respuestas son anónimas y se guardan solo en este dispositivo para personalizar su aprendizaje.
          </p>
          
          <div class="diag-progress-bar">
            <div class="diag-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-light); font-weight: 700;">
            <span>Pregunta ${this.currentQuestionIndex + 1} de ${total}</span>
            <span>Dimensión: ${this.getDimName(q.dimension)}</span>
          </div>
        </div>

        <!-- Question and options block -->
        <div class="unit-body-card" style="margin-bottom: 25px;">
          <div class="diag-question-container">
            <h3 class="diag-question-text">${q.texto}</h3>
            
            <div class="diag-options-stack">
    `;

    q.opciones.forEach(opt => {
      const isSelected = selectedVal !== undefined && Number(selectedVal) === Number(opt.valor);
      html += `
        <button type="button" class="diag-option-btn ${isSelected ? 'selected' : ''}" data-valor="${opt.valor}">
          <span class="option-indicator" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--ucr-blue)' : 'var(--border-color)'}; display: inline-flex; align-items: center; justify-content: center;">
            ${isSelected ? '<span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--ucr-blue);"></span>' : ''}
          </span>
          <span>${opt.etiqueta}</span>
        </button>
      `;
    });

    html += `
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="diag-nav-buttons">
          <button type="button" id="btn-diag-prev" class="btn btn-secondary" ${this.currentQuestionIndex === 0 ? 'disabled style="opacity:0.5;"' : ''}>
            <i class="fas fa-chevron-left"></i> Anterior
          </button>
          
          ${this.currentQuestionIndex < total - 1 ? `
            <button type="button" id="btn-diag-next" class="btn btn-primary" ${selectedVal === undefined ? 'disabled style="opacity:0.5; background-color:#cbd5e1; border-color:#cbd5e1;"' : ''}>
              Siguiente <i class="fas fa-chevron-right"></i>
            </button>
          ` : `
            <button type="button" id="btn-diag-finish" class="btn btn-warning" ${selectedVal === undefined ? 'disabled style="opacity:0.5;"' : ''}>
              Finalizar y Calcular Ruta <i class="fas fa-check-double"></i>
            </button>
          `}
        </div>
      </section>
    `;

    container.innerHTML = html;

    // Attach listeners
    this.attachPreguntaListeners(container, q.id);
  },

  getDimName(dim) {
    const names = {
      CD: "Competencias Digitales",
      AIA: "Alfabetización en IA",
      AT: "Acceso Tecnológico",
      CUB: "Claridad de Uso/Beneficios",
      CME: "Contexto/Madurez de la Empresa"
    };
    return names[dim] || dim;
  },

  attachPreguntaListeners(container, questionId) {
    const btns = container.querySelectorAll('.diag-option-btn');
    const btnNext = document.getElementById('btn-diag-next');
    const btnFinish = document.getElementById('btn-diag-finish');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deselect all
        btns.forEach(b => {
          b.classList.remove('selected');
          const ind = b.querySelector('.option-indicator');
          if (ind) ind.innerHTML = '';
          if (ind) ind.style.borderColor = 'var(--border-color)';
        });

        // Select this
        btn.classList.add('selected');
        const ind = btn.querySelector('.option-indicator');
        if (ind) {
          ind.innerHTML = '<span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--ucr-blue);"></span>';
          ind.style.borderColor = 'var(--ucr-blue)';
        }

        const val = Number(btn.dataset.valor);
        
        // Save locally
        this.respuestasLocales[questionId] = val;
        
        // Save in global state immediately in case they refresh/exit
        Estado.guardarRespuesta(questionId, val);

        // Enable next/finish buttons
        if (btnNext) {
          btnNext.disabled = false;
          btnNext.style.opacity = '1';
          btnNext.style.backgroundColor = '';
          btnNext.style.borderColor = '';
        }
        if (btnFinish) {
          btnFinish.disabled = false;
          btnFinish.style.opacity = '1';
        }

        // Auto advance after 250ms for fluent UX
        setTimeout(() => {
          this.advance();
        }, 250);
      });
    });

    const btnPrev = document.getElementById('btn-diag-prev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
          this.renderPregunta(container);
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.advance();
      });
    }

    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        this.finish(container);
      });
    }
  },

  advance() {
    const total = App.preguntas.length;
    if (this.currentQuestionIndex < total - 1) {
      this.currentQuestionIndex++;
      const container = document.getElementById('app');
      this.renderPregunta(container);
    }
  },

  finish(container) {
    // Run classifier
    const resultadoObj = Clasificador.calcular(this.respuestasLocales, App.preguntas);
    
    // Save to Estado
    Estado.datos.diagnostico.completado = true;
    Estado.datos.diagnostico.fechaCompletado = new Date().toISOString();
    Estado.datos.diagnostico.puntajes = resultadoObj.puntajes;
    Estado.datos.diagnostico.resultado = resultadoObj.resultado;
    Estado.datos.perfil = resultadoObj.resultado.senda;
    Estado.guardar();

    // Render results
    this.renderResultados(container);
  },

  renderResultados(container) {
    const resultado = Estado.datos.diagnostico.resultado;
    const puntajes = Estado.datos.diagnostico.puntajes;
    const moduloInicialId = resultado.moduloInicial;
    const modInicialObj = App.modulos.find(m => m.id === moduloInicialId);

    // Map Senda text
    const sendaNames = {
      guiada: {
        titulo: "Senda Guiada",
        desc: "Ideal si está dando sus primeros pasos en tecnología o IA. Ofrece glosario siempre visible y explicaciones con analogías sencillas.",
        color: "var(--accent-red)"
      },
      acelerada: {
        titulo: "Senda Acelerada",
        desc: "Para quienes ya dominan herramientas web pero quieren aprender a estructurar prompts de IA de forma crítica y eficiente.",
        color: "var(--ucr-blue)"
      },
      profunda: {
        titulo: "Senda Profunda",
        desc: "Para usuarios avanzados de tecnología e IA. Enfocada en automatizaciones Make complejas y análisis de prefactibilidad estructurado.",
        color: "var(--accent-green)"
      }
    };

    const sendaInfo = sendaNames[resultado.senda] || { titulo: resultado.senda, desc: "", color: "var(--text-light)" };

    let html = `
      <section class="diagnostico-resultados">
        <!-- Results title card -->
        <div class="unit-body-card" style="text-align: center; border-top: 5px solid var(--accent-green);">
          <div style="font-size: 3rem; color: var(--accent-green); margin-bottom: 15px;">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2 style="border: none; padding: 0; font-size: 1.8rem; margin-bottom: 10px;">¡Diagnóstico Completado con Éxito!</h2>
          <p style="max-width: 600px; margin: 0 auto; color: var(--text-light); font-size: 1rem;">
            Hemos analizado sus respuestas. Basados en las necesidades de su empresa y sus habilidades digitales, calculamos la siguiente ruta formativa recomendada:
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: start;">
          
          <!-- Column 1: Main Recommendation and Justification -->
          <div style="display: flex; flex-direction: column; gap: 25px;">
            
            <!-- Module recommended -->
            <div class="unit-body-card" style="border-left: 5px solid ${sendaInfo.color}; padding: 25px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Módulo Inicial Recomendado</span>
              <h3 style="color: var(--ucr-dark); margin: 8px 0 15px 0; font-size: 1.4rem;">
                Módulo ${moduloInicialId.replace('m', '')}: ${modInicialObj ? modInicialObj.nombre : ''}
              </h3>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: var(--radius-md); font-size: 0.95rem; border-left: 3px solid var(--ucr-blue); margin-bottom: 15px;">
                <strong>¿Por qué?</strong>
                <p style="margin-top: 5px; color: #444; line-height: 1.5;">${resultado.justificacion.join('<br><br>')}</p>
              </div>

              <!-- Sequence of modules -->
              <div style="font-size: 0.9rem; color: var(--text-light);">
                <strong>Secuencia recomendada:</strong> 
                ${resultado.modulosRecomendados.map(mId => `Módulo ${mId.replace('m', '')}`).join(' <i class="fas fa-arrow-right" style="font-size:0.7rem; margin:0 5px;"></i> ')}
              </div>
            </div>

            <!-- Senda info -->
            <div class="unit-body-card" style="padding: 25px;">
              <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: ${sendaInfo.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                  <i class="fas fa-route"></i>
                </div>
                <div>
                  <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Senda de Acompañamiento</span>
                  <h4 style="color: var(--ucr-dark); margin: 0; font-size: 1.15rem;">${sendaInfo.titulo}</h4>
                </div>
              </div>
              <p style="font-size: 0.95rem; color: #444; line-height: 1.5;">${sendaInfo.desc}</p>
            </div>
          </div>

          <!-- Column 2: Scores and active aids -->
          <div style="display: flex; flex-direction: column; gap: 25px;">
            
            <!-- Dimension scores -->
            <div class="unit-body-card" style="padding: 25px;">
              <h3 style="color: var(--ucr-dark); font-size: 1.15rem; margin-bottom: 20px; border: none; padding: 0;"><i class="fas fa-chart-bar" style="color: var(--ucr-blue);"></i> Sus Puntajes por Dimensión</h3>
              
              <div style="display: flex; flex-direction: column; gap: 15px;">
                ${this.renderScoreBar("Competencias Digitales (CD)", puntajes.CD)}
                ${this.renderScoreBar("Alfabetización en IA (AIA)", puntajes.AIA)}
                ${this.renderScoreBar("Acceso a Tecnologías (AT)", puntajes.AT)}
                ${this.renderScoreBar("Claridad de Beneficios (CUB)", puntajes.CUB)}
                ${this.renderScoreBar("Contexto y Madurez Pyme (CME)", puntajes.CME)}
              </div>
            </div>

            <!-- Active Aids and Test-outs -->
            <div class="unit-body-card" style="padding: 25px;">
              <h3 style="color: var(--ucr-dark); font-size: 1.15rem; margin-bottom: 15px; border: none; padding: 0;"><i class="fas fa-lightbulb" style="color: var(--accent-yellow);"></i> Ayudas y Atajos Habilitados</h3>
              
              ${resultado.testOutSugerido.length > 0 ? `
                <div style="margin-bottom: 15px; font-size: 0.9rem;">
                  <strong>Oportunidades de omitir temas (Test-Out):</strong>
                  <ul style="margin-left: 20px; margin-top: 5px; list-style: circle;">
                    ${resultado.testOutSugerido.map(t => `<li>Usted ya cuenta con destrezas básicas en: <strong style="text-transform: capitalize;">${t.replace('-', ' ')}</strong>.</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <div style="font-size: 0.9rem;">
                <strong>Ayudas activas:</strong>
                <ul style="margin-left: 20px; margin-top: 5px; list-style: circle;">
                  ${resultado.ayudasActivas.map(aid => `<li>Se habilitó: <strong style="text-transform: capitalize;">${aid.replace('-', ' ')}</strong>.</li>`).join('')}
                </ul>
              </div>
            </div>

          </div>
        </div>

        <!-- Action Panel -->
        <div class="unit-body-card text-center" style="margin-top: 30px; padding: 25px;">
          <h4 style="margin-bottom: 15px; font-size: 1.1rem; color: var(--ucr-dark);">¿Cómo desea continuar su formación?</h4>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="#/modulo/${moduloInicialId}" class="btn btn-primary"><i class="fas fa-play-circle"></i> Iniciar Ruta Sugerida</a>
            <button type="button" id="btn-diag-customize" class="btn btn-secondary"><i class="fas fa-sliders-h"></i> Cambiar Ruta Manualmente</button>
            <button type="button" id="btn-diag-reset-results" class="btn btn-danger"><i class="fas fa-redo"></i> Repetir Diagnóstico</button>
          </div>

          <!-- Manual route customization form (hidden by default) -->
          <div id="diag-custom-routing-box" class="oculto" style="margin-top: 25px; border-top: 1px solid var(--border-color); padding-top: 25px; text-align: left;">
            <h4 style="color: var(--ucr-blue); margin-bottom: 10px;">Ajustar Preferencias Manualmente</h4>
            <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 15px;">
              Usted tiene control total. Seleccione el módulo por el cual desea iniciar y el nivel de acompañamiento deseado:
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-bottom: 20px;">
              <div>
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-light); display: block; margin-bottom: 5px;">Módulo Inicial:</label>
                <select id="select-custom-module" class="inline-input" style="padding: 8px 12px; height: 38px; width: 100%;">
                  <option value="m1">Módulo 1: Validar antes de invertir</option>
                  <option value="m2">Módulo 2: Radiografía del negocio con IA</option>
                  <option value="m3">Módulo 3: Automatización de procesos</option>
                  <option value="m4">Módulo 4: Ventas y decisiones con datos</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-light); display: block; margin-bottom: 5px;">Senda de Acompañamiento:</label>
                <select id="select-custom-senda" class="inline-input" style="padding: 8px 12px; height: 38px; width: 100%;">
                  <option value="guiada">Senda Guiada (más apoyo y glosario)</option>
                  <option value="acelerada">Senda Acelerada (ritmo normal)</option>
                  <option value="profunda">Senda Profunda (ritmo avanzado)</option>
                </select>
              </div>
            </div>
            <button type="button" id="btn-save-custom-routing" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;"><i class="fas fa-check"></i> Aplicar Ajustes</button>
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;

    // Attach result view listeners
    this.attachResultadoListeners(container);
  },

  renderScoreBar(label, score) {
    let color = 'var(--ucr-blue)';
    if (score < 45) {
      color = 'var(--accent-red)';
    } else if (score >= 65) {
      color = 'var(--accent-green)';
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: var(--text-light); margin-bottom: 4px;">
          <span>${label}</span>
          <span>${score}%</span>
        </div>
        <div class="progress-bar-bg" style="height: 6px; background-color:#eaeded;">
          <div class="progress-bar-fill" style="width: ${score}%; background-color: ${color};"></div>
        </div>
      </div>
    `;
  },

  attachResultadoListeners(container) {
    const btnReset = document.getElementById('btn-diag-reset-results');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm("¿Está seguro de que desea borrar sus respuestas y repetir el autodiagnóstico? Esto recalculará su ruta pero no eliminará su historial de progreso de actividades.")) {
          // Clear diagnostic status in state
          Estado.datos.diagnostico.completado = false;
          Estado.datos.diagnostico.respuestas = {};
          Estado.guardar();
          
          // Re-render
          this.currentQuestionIndex = 0;
          this.respuestasLocales = {};
          this.renderPregunta(container);
        }
      });
    }

    const btnCustomize = document.getElementById('btn-diag-customize');
    const customBox = document.getElementById('diag-custom-routing-box');
    if (btnCustomize && customBox) {
      btnCustomize.addEventListener('click', () => {
        customBox.classList.toggle('oculto');
        
        // Pre-fill fields
        const modSelect = document.getElementById('select-custom-module');
        const sendaSelect = document.getElementById('select-custom-senda');
        if (modSelect) modSelect.value = Estado.datos.diagnostico.resultado.moduloInicial;
        if (sendaSelect) sendaSelect.value = Estado.datos.diagnostico.resultado.senda;
      });
    }

    const btnApplyCustom = document.getElementById('btn-save-custom-routing');
    if (btnApplyCustom) {
      btnApplyCustom.addEventListener('click', () => {
        const modSelect = document.getElementById('select-custom-module');
        const sendaSelect = document.getElementById('select-custom-senda');
        
        if (modSelect && sendaSelect) {
          Estado.datos.diagnostico.resultado.moduloInicial = modSelect.value;
          Estado.datos.diagnostico.resultado.senda = sendaSelect.value;
          Estado.datos.perfil = sendaSelect.value;
          
          // Adjust sequence accordingly
          if (modSelect.value === 'm1') {
            Estado.datos.diagnostico.resultado.modulosRecomendados = ['m1', 'm2', 'm4', 'm3'];
          } else if (modSelect.value === 'm2') {
            Estado.datos.diagnostico.resultado.modulosRecomendados = ['m2', 'm3', 'm4'];
          } else if (modSelect.value === 'm3') {
            Estado.datos.diagnostico.resultado.modulosRecomendados = ['m3', 'm2', 'm4'];
          } else {
            Estado.datos.diagnostico.resultado.modulosRecomendados = ['m4', 'm2', 'm3'];
          }

          Estado.guardar();
          alert("Preferencias aplicadas correctamente. Su panel de inicio reflejará sus cambios.");
          window.location.reload();
        }
      });
    }
  }
};
