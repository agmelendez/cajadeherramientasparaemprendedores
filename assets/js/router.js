// --- ROUTER.JS ---

const legacyRoutes = {
  '#modulo0': '#/diagnostico',
  '#diagnostico': '#/diagnostico',
  '#toolkit1': '#/modulo/m1',
  '#modulo1': '#/modulo/m2',
  '#modulo2': '#/modulo/m3',
  '#modulo3': '#/modulo/m4',
  '#t1-s1': '#/semana/t1-s1',
  '#t1-s2': '#/semana/t1-s2',
  '#t1-s3': '#/semana/t1-s3',
  '#t1-s4': '#/semana/t1-s4',
  '#m1-s1': '#/semana/m1-s1',
  '#m1-s2': '#/semana/m1-s2',
  '#m1-s3': '#/semana/m1-s3',
  '#m1-s4': '#/semana/m1-s4',
  '#m2-s5': '#/semana/m2-s5',
  '#m2-s6': '#/semana/m2-s6',
  '#m2-s7': '#/semana/m2-s7',
  '#m2-s8': '#/semana/m2-s8',
  '#m3-s9': '#/semana/m3-s9',
  '#m3-s10': '#/semana/m3-s10',
  '#m3-s11': '#/semana/m3-s11',
  '#m3-s12': '#/semana/m3-s12'
};

const Router = {
  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  },

  handleRouting() {
    const hash = window.location.hash || '#/inicio';

    // Check legacy redirects
    if (legacyRoutes[hash]) {
      window.location.hash = legacyRoutes[hash];
      return;
    }

    // Parse path and parameters
    const route = this.parseHash(hash);
    
    // Dispatch to app views
    this.dispatch(route);
  },

  parseHash(hash) {
    // Expected formats:
    // #/inicio
    // #/diagnostico
    // #/modulo/:id
    // #/semana/:id
    // #/unidad/:semanaId/:id
    // #/portafolio
    // #/biblioteca
    // #/credenciales
    const pathParts = hash.replace(/^#\//, '').split('/');
    const view = pathParts[0] || 'inicio';
    
    return {
      view: view,
      params: pathParts.slice(1),
      fullHash: hash
    };
  },

  dispatch(route) {
    // Hide assistant during diagnosis
    const assistant = document.getElementById('course-assistant-widget');
    if (assistant) {
      if (route.view === 'diagnostico') {
        assistant.classList.add('oculto');
      } else {
        assistant.classList.remove('oculto');
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active state in sidebar menu
    this.updateSidebarActive(route);

    // Call render views depending on route
    if (typeof App !== 'undefined' && App.renderView) {
      App.renderView(route);
    } else {
      console.warn("App controller not loaded yet.");
    }
  },

  updateSidebarActive(route) {
    const links = document.querySelectorAll('.sidebar-link, .sidebar-sublink');
    links.forEach(l => l.classList.remove('active'));

    // Highlight main links based on route view
    let selector = `.sidebar-menu a[href="#/${route.view}"]`;
    
    if (route.view === 'modulo' && route.params[0]) {
      selector = `.sidebar-menu a[href="#/modulo/${route.params[0]}"]`;
    } else if (route.view === 'semana' && route.params[0]) {
      // Find which module this week belongs to
      if (typeof App !== 'undefined' && App.getModuleIdByWeekId) {
        const modId = App.getModuleIdByWeekId(route.params[0]);
        if (modId) {
          selector = `.sidebar-menu a[href="#/modulo/${modId}"]`;
        }
      }
    } else if (route.view === 'unidad' && route.params[0]) {
      // Highlight the week's module link
      if (typeof App !== 'undefined' && App.getModuleIdByWeekId) {
        const modId = App.getModuleIdByWeekId(route.params[0]);
        if (modId) {
          selector = `.sidebar-menu a[href="#/modulo/${modId}"]`;
        }
      }
    }

    const activeLink = document.querySelector(selector);
    if (activeLink) {
      activeLink.classList.add('active');
      
      // Also highlight parent if it is a sublink
      if (activeLink.classList.contains('sidebar-sublink')) {
        const parentItem = activeLink.closest('.sidebar-item');
        if (parentItem) {
          const parentLink = parentItem.querySelector('.sidebar-link');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    }
  },

  navigate(hash) {
    window.location.hash = hash;
  }
};
