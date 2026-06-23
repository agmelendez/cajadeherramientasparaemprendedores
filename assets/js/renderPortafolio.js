// --- RENDERPORTAFOLIO.JS ---

const RenderPortafolio = {
  render(container) {
    const evidencias = Estado.datos.evidencias;
    const items = Object.entries(evidencias);

    let html = `
      <section class="portafolio-view">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
          <h2 style="border: none; padding: 0;">Portafolio de Evidencias</h2>
          
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="btn-export-portfolio" class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.85rem;"><i class="fas fa-file-export"></i> Exportar Respaldo</button>
            <button id="btn-import-portfolio" class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.85rem;"><i class="fas fa-file-import"></i> Importar Respaldo</button>
            <button id="btn-print-portfolio" class="btn btn-primary" style="padding: 8px 15px; font-size: 0.85rem;"><i class="fas fa-print"></i> Imprimir PDF</button>
          </div>
        </div>

        <!-- Warning and info -->
        <div class="unit-body-card" style="padding: 20px; background-color: #fafbfc; border-left: 4px solid var(--ucr-blue); margin-bottom: 30px;">
          <p style="font-size: 0.9rem; color: var(--text-light); margin: 0;">
            <i class="fas fa-info-circle"></i> Sus entregables y evidencias se guardan localmente en este navegador. Para conservarlos fuera de este dispositivo o compartirlos con su asesor, puede exportar el archivo de respaldo o imprimir este resumen en formato PDF.
          </p>
        </div>

        <input type="file" id="import-file-input" style="display: none;" accept=".json">
    `;

    if (items.length === 0) {
      html += `
        <div class="unit-body-card text-center" style="padding: 40px;">
          <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px; display: block;"></i>
          <h3>Su portafolio está vacío</h3>
          <p style="margin-top: 10px; color: var(--text-light);">Aún no ha guardado evidencias o retos en el programa. Inicie una semana y registre su trabajo.</p>
          <a href="#/inicio" class="btn btn-primary" style="margin-top: 15px;">Ir a los Módulos</a>
        </div>
      `;
    } else {
      html += `<div style="display: flex; flex-direction: column; gap: 20px;">`;

      // Group by module
      App.modulos.forEach(m => {
        const modWeeks = App.semanas.filter(s => s.moduloId === m.id);
        const modWeekIds = modWeeks.map(s => s.id);
        const modEvidences = items.filter(([uId]) => {
          const unit = App.unidades.find(u => u.id === uId);
          return unit && modWeekIds.includes(unit.semanaId);
        });

        if (modEvidences.length > 0) {
          html += `
            <div class="unit-body-card" style="border-top: 4px solid var(--ucr-blue);">
              <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.25rem;">${m.codigo}: ${m.nombre}</h3>
              <div style="display: flex; flex-direction: column; gap: 20px;">
          `;

          modEvidences.forEach(([uId, data]) => {
            const unit = App.unidades.find(u => u.id === uId);
            const week = App.semanas.find(s => s.id === unit.semanaId);
            
            html += `
              <div style="background-color: #fafbfc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                  <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">
                    Semana ${week.semanaGlobal} · ${week.titulo}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-light);">
                    Guardado: ${new Date(data.fecha).toLocaleDateString()}
                  </span>
                </div>
                
                <h4 style="font-size: 1.05rem; color: var(--ucr-blue); margin-bottom: 10px;">${unit.titulo}</h4>
                
                ${data.url ? `
                  <div style="margin-bottom: 10px; font-size: 0.95rem;">
                    <strong>Enlace entregable:</strong> 
                    <a href="${data.url}" target="_blank" rel="noopener noreferrer" style="word-break: break-all; text-decoration: underline;">
                      ${data.url} <i class="fas fa-external-link-alt" style="font-size: 0.75rem;"></i>
                    </a>
                  </div>
                ` : ''}
                
                ${data.nota ? `
                  <div style="background-color: white; border: 1px solid #f1f3f5; padding: 12px; border-radius: var(--radius-sm); font-size: 0.95rem; margin-top: 10px;">
                    <strong>Notas registradas:</strong>
                    <p style="margin-top: 5px; color: #444; white-space: pre-wrap; font-size: 0.92rem;">${data.nota}</p>
                  </div>
                ` : ''}

                ${data.archivoLocalName ? `
                  <div style="margin-top: 10px; font-size: 0.85rem; color: var(--text-light);">
                    <i class="fas fa-paperclip"></i> Archivo vinculado: ${data.archivoLocalName}
                  </div>
                ` : ''}
              </div>
            `;
          });

          html += `
              </div>
            </div>
          `;
        }
      });

      html += `</div>`;
    }

    html += `</section>`;
    container.innerHTML = html;

    // Attach Action listeners
    this.attachListeners();
  },

  attachListeners() {
    const btnExport = document.getElementById('btn-export-portfolio');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const jsonStr = Estado.exportarJSON();
        const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `respaldo-caja-ia-${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    const btnImport = document.getElementById('btn-import-portfolio');
    const importFile = document.getElementById('import-file-input');
    if (btnImport && importFile) {
      btnImport.addEventListener('click', () => importFile.click());
      
      importFile.addEventListener('change', () => {
        if (importFile.files.length > 0) {
          const file = importFile.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target.result;
            const success = Estado.importarJSON(content);
            if (success) {
              alert("Respaldo importado correctamente. La página se recargará para aplicar los cambios.");
              window.location.reload();
            } else {
              alert("Error: El archivo de respaldo no es válido.");
            }
          };
          reader.readAsText(file);
        }
      });
    }

    const btnPrint = document.getElementById('btn-print-portfolio');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }
};
