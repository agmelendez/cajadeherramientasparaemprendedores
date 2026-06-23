// --- RENDERCREDENCIALES.JS ---

const RenderCredenciales = {
  render(container) {
    const diagnosticoCompletado = Estado.datos.diagnostico.completado;
    const globalProgress = App.getGlobalProgress();

    // Check module completions
    const m1Prog = App.getModuleProgress('m1');
    const m2Prog = App.getModuleProgress('m2');
    const m3Prog = App.getModuleProgress('m3');
    const m4Prog = App.getModuleProgress('m4');

    // Build badge records
    const achievements = [
      {
        id: "diag",
        titulo: "Brújula Activada",
        desc: "Completar el autodiagnóstico de clasificación inicial.",
        icon: "compass",
        obtenido: diagnosticoCompletado,
        color: "#1a5276"
      },
      {
        id: "m1",
        titulo: "Validador Crítico",
        desc: "Completar al 100% el Módulo 1 (Validar antes de invertir).",
        icon: "check-double",
        obtenido: m1Prog === 100,
        color: "#1e8449"
      },
      {
        id: "m2",
        titulo: "Estratega Pyme",
        desc: "Completar al 100% el Módulo 2 (Radiografía del negocio).",
        icon: "chart-line",
        obtenido: m2Prog === 100,
        color: "#005da4"
      },
      {
        id: "m3",
        titulo: "Integrador Eficiente",
        desc: "Completar al 100% el Módulo 3 (Ordenar y automatizar).",
        icon: "cogs",
        obtenido: m3Prog === 100,
        color: "#4daedb"
      },
      {
        id: "m4",
        titulo: "Decisor de Datos",
        desc: "Completar al 100% el Módulo 4 (Ventas y decisiones con datos).",
        icon: "database",
        obtenido: m4Prog === 100,
        color: "#f39c12"
      }
    ];

    let html = `
      <section class="credenciales-view">
        <h2 style="border: none; padding: 0; margin-bottom: 20px;">Reconocimientos y Acreditación</h2>

        <!-- Achievements Local grid -->
        <div class="unit-body-card" style="margin-bottom: 30px;">
          <h3 style="color: var(--ucr-dark); margin-bottom: 20px; font-size: 1.25rem;"><i class="fas fa-award" style="color: var(--accent-yellow);"></i> Reconocimientos de Avance Local</h3>
          <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 25px;">
            A medida que avance en los contenidos prácticos del curso, desbloqueará insignias locales que validan su progreso en este navegador.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
    `;

    achievements.forEach(a => {
      const opacity = a.obtenido ? '1' : '0.4';
      const border = a.obtenido ? `2px solid ${a.color}` : '2px dashed var(--border-color)';
      const background = a.obtenido ? '#ffffff' : '#f8fafc';

      html += `
        <div style="background-color: ${background}; border: ${border}; border-radius: var(--radius-md); padding: 20px; text-align: center; opacity: ${opacity}; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: var(--transition);">
          <div style="width: 60px; height: 60px; border-radius: 50%; background-color: ${a.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: var(--shadow-sm);">
            <i class="fas fa-${a.icon}"></i>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--ucr-dark); margin: 5px 0 0 0;">${a.titulo}</h4>
          <p style="font-size: 0.8rem; color: var(--text-light); line-height: 1.4;">${a.desc}</p>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${a.obtenido ? 'var(--accent-green)' : 'var(--text-light)'}; margin-top: auto;">
            ${a.obtenido ? '<i class="fas fa-check-circle"></i> Desbloqueada' : 'Bloqueada'}
          </span>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Institutional Certificate Pathway -->
        <div class="unit-body-card" style="border-top: 5px solid var(--ucr-blue);">
          <h3 style="color: var(--ucr-dark); margin-bottom: 15px; font-size: 1.25rem;"><i class="fas fa-graduation-cap"></i> Acreditación Institucional UCR</h3>
          <p style="font-size: 0.95rem; margin-bottom: 20px; color: #444;">
            El proyecto **AUGE-UCR** otorga una constancia oficial de participación a los emprendimientos y MiPYMES que cumplan con la ruta de formación práctica y presenten su portafolio de evidencias.
          </p>

          <h4 style="font-size: 1rem; color: var(--ucr-dark); margin-bottom: 10px;">Requisitos para solicitar el certificado:</h4>
          <ul style="margin-left: 20px; margin-bottom: 25px; font-size: 0.95rem; display: flex; flex-direction: column; gap: 8px;">
            <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Completar el 100% de las semanas del programa de estudio.</li>
            <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Registrar el enlace de evidencia correspondiente en cada semana formativa.</li>
            <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Exportar su portafolio de evidencias consolidado en formato JSON o PDF.</li>
            <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Enviar su portafolio al correo institucional de la asesoría de AUGE para su revisión final.</li>
          </ul>

          <div style="background-color: #f4f9fc; padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--ucr-blue);">
            <strong style="color: var(--ucr-dark); display: block; margin-bottom: 10px;">Estado de su Solicitud:</strong>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
              <span style="font-size: 0.95rem;">Progreso de requisitos: <strong>${globalProgress}%</strong></span>
              <a ${globalProgress === 100 ? 'href="mailto:auge@ucr.ac.cr?subject=Solicitud de Certificado Caja de Herramientas IA"' : 'style="pointer-events: none; opacity: 0.5;"'} class="btn btn-primary" style="${globalProgress < 100 ? 'background-color: #cbd5e1; color: #94a3b8 !important;' : ''}">
                <i class="fas fa-paper-plane"></i> Solicitar Certificado
              </a>
            </div>
            <div class="progress-container" style="margin-top: 15px;">
              <div class="progress-bar-bg" style="height: 8px;">
                <div class="progress-bar-fill" style="width: ${globalProgress}%;"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
  }
};
