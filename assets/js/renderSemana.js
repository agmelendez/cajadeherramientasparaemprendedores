// --- RENDERSEMANA.JS ---

const RenderSemana = {
  render(container, semanaId) {
    const semana = App.semanas.find(s => s.id === semanaId);
    if (!semana) {
      Router.navigate('#/inicio');
      return;
    }

    const units = App.unidades.filter(u => u.semanaId === semanaId);
    const progress = App.getWeekProgress(semanaId);
    const moduloId = semana.moduloId;

    // Find first incomplete unit
    let targetUnit = units[0];
    let stepNumber = 1;
    for (let i = 0; i < units.length; i++) {
      const state = Estado.datos.progreso.unidades[units[i].id];
      if (!state || state.estado !== 'completada') {
        targetUnit = units[i];
        stepNumber = i + 1;
        break;
      }
    }

    let btnText = 'Comenzar Semana';
    let btnClass = 'btn-primary';
    if (progress === 100) {
      btnText = 'Revisar Contenidos';
      btnClass = 'btn-secondary';
      targetUnit = units[0];
    } else if (progress > 0) {
      btnText = `Continuar en Paso ${stepNumber}: ${targetUnit.titulo}`;
      btnClass = 'btn-primary';
    }

    let html = `
      <section class="semana-view">
        <!-- Back Button -->
        <a href="#/modulo/${moduloId}" class="btn btn-secondary" style="margin-bottom: 20px;"><i class="fas fa-arrow-left"></i> Volver al Módulo</a>

        <!-- Week Info Panel -->
        <div class="unit-body-card" style="margin-bottom: 30px; border-top: 5px solid var(--ucr-celeste);">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Semana ${semana.semanaGlobal} · ${semana.codigoAnterior}</span>
          <h2 style="border: none; padding: 0; margin-top: 5px; font-size: 1.8rem; margin-bottom: 15px;">${semana.titulo}</h2>
          
          <div style="background-color: #f4f9fc; padding: 15px 20px; border-radius: var(--radius-md); font-size: 1rem; margin-bottom: 20px; border-left: 4px solid var(--ucr-celeste);">
            <strong style="color: var(--ucr-dark); display: block; margin-bottom: 5px;"><i class="fas fa-graduation-cap"></i> Objetivo de Aprendizaje:</strong>
            ${semana.objetivo}
          </div>

          <div style="background-color: #fffdf5; padding: 15px 20px; border-radius: var(--radius-md); font-size: 1rem; margin-bottom: 25px; border-left: 4px solid var(--accent-yellow);">
            <strong style="color: var(--ucr-dark); display: block; margin-bottom: 5px;"><i class="fas fa-box"></i> Entregable esperado al finalizar:</strong>
            ${semana.entregable}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="font-size: 0.9rem; color: var(--text-light);">
              <i class="far fa-clock"></i> Tiempo estimado: ~${semana.tiempoEstimadoMin} mins · 
              <i class="fas fa-layer-group"></i> ${units.length} Pasos
            </div>
            
            <div style="display: flex; align-items: center; gap: 20px; min-width: 280px; justify-content: flex-end;">
              <div class="progress-container" style="flex-grow: 1; max-width: 150px; margin: 0;">
                <div class="progress-header" style="font-size: 0.75rem;">
                  <span>Completado</span>
                  <span>${progress}%</span>
                </div>
                <div class="progress-bar-bg" style="height: 6px;">
                  <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                </div>
              </div>
              <a href="#/unidad/${semanaId}/${targetUnit.id}" class="btn ${btnClass}">${btnText} <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <!-- Infographies Section -->
        ${semana.infografias && semana.infografias.length > 0 ? `
          <div class="unit-body-card" style="margin-bottom: 30px; padding: 25px;">
            <h3 style="color: var(--ucr-dark); font-size: 1.25rem; margin-bottom: 10px; border: none; padding: 0; display: flex; align-items: center; gap: 10px;">
              <i class="far fa-image" style="color: var(--ucr-blue);"></i> Guía Visual de la Semana
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 15px;">
              Haga clic en la infografía para ampliar y descargar el recurso gráfico.
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              ${semana.infografias.map(info => `
                <img src="${info.src}" alt="${info.alt}" class="infographic-thumb" style="max-width: 280px; margin: 0; cursor: pointer;" title="Clic para ampliar y descargar">
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Steps Checklist -->
        <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.3rem;">Pasos de la Semana</h3>
        <div class="unit-body-card" style="padding: 20px;">
          <ul style="margin: 0; list-style: none;">
     `;

    units.forEach((u, index) => {
      const uState = Estado.datos.progreso.unidades[u.id];
      let icon = '<i class="far fa-circle" style="color: var(--text-light); font-size: 1.2rem;"></i>';
      let rowStyle = 'opacity: 0.85;';
      let titleStyle = 'font-weight: 500;';

      if (uState && uState.estado === 'completada') {
        icon = '<i class="fas fa-check-circle" style="color: var(--accent-green); font-size: 1.2rem;"></i>';
        rowStyle = '';
        titleStyle = 'font-weight: 500; text-decoration: line-through; color: var(--text-light);';
      } else if (uState && uState.estado === 'vista') {
        icon = '<i class="fas fa-dot-circle" style="color: var(--ucr-celeste); font-size: 1.2rem;"></i>';
        rowStyle = '';
        titleStyle = 'font-weight: 700; color: var(--ucr-blue);';
      } else if (u.id === targetUnit.id && progress < 100) {
        // Highlight active unit to do
        icon = '<i class="far fa-arrow-alt-circle-right" style="color: var(--ucr-blue); font-size: 1.2rem;"></i>';
        rowStyle = '';
        titleStyle = 'font-weight: 700; color: var(--ucr-dark);';
      }

      html += `
        <li style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; gap: 15px; ${rowStyle}">
          <a href="#/unidad/${semanaId}/${u.id}" style="display: flex; align-items: center; gap: 15px; flex-grow: 1; color: inherit;">
            <div style="min-width: 25px; text-align: center;">${icon}</div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; font-weight: 700; display: block;">Paso ${index + 1}</span>
              <span style="${titleStyle}">${u.titulo}</span>
            </div>
          </a>
          <span class="badge-tipo ${u.tipo}" style="font-size: 0.7rem; padding: 3px 8px; border-radius: var(--radius-pill); font-weight: 700; text-transform: uppercase; color: white; background-color: var(--ucr-blue);">
            ${u.tipo.replace('_', ' ')}
          </span>
        </li>
      `;
    });

    html += `
          </ul>
        </div>
      </section>
    `;

    container.innerHTML = html;
    
    // Attach listeners for infographics
    this.attachListeners();
  },

  attachListeners() {
    const thumbs = document.querySelectorAll('.infographic-thumb');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxDownload = document.getElementById('lightbox-download');

    if (!lightbox) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.getAttribute('src');
        if (lightboxImg) lightboxImg.setAttribute('src', src);
        if (lightboxDownload) {
          lightboxDownload.setAttribute('href', src);
          const fileName = src.split('/').pop();
          lightboxDownload.setAttribute('download', fileName);
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        if (lightboxImg) lightboxImg.setAttribute('src', '');
      }, 300);
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    const escHandler = (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
};
