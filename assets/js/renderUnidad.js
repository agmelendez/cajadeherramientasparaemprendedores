// --- RENDERUNIDAD.JS ---

const RenderUnidad = {
  render(container, semanaId, unidadId) {
    const semana = App.semanas.find(s => s.id === semanaId);
    const units = App.unidades.filter(u => u.semanaId === semanaId);
    const unitIndex = units.findIndex(u => u.id === unidadId);
    
    if (!semana || unitIndex === -1) {
      Router.navigate('#/inicio');
      return;
    }

    const unit = units[unitIndex];
    const nextUnit = units[unitIndex + 1];
    const prevUnit = units[unitIndex - 1];

    // Mark unit as viewed
    Estado.marcarUnidadVista(unidadId);

    // Breadcrumb and headers
    const progressPercent = Math.round(((unitIndex + 1) / units.length) * 100);

    let html = `
      <section class="unidad-view">
        <!-- Breadcrumb navigation -->
        <div style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
          <a href="#/inicio">Inicio</a> <i class="fas fa-chevron-right" style="font-size: 0.7rem;"></i> 
          <a href="#/modulo/${semana.moduloId}">Módulo ${semana.moduloId.replace('m', '')}</a> <i class="fas fa-chevron-right" style="font-size: 0.7rem;"></i> 
          <a href="#/semana/${semanaId}">${semana.codigoAnterior}</a> <i class="fas fa-chevron-right" style="font-size: 0.7rem;"></i> 
          <span style="color: var(--ucr-dark); font-weight: 700;">Paso ${unitIndex + 1}</span>
        </div>

        <!-- Progress within week -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 20px; background-color: var(--white); padding: 10px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.85rem; color: var(--text-light); font-weight: 700; text-transform: uppercase;">
            Paso ${unitIndex + 1} de ${units.length}
          </span>
          <div style="display: flex; align-items: center; gap: 15px; flex-grow: 1; max-width: 300px;">
            <div class="progress-bar-bg" style="height: 6px; width: 100%;">
              <div class="progress-bar-fill" style="width: ${progressPercent}%; background-color: var(--ucr-blue);"></div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); min-width: 35px;">${progressPercent}%</span>
          </div>
          <span class="badge-tipo ${unit.tipo}">${unit.tipo.replace('_', ' ')}</span>
        </div>

        <!-- Unit Main Card -->
        <div class="unit-body-card">
          <h2>${unit.titulo}</h2>
          
          <!-- Injected Content with Tooltips -->
          <div class="unit-content-text" style="font-size: 1.05rem; line-height: 1.7; color: #333; margin-bottom: 25px;">
            ${App.injectGlossaryTooltips(unit.html)}
          </div>

          <!-- Evidence block if Reto or Hacer -->
          ${unit.requiereAccion && unit.tipo !== 'rubrica' ? this.renderEvidenceBlock(unidadId, unit) : ''}

          <!-- Rubric Assessment block if Rubrica -->
          ${unit.tipo === 'rubrica' ? this.renderRubricBlock(semanaId) : ''}
        </div>

        <!-- Bottom Navigation buttons -->
        <div style="display: flex; justify-content: space-between; gap: 15px; margin-bottom: 50px;">
          <!-- Prev button -->
          ${prevUnit ? `
            <a href="#/unidad/${semanaId}/${prevUnit.id}" class="btn btn-secondary"><i class="fas fa-chevron-left"></i> Anterior</a>
          ` : `
            <a href="#/semana/${semanaId}" class="btn btn-secondary"><i class="fas fa-chevron-left"></i> Volver a la Semana</a>
          `}

          <!-- Next / Complete button -->
          ${nextUnit ? `
            <button id="btn-next-step" class="btn btn-primary">${unit.boton} <i class="fas fa-chevron-right"></i></button>
          ` : `
            <button id="btn-finish-week" class="btn btn-warning">${unit.boton} <i class="fas fa-check-double"></i></button>
          `}
        </div>
      </section>
    `;

    container.innerHTML = html;

    // Attach Action Listeners
    this.attachListeners(semanaId, unidadId, unitIndex, units);
  },

  renderEvidenceBlock(unidadId, unit) {
    const saved = Estado.datos.evidencias[unidadId] || { url: '', nota: '', archivoLocalName: '' };
    
    return `
      <div class="evidence-field-box">
        <h4><i class="fas fa-folder-open" style="color: var(--ucr-blue);"></i> Registro de Evidencia</h4>
        <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 15px;">
          ${unit.entregable ? `<strong>Entregable semanal:</strong> ${unit.entregable}<br>` : ''}
          Pegue el enlace de su trabajo y agregue comentarios. Los datos se guardan **únicamente** en su navegador de forma local.
        </p>

        <div style="margin-bottom: 15px;">
          <label style="font-size: 0.88rem; font-weight: 700; color: var(--ucr-dark); display: block; margin-bottom: 5px;">Enlace de evidencia (Google Drive, Canva, Padlet, etc.):</label>
          <input type="url" id="evidence-url" class="interactive-input" style="margin: 0;" placeholder="https://..." value="${saved.url}">
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-size: 0.88rem; font-weight: 700; color: var(--ucr-dark); display: block; margin-bottom: 5px;">Notas y reflexiones de la práctica:</label>
          <textarea id="evidence-nota" class="interactive-input" style="margin: 0;" placeholder="Escriba aquí sus observaciones o los resultados obtenidos...">${saved.nota}</textarea>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-size: 0.88rem; font-weight: 700; color: var(--ucr-dark); display: block; margin-bottom: 5px;">Archivo de soporte (opcional - registro local de metadatos):</label>
          <div style="display: flex; gap: 10px; align-items: center;">
            <input type="file" id="evidence-file" style="display: none;">
            <button type="button" id="btn-trigger-file" class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.85rem;"><i class="fas fa-paperclip"></i> Vincular Archivo</button>
            <span id="evidence-file-name" style="font-size: 0.85rem; color: var(--text-light);">${saved.archivoLocalName || 'Ningún archivo seleccionado'}</span>
          </div>
        </div>

        <div style="background-color: #fffaf0; border: 1px solid #ffe8cc; padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; color: #d97706; margin-bottom: 15px;">
          <i class="fas fa-user-shield"></i> **Nota de Privacidad**: No incluya nombres de clientes, claves, correos reales ni datos financieros sensibles de terceros.
        </div>

        <button type="button" id="btn-save-evidence" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;"><i class="fas fa-save"></i> Guardar Evidencia</button>
        <span id="evidence-save-status" class="evidence-status ${saved.url || saved.nota ? 'saved' : 'pending'}" style="margin-left: 15px;">
          ${saved.url || saved.nota ? '<i class="fas fa-check"></i> Guardado en este navegador' : 'Pendiente de guardar'}
        </span>
      </div>
    `;
  },

  renderRubricBlock(semanaId) {
    const rubric = App.rubrica;
    if (!rubric) return "<p>Rúbrica no cargada.</p>";

    // Load saved levels if any
    const savedEvaluacion = Estado.datos.progreso.semanas[semanaId]?.autoevaluacion || {};

    let tableHtml = `
      <div class="rubric-eval-view" style="margin-top: 30px;">
        <h4 style="font-size: 1.1rem; color: var(--ucr-dark); margin-bottom: 10px;"><i class="fas fa-clipboard-check"></i> Autoevaluación de la Semana</h4>
        <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 15px;">
          Valore su entregable semanal seleccionando el nivel obtenido en cada uno de los cuatro criterios. Al finalizar, confirme abajo para declarar la semana completada.
        </p>

        <div class="table-responsive">
          <table class="rubric-table">
            <thead>
              <tr>
                <th scope="col">Criterio</th>
                <th scope="col">Inicial (1 pto)</th>
                <th scope="col">Adecuado (2 ptos)</th>
                <th scope="col">Sólido (3 ptos)</th>
              </tr>
            </thead>
            <tbody>
    `;

    rubric.criterios.forEach(c => {
      const selectedLevel = savedEvaluacion[c.id]; // 1, 2 or 3

      tableHtml += `
        <tr data-criterio-id="${c.id}">
          <td class="rubric-criterion">${c.nombre}</td>
          <td class="rubric-cell ${selectedLevel === 1 ? 'selected-level' : ''}" data-nivel="1">${c.inicial}</td>
          <td class="rubric-cell ${selectedLevel === 2 ? 'selected-level' : ''}" data-nivel="2">${c.adecuado}</td>
          <td class="rubric-cell ${selectedLevel === 3 ? 'selected-level' : ''}" data-nivel="3">${c.solido}</td>
        </tr>
      `;
    });

    tableHtml += `
            </tbody>
          </table>
        </div>

        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
          <div>
            <strong style="color: #166534; display: block;">¿Listo para finalizar?</strong>
            <span style="font-size: 0.85rem; color: #166534;">Debe seleccionar un nivel para cada uno de los 4 criterios antes de completar.</span>
          </div>
          <button type="button" id="btn-confirm-rubric" class="btn btn-primary" style="background-color: var(--accent-green); border: none;"><i class="fas fa-check-double"></i> Declarar Semana Completada</button>
        </div>
      </div>
    `;

    return tableHtml;
  },

  attachListeners(semanaId, unidadId, unitIndex, units) {
    const unit = units[unitIndex];
    const nextUnit = units[unitIndex + 1];

    // Next step button listener
    const btnNext = document.getElementById('btn-next-step');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        // If it requires action and is not saved yet, warn or save it automatically
        if (unit.requiereAccion && unit.tipo !== 'rubrica') {
          this.autoSaveEvidence(unidadId);
        }

        // Navigate to next
        Router.navigate(`#/unidad/${semanaId}/${nextUnit.id}`);
      });
    }

    // Finish week button listener
    const btnFinish = document.getElementById('btn-finish-week');
    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        if (unit.requiereAccion && unit.tipo !== 'rubrica') {
          this.autoSaveEvidence(unidadId);
        } else if (unit.tipo === 'rubrica') {
          const btnConfirmRubric = document.getElementById('btn-confirm-rubric');
          if (btnConfirmRubric) {
            btnConfirmRubric.click();
            return;
          }
        }
        Router.navigate(`#/modulo/${App.getModuleIdByWeekId(semanaId)}`);
      });
    }

    // Evidence attachments
    const btnTriggerFile = document.getElementById('btn-trigger-file');
    const fileInput = document.getElementById('evidence-file');
    const fileNameSpan = document.getElementById('evidence-file-name');

    if (btnTriggerFile && fileInput) {
      btnTriggerFile.addEventListener('click', () => fileInput.click());
      
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          fileNameSpan.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
        }
      });
    }

    const btnSave = document.getElementById('btn-save-evidence');
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const urlInput = document.getElementById('evidence-url');
        const notaInput = document.getElementById('evidence-nota');
        const statusSpan = document.getElementById('evidence-save-status');

        const url = urlInput ? urlInput.value.trim() : '';
        const nota = notaInput ? notaInput.value.trim() : '';
        const fileName = fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : '';

        // Save
        Estado.guardarEvidencia(unidadId, url, nota, fileName);

        // Update status UI
        if (statusSpan) {
          statusSpan.className = 'evidence-status saved';
          statusSpan.innerHTML = '<i class="fas fa-check"></i> Guardado en este navegador';
        }
      });
    }

    // Rubric interactivity
    const cells = document.querySelectorAll('.rubric-cell');
    const evaluacion = Estado.datos.progreso.semanas[semanaId]?.autoevaluacion || {};

    cells.forEach(cell => {
      cell.addEventListener('click', function() {
        const row = this.closest('tr');
        const criterioId = row.dataset.criterioId;
        const nivel = Number(this.dataset.nivel);

        // Remove active selection in row
        row.querySelectorAll('.rubric-cell').forEach(c => c.classList.remove('selected-level'));
        
        // Select this cell
        this.classList.add('selected-level');

        // Store level locally
        evaluacion[criterioId] = nivel;
      });
    });

    const btnConfirmRubric = document.getElementById('btn-confirm-rubric');
    if (btnConfirmRubric) {
      btnConfirmRubric.addEventListener('click', () => {
        const criterios = App.rubrica ? App.rubrica.criterios : [];
        let allCompleted = true;

        criterios.forEach(c => {
          if (!evaluacion[c.id]) {
            allCompleted = false;
          }
        });

        if (!allCompleted) {
          alert("Por favor, seleccione un nivel de evaluación para cada uno de los 4 criterios de la rúbrica.");
          return;
        }

        // Save week completion
        Estado.guardarAutoevaluacion(semanaId, evaluacion);
        
        // Mark unit completed
        Estado.marcarUnidadCompletada(unidadId);

        alert("¡Felicidades! Ha completado la rúbrica y declarado esta semana de aprendizaje finalizada.");
        
        // Redirect back to module view
        Router.navigate(`#/modulo/${App.getModuleIdByWeekId(semanaId)}`);
      });
    }
  },

  autoSaveEvidence(unidadId) {
    const urlInput = document.getElementById('evidence-url');
    const notaInput = document.getElementById('evidence-nota');
    const fileInput = document.getElementById('evidence-file');

    const url = urlInput ? urlInput.value.trim() : '';
    const nota = notaInput ? notaInput.value.trim() : '';
    const fileName = fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : '';

    if (url || nota || fileName) {
      Estado.guardarEvidencia(unidadId, url, nota, fileName);
    } else {
      // Just mark unit as completed without evidence values
      Estado.marcarUnidadCompletada(unidadId);
    }
  }
};
