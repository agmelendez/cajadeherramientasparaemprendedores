// --- RENDERBIBLIOTECA.JS ---

const RenderBiblioteca = {
  render(container) {
    const recursos = App.recursos;
    
    let html = `
      <section class="biblioteca-view">
        <h2 style="border: none; padding: 0; margin-bottom: 20px;">Biblioteca de Recursos</h2>

        <!-- Filters Block -->
        <div class="unit-body-card" style="padding: 20px; margin-bottom: 30px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <!-- Search -->
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-light); display: block; margin-bottom: 5px;">Buscar:</label>
              <input type="text" id="lib-search" class="inline-input" style="padding: 8px 12px;" placeholder="Ingrese palabra clave...">
            </div>
            
            <!-- Module Filter -->
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-light); display: block; margin-bottom: 5px;">Filtrar por Módulo:</label>
              <select id="lib-filter-module" class="inline-input" style="padding: 8px 12px; height: 38px;">
                <option value="todos">Todos los Módulos</option>
                <option value="m1">Módulo 1: Validar antes de invertir</option>
                <option value="m2">Módulo 2: Radiografía del negocio con IA</option>
                <option value="m3">Módulo 3: Automatización de procesos</option>
                <option value="m4">Módulo 4: Ventas y decisiones con datos</option>
              </select>
            </div>

            <!-- Type Filter -->
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-light); display: block; margin-bottom: 5px;">Tipo de Recurso:</label>
              <select id="lib-filter-type" class="inline-input" style="padding: 8px 12px; height: 38px;">
                <option value="todos">Todos los Tipos</option>
                <option value="video">Videos de apoyo</option>
                <option value="lectura">Lecturas y guías</option>
                <option value="herramienta">Herramientas y plantillas</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Resources Grid -->
        <div id="lib-resources-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px;">
          <!-- Injected dynamically -->
        </div>
      </section>
    `;

    container.innerHTML = html;

    // Initial render and listeners
    this.updateGrid(recursos);

    const searchInput = document.getElementById('lib-search');
    const modSelect = document.getElementById('lib-filter-module');
    const typeSelect = document.getElementById('lib-filter-type');

    const triggerFilter = () => {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const modVal = modSelect ? modSelect.value : 'todos';
      const typeVal = typeSelect ? typeSelect.value : 'todos';

      const filtered = recursos.filter(r => {
        // Search filter
        const matchQuery = r.titulo.toLowerCase().includes(query) || (r.descripcion && r.descripcion.toLowerCase().includes(query));
        
        // Type filter
        const matchType = typeVal === 'todos' || r.tipo === typeVal;
        
        // Module filter
        // Find if this resource is mapped to a week that belongs to that module
        let matchModule = true;
        if (modVal !== 'todos') {
          // Check if there is a week in the module that contains this resource ID
          const modWeeks = App.semanas.filter(s => s.moduloId === modVal);
          matchModule = modWeeks.some(w => w.recursos.includes(r.id));
        }

        return matchQuery && matchType && matchModule;
      });

      this.updateGrid(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', triggerFilter);
    if (modSelect) modSelect.addEventListener('change', triggerFilter);
    if (typeSelect) typeSelect.addEventListener('change', triggerFilter);
  },

  updateGrid(list) {
    const grid = document.getElementById('lib-resources-grid');
    if (!grid) return;

    if (list.length === 0) {
      grid.style.display = 'block';
      grid.innerHTML = `
        <div class="unit-body-card text-center" style="padding: 30px; width: 100%;">
          <p>No se encontraron recursos que coincidan con sus filtros.</p>
        </div>
      `;
      return;
    }

    grid.style.display = 'grid';
    let html = '';
    list.forEach(r => {
      let icon = 'file-alt';
      let typeText = 'Lectura';
      let accent = 'var(--ucr-blue)';

      if (r.tipo === 'video') {
        icon = 'play-circle';
        typeText = 'Video';
        accent = 'var(--accent-yellow)';
      } else if (r.tipo === 'herramienta') {
        icon = 'tools';
        typeText = 'Herramienta';
        accent = 'var(--ucr-celeste)';
      }

      // Find week or module this belongs to
      const week = App.semanas.find(s => s.recursos.includes(r.id));
      let contextTag = 'General';
      if (week) {
        contextTag = `${week.codigoAnterior} · ${week.titulo}`;
      }

      html += `
        <div class="unit-body-card" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${accent};">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-light); background-color: #f1f5f9; padding: 2px 8px; border-radius: var(--radius-pill);">
                <i class="fas fa-${icon}"></i> ${typeText}
              </span>
              <span style="font-size: 0.72rem; color: var(--text-light);">${contextTag.split(' · ')[0]}</span>
            </div>
            
            <h4 style="font-size: 1rem; color: var(--ucr-dark); margin-bottom: 10px; line-height: 1.3;">${r.titulo}</h4>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 15px;">
              Recurso educativo y de apoyo práctico para el desarrollo de las consignas.
            </p>
          </div>

          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; padding: 8px 12px; font-size: 0.85rem; margin-top: auto; display: flex; justify-content: center; align-items: center; gap: 5px;">
            Acceder al Recurso <i class="fas fa-external-link-alt" style="font-size: 0.75rem;"></i>
          </a>
        </div>
      `;
    });

    grid.innerHTML = html;
  }
};
