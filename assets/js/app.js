// --- APP.JS ---

const App = {
  modulos: [],
  semanas: [],
  unidades: [],
  recursos: [],
  rubrica: null,
  preguntas: [],
  glosario: [],

  async init() {
    console.log("Inicializando Caja de Herramientas IA...");
    
    // Initialize State
    Estado.init();

    // Load Data
    const success = await this.cargarDatos();
    if (!success) {
      document.getElementById('app').innerHTML = `
        <div class="unit-body-card text-center" style="margin-top: 50px;">
          <h2 style="color: var(--accent-red); border: 0;">Error de Carga</h2>
          <p>No pudimos cargar los contenidos del programa. Por favor, asegúrese de estar abriendo la aplicación desde un servidor web local o que la conexión a internet sea activa si está en GitHub Pages.</p>
          <a href="" class="btn btn-primary" style="margin-top: 15px;"><i class="fas fa-sync"></i> Reintentar</a>
        </div>
      `;
      return;
    }

    // Initialize Router
    Router.init();
    
    // Setup general event listeners
    this.setupAssistant();
    this.setupAccessibility();
  },

  async cargarDatos() {
    try {
      const getRelativePath = (path) => {
        // Resolve absolute URL relatively using document.baseURI
        return new URL(path, document.baseURI).href;
      };

      const [resMod, resSem, resUni, resRec, resRub, resPreg, resGlos] = await Promise.all([
        fetch(getRelativePath('contenido/modulos.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/semanas.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/unidades.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/recursos.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/rubrica-semanal.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/diagnostico-preguntas.json')).then(r => r.json()),
        fetch(getRelativePath('contenido/glosario.json')).then(r => r.json())
      ]);

      this.modulos = resMod;
      this.semanas = resSem;
      this.unidades = resUni;
      this.recursos = resRec;
      this.rubrica = resRub;
      this.preguntas = resPreg;
      this.glosario = resGlos;

      return true;
    } catch (e) {
      console.error("Error al cargar los archivos JSON estáticos:", e);
      return false;
    }
  },

  renderView(route) {
    const mainContainer = document.getElementById('app');
    if (!mainContainer) return;

    // Save route as last path
    Estado.datos.ultimaRuta = route.fullHash;
    Estado.guardar();

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');

    // Toggle home-only-section elements visibility
    const homeSections = document.querySelectorAll('.home-only-section');
    homeSections.forEach(sec => {
      if (route.view === 'inicio') {
        sec.classList.remove('oculto');
      } else {
        sec.classList.add('oculto');
      }
    });

    // Route dispatchers
    switch (route.view) {
      case 'inicio':
        RenderInicio.render(mainContainer);
        break;
      case 'diagnostico':
        Diagnostico.render(mainContainer);
        break;
      case 'modulo':
        const moduloId = route.params[0] || 'm1';
        RenderModulo.render(mainContainer, moduloId);
        break;
      case 'semana':
        const semanaId = route.params[0];
        if (semanaId) {
          RenderSemana.render(mainContainer, semanaId);
        } else {
          Router.navigate('#/inicio');
        }
        break;
      case 'unidad':
        const semId = route.params[0];
        const uniId = route.params[1];
        if (semId && uniId) {
          RenderUnidad.render(mainContainer, semId, uniId);
        } else {
          Router.navigate('#/inicio');
        }
        break;
      case 'portafolio':
        RenderPortafolio.render(mainContainer);
        break;
      case 'biblioteca':
        RenderBiblioteca.render(mainContainer);
        break;
      case 'credenciales':
        RenderCredenciales.render(mainContainer);
        break;
      case 'ruta':
        RenderRuta.render(mainContainer);
        break;
      default:
        // Page not found
        mainContainer.innerHTML = `
          <div class="unit-body-card text-center" style="margin: 50px 0;">
            <h2 style="border: 0;">Sección No Encontrada</h2>
            <p>Lo sentimos, no encontramos la sección especificada.</p>
            <a href="#/inicio" class="btn btn-primary"><i class="fas fa-home"></i> Volver al Inicio</a>
          </div>
        `;
    }
  },

  getModuleIdByWeekId(weekId) {
    const w = this.semanas.find(s => s.id === weekId);
    return w ? w.moduloId : null;
  },

  getWeekProgress(weekId) {
    // Check if semana is in Estado
    const state = Estado.datos.progreso.semanas[weekId];
    if (state && state.estado === 'completada') {
      return 100;
    }
    
    // Otherwise calculate based on completed units
    const weekUnits = this.unidades.filter(u => u.semanaId === weekId);
    if (weekUnits.length === 0) return 0;

    const completed = weekUnits.filter(u => {
      const uState = Estado.datos.progreso.unidades[u.id];
      return uState && uState.estado === 'completada';
    }).length;

    return Math.round((completed / weekUnits.length) * 100);
  },

  getModuleProgress(moduloId) {
    const modWeeks = this.semanas.filter(s => s.moduloId === moduloId);
    if (modWeeks.length === 0) return 0;

    let sum = 0;
    modWeeks.forEach(w => {
      sum += this.getWeekProgress(w.id);
    });
    return Math.round(sum / modWeeks.length);
  },

  getGlobalProgress() {
    const activeModules = this.modulos.filter(m => m.id !== 'm0'); // Exclude Módulo 0
    if (activeModules.length === 0) return 0;

    let sum = 0;
    activeModules.forEach(m => {
      sum += this.getModuleProgress(m.id);
    });
    return Math.round(sum / activeModules.length);
  },

  getGlossaryTermHtml(termText) {
    const found = this.glosario.find(g => g.termino.toLowerCase() === termText.toLowerCase());
    if (found) {
      return `<span class="glossary-term-highlight" tabindex="0">${termText}<span class="term-tooltip">${found.definicion}</span></span>`;
    }
    return termText;
  },

  // Parse HTML string to inject tooltips dynamically
  injectGlossaryTooltips(htmlString) {
    if (!this.glosario || this.glosario.length === 0) return htmlString;
    
    let result = htmlString;
    // We sort terms by length descending to match longer phrases first (e.g. IA generativa before IA)
    const sortedTerms = [...this.glosario].sort((a, b) => b.termino.length - a.termino.length);
    
    sortedTerms.forEach(termObj => {
      const term = termObj.termino;
      // Regex matches word bounds but avoids breaking HTML tags
      const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'gi');
      result = result.replace(regex, (match) => {
        return `<span class="glossary-term-highlight" tabindex="0">${match}<span class="term-tooltip">${termObj.definicion}</span></span>`;
      });
    });
    return result;
  },

  setupAssistant() {
    // Mobile assistant menu open/close listeners
    const toggleBtn = document.getElementById('assistant-toggle-btn');
    const chatContainer = document.getElementById('assistant-chat-container');
    const closeBtn = document.getElementById('assistant-close-btn');
    const iframe = document.getElementById('assistant-iframe');

    if (toggleBtn && chatContainer) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = chatContainer.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', active);
        
        // Lazy load iframe src
        if (active && iframe && !iframe.getAttribute('src')) {
          const src = iframe.getAttribute('data-src');
          if (src) iframe.setAttribute('src', src);
        }
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          chatContainer.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      }

      document.addEventListener('click', (e) => {
        if (chatContainer.classList.contains('active') && !chatContainer.contains(e.target) && e.target !== toggleBtn) {
          chatContainer.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  },

  setupAccessibility() {
    // Listen to keydown to improve tab focus for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const assistantChat = document.getElementById('assistant-chat-container');
        if (assistantChat && assistantChat.classList.contains('active')) {
          assistantChat.classList.remove('active');
          const toggle = document.getElementById('assistant-toggle-btn');
          if (toggle) toggle.focus();
        }
      }
    });
  }
};

// Initialize application on DOM load
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Sidebar controls
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      if (overlay) overlay.classList.add('active');
    });

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
  }
});
