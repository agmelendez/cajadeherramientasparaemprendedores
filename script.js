// --- UCR CAJA DE HERRAMIENTAS IA - SCRIPT.JS ---

// Protección contra Clickjacking (Frame-busting)
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

// 1. REVEAL ANIMATIONS ON SCROLL (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in transition properties to major sections
document.querySelectorAll('.concept-card, .module-card, .res-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
});


// 2. LIGHTBOX LOGIC FOR INFOGRAPHICS
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxDownload = document.getElementById('lightbox-download');
    const thumbnails = document.querySelectorAll('.infographic-thumb');

    if (!lightbox) return; // Exit if lightbox not in DOM

    // Open lightbox
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('src');
            
            // Set image source
            lightboxImg.setAttribute('src', imgSrc);
            
            // Set download link attributes
            lightboxDownload.setAttribute('href', imgSrc);
            // Extract filename from path for the download attribute
            const fileName = imgSrc.split('/').pop();
            lightboxDownload.setAttribute('download', fileName);
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Clear src after fade out to avoid ghosting
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 300);
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close on X click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});


// 3. CORE NAVIGATION, SIDEBAR & INTERACTIVE MODULE SELECTOR LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-link, .sidebar-sublink');

    // Sidebar Mobile Toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
        });

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

        // Close sidebar on link click (mobile)
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    closeSidebar();
                }
            });
        });
    }

    // --- INTERACTIVE MODULE SELECTOR (DASHBOARD) ---
    const moduleIds = ['modulo0', 'toolkit1', 'modulo1', 'modulo2', 'modulo3'];
    const modules = moduleIds.map(id => document.getElementById(id)).filter(Boolean);
    const syllabusSection = document.getElementById('contenidos');
    
    // Inject the Selector grid HTML dynamically inside the Syllabus (Estructura del Programa) section
    if (syllabusSection) {
        const buttonsDiv = syllabusSection.querySelector('div[style*="text-align: center"]');
        const selectorHTML = `
            <div class="selector-modulos-container">
                <h4 class="selector-titulo">Explore los contenidos del programa haciendo clic en un módulo:</h4>
                <div class="selector-modulos-grid">
                    <button class="selector-modulo-card" data-target="modulo0" style="--accent-color: #1A5276;">
                        <div class="selector-card-icon">🧭</div>
                        <div class="selector-card-info">
                            <span class="selector-card-tag">Módulo 0</span>
                            <span class="selector-card-name">Diagnóstico</span>
                        </div>
                    </button>
                    <button class="selector-modulo-card" data-target="toolkit1" style="--accent-color: #1E8449;">
                        <div class="selector-card-icon">🔧</div>
                        <div class="selector-card-info">
                            <span class="selector-card-tag">Toolkit 1</span>
                            <span class="selector-card-name">Pre-Operativo</span>
                        </div>
                    </button>
                    <button class="selector-modulo-card" data-target="modulo1" style="--accent-color: var(--ucr-blue);">
                        <div class="selector-card-icon">📊</div>
                        <div class="selector-card-info">
                            <span class="selector-card-tag">Módulo I</span>
                            <span class="selector-card-name">Diagnóstico IA</span>
                        </div>
                    </button>
                    <button class="selector-modulo-card" data-target="modulo2" style="--accent-color: var(--ucr-celeste);">
                        <div class="selector-card-icon">⚙️</div>
                        <div class="selector-card-info">
                            <span class="selector-card-tag">Módulo II</span>
                            <span class="selector-card-name">Automatización</span>
                        </div>
                    </button>
                    <button class="selector-modulo-card" data-target="modulo3" style="--accent-color: #f39c12;">
                        <div class="selector-card-icon">📢</div>
                        <div class="selector-card-info">
                            <span class="selector-card-tag">Módulo III</span>
                            <span class="selector-card-name">Comercialización</span>
                        </div>
                    </button>
                </div>
                <div id="selector-instruccion" class="selector-instruccion">
                    💡 Haga clic en cualquier módulo para abrir su contenido interactivo y guías de trabajo.
                </div>
            </div>
        `;

        if (buttonsDiv) {
            buttonsDiv.insertAdjacentHTML('afterend', selectorHTML);
        } else {
            const header = syllabusSection.querySelector('.section-header');
            if (header) header.insertAdjacentHTML('afterend', selectorHTML);
        }
    }

    const selectorCards = document.querySelectorAll('.selector-modulo-card');
    const instructionText = document.getElementById('selector-instruccion');

    // --- MULTI-PAGE VIEW MANAGER (showPage) ---
    const showPage = (pageId, shouldScroll = true) => {
        const homeSections = [
            document.querySelector('.hero'),
            document.querySelector('.methodology-section'),
            document.querySelector('.frameworks'),
            document.querySelector('.learning-path')
        ].filter(Boolean);

        const syllabusHeader = document.querySelector('#contenidos .section-header');
        const syllabusButtons = document.querySelector('#contenidos div[style*="text-align: center"]');
        const selectorContainer = document.querySelector('.selector-modulos-container');

        const credenciales = document.getElementById('credenciales');
        const recursos = document.getElementById('recursos');

        // 1. PAGE: HOME / INICIO
        if (pageId === 'inicio') {
            // Show all home elements
            homeSections.forEach(el => el.classList.remove('oculto'));
            if (syllabusHeader) syllabusHeader.classList.remove('oculto');
            if (syllabusButtons) syllabusButtons.classList.remove('oculto');
            if (selectorContainer) selectorContainer.classList.remove('oculto');

            // Hide all modules
            modules.forEach(mod => mod.classList.add('oculto'));

            // Show Credenciales and Recursos
            if (credenciales) credenciales.classList.remove('oculto');
            if (recursos) recursos.classList.remove('oculto');

            // Reset active states on selector cards
            selectorCards.forEach(c => c.classList.remove('activo'));
            if (instructionText) {
                instructionText.innerHTML = '💡 Haga clic en cualquier módulo para abrir su contenido interactivo y guías de trabajo.';
            }

            // Sync sidebar
            makeActiveSidebar('inicio');

            // Scroll to top
            if (shouldScroll) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Quietly clear hash from URL
            if (window.location.hash && window.location.hash !== '#inicio') {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
            return;
        }

        // 2. PAGES: MODULES (modulo0, toolkit1, modulo1, modulo2, modulo3)
        if (moduleIds.includes(pageId)) {
            // Hide home sections
            homeSections.forEach(el => el.classList.add('oculto'));
            if (syllabusHeader) syllabusHeader.classList.add('oculto');
            if (syllabusButtons) syllabusButtons.classList.add('oculto');
            if (selectorContainer) selectorContainer.classList.add('oculto');

            // Hide Credenciales and Recursos
            if (credenciales) credenciales.classList.add('oculto');
            if (recursos) recursos.classList.add('oculto');

            // Toggle modules: show selected, hide others
            modules.forEach(mod => {
                const id = mod.getAttribute('id');
                if (id === pageId) {
                    mod.classList.remove('oculto');
                    // Force immediately visible opacity
                    mod.style.opacity = '1';
                    mod.style.transform = 'translateY(0)';
                    mod.querySelectorAll('.concept-card, .res-card').forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                } else {
                    mod.classList.add('oculto');
                }
            });

            // Sync sidebar
            makeActiveSidebar(pageId);

            // Scroll to top of module (which is now right under header)
            if (shouldScroll) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update URL hash quietly
            history.pushState("", document.title, window.location.pathname + window.location.search + '#' + pageId);
            return;
        }

        // 3. PAGE: CREDENCIALES
        if (pageId === 'credenciales') {
            // Hide home sections
            homeSections.forEach(el => el.classList.add('oculto'));
            if (syllabusHeader) syllabusHeader.classList.add('oculto');
            if (syllabusButtons) syllabusButtons.classList.add('oculto');
            if (selectorContainer) selectorContainer.classList.add('oculto');

            // Hide all modules
            modules.forEach(mod => mod.classList.add('oculto'));

            // Hide Recursos
            if (recursos) recursos.classList.add('oculto');

            // Show Credenciales
            if (credenciales) {
                credenciales.classList.remove('oculto');
            }

            // Sync sidebar
            makeActiveSidebar('credenciales');

            // Scroll to top
            if (shouldScroll) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update URL hash quietly
            history.pushState("", document.title, window.location.pathname + window.location.search + '#credenciales');
            return;
        }

        // 4. PAGE: RECURSOS
        if (pageId === 'recursos') {
            // Hide home sections
            homeSections.forEach(el => el.classList.add('oculto'));
            if (syllabusHeader) syllabusHeader.classList.add('oculto');
            if (syllabusButtons) syllabusButtons.classList.add('oculto');
            if (selectorContainer) selectorContainer.classList.add('oculto');

            // Hide all modules
            modules.forEach(mod => mod.classList.add('oculto'));

            // Hide Credenciales
            if (credenciales) credenciales.classList.add('oculto');

            // Show Recursos
            if (recursos) {
                recursos.classList.remove('oculto');
            }

            // Sync sidebar
            makeActiveSidebar('recursos');

            // Scroll to top
            if (shouldScroll) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update URL hash quietly
            history.pushState("", document.title, window.location.pathname + window.location.search + '#recursos');
            return;
        }
    };

    // Initially hide all modules to simplify the home page (handled by default showPage('inicio'))
    // Click handler for Selector Cards
    selectorCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-target');
            showPage(target);
        });
    });

    // Unified Link Interception & Navigation Handler
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const targetId = href.substring(1);

            // Special case: Home / Inicio
            if (targetId === 'inicio') {
                e.preventDefault();
                showPage('inicio');
                return;
            }

            // Special case: Contenidos header link
            if (targetId === 'contenidos') {
                e.preventDefault();
                showPage('inicio');
                // Scroll to contenidos section
                setTimeout(() => {
                    const selectorContainer = document.querySelector('.selector-modulos-container');
                    if (selectorContainer) {
                        selectorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
                return;
            }

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // 1. Identify which page this belongs to
                let pageId = null;
                if (moduleIds.includes(targetId)) {
                    pageId = targetId;
                } else if (targetId === 'credenciales' || targetId === 'recursos') {
                    pageId = targetId;
                } else {
                    // It might be a week inside a module
                    const parentModule = targetElement.closest('.module-card, .seccion-modulo');
                    if (parentModule) {
                        pageId = parentModule.getAttribute('id');
                    }
                }

                // 2. Activate page if we found it
                if (pageId) {
                    showPage(pageId, false);
                }

                // 3. Handle details accordion if target is inside details
                let parentDetails = targetElement;
                if (targetElement.tagName !== 'DETAILS') {
                    parentDetails = targetElement.closest('details');
                }
                if (parentDetails) {
                    parentDetails.open = true;
                }

                // 4. Scroll smoothly to target element
                const scrollOffset = 85; // header margin
                setTimeout(() => {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - scrollOffset,
                        behavior: 'smooth'
                    });
                }, pageId ? 100 : 0);

                // 5. Update sidebar active state
                makeActiveSidebar(targetId);
            }
        });
    });

    // Function to manually set active state in sidebar links
    const makeActiveSidebar = (targetId) => {
        sidebarLinks.forEach(item => item.classList.remove('active'));
        
        let linkToActivate = document.querySelector(`.sidebar-menu a[href="#${targetId}"]`);
        
        // If not found directly, try to activate the parent module link
        if (!linkToActivate) {
            const el = document.getElementById(targetId);
            if (el) {
                const parentModule = el.closest('.module-card, .seccion-modulo');
                if (parentModule) {
                    const parentId = parentModule.getAttribute('id');
                    linkToActivate = document.querySelector(`.sidebar-menu a[href="#${parentId}"]`);
                }
            }
        }

        if (linkToActivate) {
            linkToActivate.classList.add('active');
            if (linkToActivate.classList.contains('sidebar-sublink')) {
                const parentItem = linkToActivate.closest('.sidebar-item');
                if (parentItem) {
                    const parentLink = parentItem.querySelector('.sidebar-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        }
    };

    // Scrollspy to highlight active sidebar menu item on scroll
    const spyOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Scrollspy only reacts if element is intersecting and visible in DOM
            if (entry.isIntersecting && entry.target.offsetParent !== null) {
                const id = entry.target.getAttribute('id');
                makeActiveSidebar(id);
            }
        });
    }, spyOptions);

    // Watch all major sections
    const spySections = document.querySelectorAll('section[id], div[id].module-card');
    spySections.forEach(section => spyObserver.observe(section));

    // Deep linking: Check hash on page load, activate corresponding module and accordion
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        
        if (targetId === 'inicio') {
            showPage('inicio');
        } else {
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                let pageId = null;
                if (moduleIds.includes(targetId)) {
                    pageId = targetId;
                } else if (targetId === 'credenciales' || targetId === 'recursos') {
                    pageId = targetId;
                } else {
                    const parentModule = targetElement.closest('.module-card, .seccion-modulo');
                    if (parentModule) {
                        pageId = parentModule.getAttribute('id');
                    }
                }

                if (pageId) {
                    showPage(pageId, false);
                }

                let parentDetails = targetElement;
                if (targetElement.tagName !== 'DETAILS') {
                    parentDetails = targetElement.closest('details');
                }
                if (parentDetails) {
                    parentDetails.open = true;
                }

                // Scroll to the hash element after a brief delay for page rendering
                const scrollOffset = 85;
                setTimeout(() => {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - scrollOffset,
                        behavior: 'smooth'
                    });
                    makeActiveSidebar(targetId);
                }, 300);
            } else {
                // If hash is not a valid element ID, show home
                showPage('inicio');
            }
        }
    } else {
        // Default to home page view on load
        showPage('inicio');
    }
});

// 4. MÓDULO 0: DIAGNÓSTICO DE ENTRADA Y ENRUTAMIENTO PERSONALIZADO
document.addEventListener('DOMContentLoaded', () => {
    const respuestas = {};
    const preguntas = ['diag-q1', 'diag-q2', 'diag-q3'];
    let paso = 0;

    const diagBtns = document.querySelectorAll('.diag-btn');
    if (diagBtns.length === 0) return; // Exit if diagnostic section is not present

    diagBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eje = this.dataset.eje;
            const valor = this.dataset.valor;
            respuestas[eje] = valor;

            // Marcar selección
            const opcionesContainer = this.closest('.diag-opciones');
            if (opcionesContainer) {
                opcionesContainer.querySelectorAll('.diag-btn').forEach(b => b.classList.remove('seleccionado'));
            }
            this.classList.add('seleccionado');

            // Avanzar al siguiente paso
            paso++;
            setTimeout(() => {
                if (paso < preguntas.length) {
                    const siguientePregunta = document.getElementById(preguntas[paso]);
                    if (siguientePregunta) {
                        siguientePregunta.classList.remove('oculto');
                        siguientePregunta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                } else {
                    mostrarResultado();
                }
            }, 300);
        });
    });

    function mostrarResultado() {
        const resultado = document.getElementById('diag-resultado');
        const texto = document.getElementById('diag-texto-resultado');
        const btnIr = document.getElementById('diag-btn-ir');
        
        if (!resultado || !texto || !btnIr) return;

        // Lógica de enrutamiento
        let ruta = '#toolkit1';
        let mensaje = '';

        if (respuestas.madurez === 'idea' || respuestas.madurez === 'prototipo') {
            ruta = '#toolkit1';
            mensaje = 'Comenzá por el <strong>Toolkit 1 (pre-operativo)</strong>: ' +
                      'validación de ideas, análisis de mercado y modelo de negocio básico. ' +
                      'Los Módulos I–III estarán disponibles cuando tu negocio esté en marcha.';
        } else if (respuestas.herramienta === 'investigacion') {
            ruta = '#modulo1';
            mensaje = 'El <strong>Módulo I — Diagnóstico con IA</strong> es tu punto de entrada: ' +
                      'FODA dinámico, perfil de cliente y plan de acción estratégico.';
        } else if (respuestas.herramienta === 'automatizacion') {
            ruta = '#modulo2';
            mensaje = 'Si ya dominás el Módulo I, podés ir directo al ' +
                      '<strong>Módulo II — Automatización</strong>: flujos no-code, ' +
                      'chatbots y CRM básico.';
        } else if (respuestas.herramienta === 'contenido') {
            ruta = '#modulo3';
            mensaje = 'El <strong>Módulo III — Contenido y Comercialización</strong> ' +
                      'cubre identidad visual, producción audiovisual y campaña de lanzamiento.';
        } else {
            ruta = '#modulo1';
            mensaje = 'Te recomendamos comenzar por el <strong>Módulo I</strong> ' +
                      'para tener una base sólida antes de avanzar.';
        }

        texto.innerHTML = mensaje;
        btnIr.href = ruta;
        resultado.classList.remove('oculto');
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});