// --- RENDERRUTA.JS ---
const RenderRuta = {
  render(container) {
    let html = `
      <section class="ruta-view">
        <a href="#/inicio" class="btn btn-secondary" style="margin-bottom: 20px;"><i class="fas fa-arrow-left"></i> Volver al Inicio</a>
        
        <section class="learning-path " style="padding: 4rem 2rem; background-color: #f4f6f9;">
        <div class="section-header">
            <h3>🗺️ Ruta de Aprendizaje: Caja de Herramientas de IA</h3>
            <p>La formación se divide en tres etapas incrementales, cada una compuesta por 4 semanas de trabajo bajo el
                modelo <strong>70% práctico y 30% teórico</strong>.</p>
        </div>

        <div class="learning-path-container"
            style="max-width: 1100px; margin: 0 auto; padding: 0 1rem; display: flex; flex-direction: column; align-items: center;">

            <style>
                :root {
                    --infog-blue-light: #e3f2fd;
                    --infog-blue-main: #5eb5e0;
                    --infog-green-light: #e8f5e9;
                    --infog-green-main: #8cc63f;
                    --infog-orange-light: #fff3e0;
                    --infog-orange-main: #fbb03b;
                }

                .infog-container {
                    display: flex;
                    gap: 20px;
                    width: 100%;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 3rem;
                }

                .infog-module {
                    flex: 1;
                    min-width: 250px;
                    border-radius: 10px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .infog-module-header {
                    padding: 15px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 1.1rem;
                    border-radius: 8px;
                    margin-bottom: 5px;
                }

                .infog-mod-1 .infog-module-header {
                    background-color: var(--infog-blue-main);
                    color: white;
                }

                .infog-mod-2 .infog-module-header {
                    background-color: var(--infog-green-main);
                    color: white;
                }

                .infog-mod-3 .infog-module-header {
                    background-color: var(--infog-orange-main);
                    color: white;
                }

                .infog-card {
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 12px 15px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    min-height: 70px;
                }

                .infog-mod-1 .infog-card {
                    background-color: var(--infog-blue-light);
                    border-color: #bbdefb;
                }

                .infog-mod-2 .infog-card {
                    background-color: var(--infog-green-light);
                    border-color: #c8e6c9;
                }

                .infog-mod-3 .infog-card {
                    background-color: var(--infog-orange-light);
                    border-color: #ffe0b2;
                }

                .infog-icon-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                    font-size: 1.2rem;
                }

                .infog-card-content {
                    font-size: 0.9rem;
                    line-height: 1.3;
                    text-align: left;
                }

                .infog-card-content strong {
                    display: block;
                    margin-bottom: 3px;
                }

                /* Sección Inferior - Ciclo RHEC */
                .rhec-section {
                    margin-top: 10px;
                    margin-bottom: 30px;
                    text-align: center;
                    width: 100%;
                }

                .rhec-title {
                    font-weight: bold;
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                    color: var(--ucr-blue);
                }

                .rhec-container {
                    position: relative;
                    width: 250px;
                    height: 250px;
                    margin: 0 auto;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .rhec-step {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 8px;
                    color: white;
                    font-size: 0.70rem;
                    box-sizing: border-box;
                    text-align: center;
                }

                /* Posicionamiento del Ciclo */
                .step-reto {
                    background-color: #4a90e2;
                    top: 0;
                    left: 0;
                    border-radius: 100% 0 0 0;
                    align-items: flex-end;
                    padding-right: 15px;
                }

                .step-hacer {
                    background-color: #7cb342;
                    top: 0;
                    right: 0;
                    border-radius: 0 100% 0 0;
                    align-items: flex-start;
                    padding-left: 15px;
                }

                .step-compartir {
                    background-color: #5eb5e0;
                    bottom: 0;
                    left: 0;
                    border-radius: 0 0 0 100%;
                    align-items: flex-end;
                    padding-right: 15px;
                }

                .step-entender {
                    background-color: #f39c12;
                    bottom: 0;
                    right: 0;
                    border-radius: 0 0 100% 0;
                    align-items: flex-start;
                    padding-left: 15px;
                }

                .rhec-center {
                    width: 70px;
                    height: 70px;
                    background-color: white;
                    border-radius: 50%;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .infog-container {
                        flex-direction: column;
                        align-items: center;
                    }

                    .infog-module {
                        width: 100%;
                    }
                }
            </style>

            <div class="infog-container">
                <div class="infog-module infog-mod-1">
                    <div class="infog-module-header">Módulo I: Diagnóstico con IA</div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">⚙️</div>
                        <div class="infog-card-content">
                            <strong>Semana 1: Primer contacto</strong>
                            Configuración de LLMs y seguridad.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">💬</div>
                        <div class="infog-card-content">
                            <strong>Semana 2: Prompting</strong>
                            El arte de preguntar.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🔍</div>
                        <div class="infog-card-content">
                            <strong>Semana 3: Diagnóstico</strong>
                            FODA dinámico y perfil.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">📋</div>
                        <div class="infog-card-content">
                            <strong>Semana 4: Plan de Acción</strong>
                            De los datos a la estrategia real.
                        </div>
                    </div>
                </div>

                <div class="infog-module infog-mod-2">
                    <div class="infog-module-header">Módulo II: Automatización</div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🔀</div>
                        <div class="infog-card-content">
                            <strong>Semana 5: No-Code</strong>
                            Su primer flujo automático.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🤖</div>
                        <div class="infog-card-content">
                            <strong>Semana 6: Chatbots</strong>
                            Automatización de atención.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🗄️</div>
                        <div class="infog-card-content">
                            <strong>Semana 7: Sistematización</strong>
                            CRM básico y bases de datos.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">💰</div>
                        <div class="infog-card-content">
                            <strong>Semana 8: Integración Final</strong>
                            Cálculo del ROI.
                        </div>
                    </div>
                </div>

                <div class="infog-module infog-mod-3">
                    <div class="infog-module-header">Módulo III: Comercialización</div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🎨</div>
                        <div class="infog-card-content">
                            <strong>Semana 9: Identidad Visual</strong>
                            Diseño asistido por IA.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">🎬</div>
                        <div class="infog-card-content">
                            <strong>Semana 10: Producción</strong>
                            Video, locución y avatares.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">💡</div>
                        <div class="infog-card-content">
                            <strong>Semana 11: Prefactibilidad</strong>
                            Validación de ideas.
                        </div>
                    </div>
                    <div class="infog-card">
                        <div class="infog-icon-circle">📣</div>
                        <div class="infog-card-content">
                            <strong>Semana 12: Campaña</strong>
                            Lanzamiento final (AIDA).
                        </div>
                    </div>
                </div>
            </div>

            <div class="rhec-section">
                <div class="rhec-title"><i class="fas fa-sync-alt" style="margin-right: 0.5rem;"></i> El Ciclo Semanal
                    (Metodología RHEC)</div>
                <div class="rhec-container">
                    <div class="rhec-step step-reto">
                        <strong>1. RETO (5%)</strong>
                        <span>Desafío real</span>
                    </div>
                    <div class="rhec-step step-hacer">
                        <strong>2. HACER (65%)</strong>
                        <span>Práctica pura</span>
                    </div>
                    <div class="rhec-step step-compartir">
                        <strong>4. COMPARTIR (5%)</strong>
                        <span>Reflexión</span>
                    </div>
                    <div class="rhec-step step-entender">
                        <strong>3. ENTENDER (25%)</strong>
                        <span>Teoría aplicada</span>
                    </div>
                    <div class="rhec-center">
                        <span style="font-size: 1.5rem;"><i class="fas fa-sync-alt fa-spin"
                                style="color: var(--ucr-blue);"></i></span>
                    </div>
                </div>
            </div>

            <details class="interactive-path-summary"
                style="background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; width: 100%; max-width: 800px;">
                <summary class="btn-hero"
                    style="display: inline-flex; justify-content: center; align-items: center; gap: 0.5rem; margin: 0 auto 2rem auto; width: fit-content; cursor: pointer; list-style: none;">
                    <i class="fas fa-plus-circle"></i> Ver detalle de los módulos y metodología
                </summary>

                <div class="path-details-content" style="padding: 2rem; text-align: left;">
                    <div class="path-module" style="margin-bottom: 2rem;">
                        <h4
                            style="color: var(--ucr-blue); border-bottom: 2px solid var(--accent-yellow); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                            Módulo I: Diagnóstico con IA</h4>
                        <p class="path-focus" style="font-size: 0.95rem; color: #555; margin-bottom: 1rem;"><em>Foco:
                                Análisis estratégico y toma de decisiones.</em></p>
                        <ul class="path-weeks" style="list-style-type: none; padding-left: 0;">
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 1:</strong> Primer contacto, configuración de LLMs (ChatGPT, Claude,
                                Gemini) y seguridad digital.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 2:</strong> Ingeniería de Prompts: El arte de preguntar con el modelo
                                <strong>CIFRCE</strong>.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 3:</strong> Diagnóstico de Negocio: FODA dinámico, finanzas básicas y
                                perfil de cliente.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 4:</strong> Síntesis y Plan de Acción: De los datos a la estrategia real.
                            </li>
                        </ul>
                        <p style="font-size: 0.88rem; color: #888888; font-style: italic; margin-top: 0.8rem; padding-left: 0.2rem; line-height: 1.4;">
                            ✋ <strong>Criterio HITL:</strong> cada herramienta configurada y cada plan generado se revisa con tu propio criterio empresarial antes de implementar. La IA sugiere, vos decidís.
                        </p>
                    </div>

                    <div class="path-module" style="margin-bottom: 2rem;">
                        <h4
                            style="color: var(--ucr-blue); border-bottom: 2px solid var(--accent-yellow); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                            Módulo II: Automatización de Procesos</h4>
                        <p class="path-focus" style="font-size: 0.95rem; color: #555; margin-bottom: 1rem;"><em>Foco:
                                Eficiencia operativa y ahorro de tiempo.</em></p>
                        <ul class="path-weeks" style="list-style-type: none; padding-left: 0;">
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 5:</strong> Introducción al No-Code: Su primer flujo automático en
                                <strong>Make</strong>.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 6:</strong> Chatbots y Mensajería: Automatización de la atención al
                                cliente.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 7:</strong> Sistematización: Creación de un CRM básico y gestión de bases
                                de datos.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 8:</strong> Integración Final: Cálculo del ROI de la automatización.
                            </li>
                        </ul>
                        <p style="font-size: 0.88rem; color: #888888; font-style: italic; margin-top: 0.8rem; padding-left: 0.2rem; line-height: 1.4;">
                            ✋ <strong>Criterio HITL:</strong> la automatización se activa únicamente para procesos que ya comprendés y controlás. No se automatiza lo que aún no se domina.
                        </p>
                    </div>

                    <div class="path-module" style="margin-bottom: 2.5rem;">
                        <h4
                            style="color: var(--ucr-blue); border-bottom: 2px solid var(--accent-yellow); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                            Módulo III: Contenido y Comercialización</h4>
                        <p class="path-focus" style="font-size: 0.95rem; color: #555; margin-bottom: 1rem;"><em>Foco:
                                Visibilidad, ventas y marca digital.</em></p>
                        <ul class="path-weeks" style="list-style-type: none; padding-left: 0;">
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 9:</strong> Identidad Visual: Diseño asistido por IA con
                                <strong>Canva</strong>.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 10:</strong> Producción Audiovisual: Video, locución y avatares (CapCut,
                                Eleven Labs).
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 11:</strong> Prefactibilidad: Uso de IA para validar nuevas ideas de
                                inversión.
                            </li>
                            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                                <i class="fas fa-check-circle"
                                    style="position: absolute; left: 0; top: 3px; color: var(--accent-yellow);"></i>
                                <strong>Semana 12:</strong> Campaña Integral: Lanzamiento final utilizando el framework
                                AIDA.
                            </li>
                        </ul>
                        <p style="font-size: 0.88rem; color: #888888; font-style: italic; margin-top: 0.8rem; padding-left: 0.2rem; line-height: 1.4;">
                            ✋ <strong>Criterio HITL:</strong> el contenido generado con IA sintética —imágenes, voz, avatar— requiere declaración explícita. Tu marca se construye sobre la confianza, no solo sobre la velocidad de producción.
                        </p>
                    </div>

                    <hr style="border: 0; height: 1px; background: #eee; margin: 2rem 0;">

                    <div class="path-methodology"
                        style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--ucr-blue);">
                        <h4 style="color: var(--ucr-blue); margin-bottom: 1rem;"><i class="fas fa-sync-alt"
                                style="margin-right: 0.5rem;"></i> El Ciclo Semanal (Metodología RHEC)</h4>
                        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Cada una de las 12 semanas anteriores
                            sigue un motor de aprendizaje de 4 pasos para asegurar que el conocimiento se aplique de
                            inmediato:</p>

                        <div
                            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                            <div
                                style="background: white; padding: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h5 style="color: #333; margin-bottom: 0.5rem;"><span
                                        style="color: var(--accent-yellow); font-size: 1.2rem; font-weight: bold; margin-right: 0.3rem;">1.</span>
                                    RETO</h5>
                                <p style="font-size: 0.85rem; color: #666; margin: 0;">Un desafío concreto vinculado a
                                    su negocio real.</p>
                            </div>
                            <div
                                style="background: white; padding: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h5 style="color: #333; margin-bottom: 0.5rem;"><span
                                        style="color: var(--accent-yellow); font-size: 1.2rem; font-weight: bold; margin-right: 0.3rem;">2.</span>
                                    HACER</h5>
                                <p style="font-size: 0.85rem; color: #666; margin: 0;">El núcleo del aprendizaje.
                                    Video-tutoriales y ejercicios.</p>
                            </div>
                            <div
                                style="background: white; padding: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h5 style="color: #333; margin-bottom: 0.5rem;"><span
                                        style="color: var(--accent-yellow); font-size: 1.2rem; font-weight: bold; margin-right: 0.3rem;">3.</span>
                                    ENTENDER</h5>
                                <p style="font-size: 0.85rem; color: #666; margin: 0;">Microvídeos teóricos de la
                                    ciencia detrás de la herramienta.</p>
                            </div>
                            <div
                                style="background: white; padding: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h5 style="color: #333; margin-bottom: 0.5rem;"><span
                                        style="color: var(--accent-yellow); font-size: 1.2rem; font-weight: bold; margin-right: 0.3rem;">4.</span>
                                    COMPARTIR</h5>
                                <p style="font-size: 0.85rem; color: #666; margin: 0;">Reflexión colectiva y
                                    retroalimentación con empresarios.</p>
                            </div>
                        </div>

                        <details class="academico-accordion">
                            <summary><i class="fas fa-graduation-cap"></i> Ver fundamento académico del Ciclo RHEC</summary>
                            <div class="academico-content">
                                <table class="academic-table">
                                    <thead>
                                        <tr>
                                            <th>Fase RHEC</th>
                                            <th>Kolb (1984)</th>
                                            <th>Taxonomía de Bloom (revisada)</th>
                                            <th>Kapur (2016)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>RETO</strong></td>
                                            <td>Experiencia concreta (activación de esquemas previos)</td>
                                            <td>Recordar / Comprender</td>
                                            <td>Generación — activar conocimientos previos y detectar vacíos</td>
                                        </tr>
                                        <tr>
                                            <td><strong>HACER</strong></td>
                                            <td>Experimentación activa</td>
                                            <td>Aplicar / Analizar</td>
                                            <td>Exploración — intento guiado de solución antes de instrucción completa</td>
                                        </tr>
                                        <tr>
                                            <td><strong>ENTENDER</strong></td>
                                            <td>Conceptualización abstracta</td>
                                            <td>Analizar / Evaluar</td>
                                            <td>Consolidación — instrucción que organiza estructuras generadas en el HACER</td>
                                        </tr>
                                        <tr>
                                            <td><strong>COMPARTIR</strong></td>
                                            <td>Observación reflexiva</td>
                                            <td>Evaluar / Crear</td>
                                            <td>Transferencia — aplicación del conocimiento a nuevos contextos</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style="font-size: 0.9rem; color: #555; line-height: 1.5; font-style: italic; margin-top: 10px;">
                                    El ciclo RHEC reordena deliberadamente las fases de Kolb: coloca la experimentación activa (HACER) antes de la conceptualización abstracta (ENTENDER). Esta reordenación se sustenta en la evidencia de Kapur (2016): el intento práctico previo a la instrucción genera estructuras cognitivas más profundas y transferibles.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </details>
        </div>
    </section>
      </section>
    `;
    container.innerHTML = html;
  }
};
