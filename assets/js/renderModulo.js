// --- RENDERMODULO.JS ---

const RenderModulo = {
  render(container, moduloId) {
    const modulo = App.modulos.find(m => m.id === moduloId);
    if (!modulo) {
      Router.navigate('#/inicio');
      return;
    }

    const progress = App.getModuleProgress(moduloId);
    const weeks = App.semanas.filter(s => s.moduloId === moduloId);

    let html = `
      <section class="modulo-view">
        <!-- Back Button -->
        <a href="#/inicio" class="btn btn-secondary" style="margin-bottom: 20px;"><i class="fas fa-arrow-left"></i> Volver a la Estructura</a>

        <!-- Module Header Details -->
        <div class="unit-body-card" style="margin-bottom: 30px; border-top: 5px solid var(--ucr-blue);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; margin-bottom: 15px;">
            <div>
              <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-light); letter-spacing: 1px;">${modulo.codigo}</span>
              <h2 style="border: none; padding: 0; margin-top: 5px; font-size: 1.8rem;">${modulo.nombre}</h2>
            </div>
            <div style="background-color: #fafbfc; border: 1px solid var(--border-color); padding: 10px 15px; border-radius: var(--radius-md); text-align: center; min-width: 140px;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Avance Módulo</span>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--ucr-blue);">${progress}%</div>
            </div>
          </div>
          <p style="font-style: italic; color: var(--text-light); margin-bottom: 15px;">"${modulo.frase}"</p>
          <p>${modulo.descripcion}</p>
        </div>

        <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.3rem;">Semanas de Aprendizaje</h3>
        <div style="display: flex; flex-direction: column; gap: 20px;">
    `;

    if (weeks.length === 0) {
      html += `
        <div class="unit-body-card text-center" style="padding: 30px;">
          <p>Este módulo no cuenta con semanas de aprendizaje en la versión actual.</p>
        </div>
      `;
    } else {
      weeks.forEach(w => {
        const weekProgress = App.getWeekProgress(w.id);
        
        let statusBadge = '<span style="background-color: #f1f5f9; color: var(--text-light); padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 700;">NO INICIADA</span>';
        let btnText = 'Iniciar';
        let btnClass = 'btn-primary';

        if (weekProgress === 100) {
          statusBadge = '<span style="background-color: var(--accent-green); color: white; padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 700;">COMPLETADA</span>';
          btnText = 'Revisar';
          btnClass = 'btn-secondary';
        } else if (weekProgress > 0) {
          statusBadge = '<span style="background-color: var(--ucr-celeste); color: white; padding: 3px 8px; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 700;">EN CURSO</span>';
          btnText = 'Continuar';
          btnClass = 'btn-primary';
        }

        // Render week card
        html += `
          <div class="unit-body-card" style="padding: 25px; transition: var(--transition); border-left: 4px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
              <div>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Semana ${w.semanaGlobal} · ${w.codigoAnterior}</span>
                <h4 style="color: var(--ucr-dark); margin: 5px 0 0 0; font-size: 1.2rem;">${w.titulo}</h4>
              </div>
              ${statusBadge}
            </div>
            
            <p style="font-size: 0.95rem; margin-bottom: 15px; color: var(--text-light);">${w.descripcionBreve}</p>
            
            <div style="background-color: #f8fafc; padding: 12px 15px; border-radius: var(--radius-md); font-size: 0.88rem; margin-bottom: 20px; border-left: 3px solid var(--ucr-blue);">
              <strong>Entregable esperado:</strong> ${w.entregable}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
              <div style="font-size: 0.85rem; color: var(--text-light);">
                <i class="far fa-clock"></i> Tiempo estimado: ~${w.tiempoEstimadoMin} mins
              </div>
              <div style="display: flex; align-items: center; gap: 15px; min-width: 250px; justify-content: flex-end;">
                <div class="progress-container" style="flex-grow: 1; max-width: 150px; margin: 0;">
                  <div class="progress-bar-bg" style="height: 6px;">
                    <div class="progress-bar-fill" style="width: ${weekProgress}%;"></div>
                  </div>
                </div>
                <a href="#/semana/${w.id}" class="btn ${btnClass}" style="padding: 8px 16px; font-size: 0.85rem;">${btnText} <i class="fas fa-chevron-right" style="font-size: 0.75rem;"></i></a>
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </section>
    `;

    container.innerHTML = html;
  }
};
