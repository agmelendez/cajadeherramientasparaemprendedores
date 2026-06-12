# CLAUDE.md — Caja de Herramientas IA para MiPYME

## Identidad del proyecto
- **Nombre oficial:** Caja de Herramientas de Inteligencia Artificial para la MiPYME
- **URL del sitio:** https://agmelendez.github.io/cajaherramientaspymes/
- **Repositorio:** github.com/agmelendez/cajaherramientaspymes
- **Rama de producción:** main (GitHub Pages se publica desde esta rama)
- **Tecnología:** HTML estático + CSS vanilla + JavaScript mínimo. NO hay framework, NO hay build step.
- **Institución:** UCR — CIOdD / DIPROVID
- **Colaboración activa:** Programa Auge (UCR)

## Estructura de archivos
```
/
├── index.html          ← Página principal (ÚNICO archivo HTML de contenido)
├── Infografias/        ← Imágenes PNG de las infografías por semana
├── logos/              ← Logos institucionales (ucr.png, ciodd.png, diprovid.png)
└── CLAUDE.md           ← Este archivo
```

## Terminología oficial (NO mezclar)
| Usar | NO usar |
|------|---------|
| Programa | Modelo / Modelo metodológico |
| Módulo I, II, III | Nivel / Fase (para los módulos existentes) |
| Toolkit 1 (pre-operativo) | Módulo 0 de negocio |
| Módulo 0 (diagnóstico de entrada) | Cuestionario inicial / Filtro |
| Asistentes virtuales institucionales | GPTs personales / GPTs UNED |
| Metodología RHEC | Ciclo / Proceso |
| Modelo CIFRCE | Framework / Técnica |
| Insignia digital | Certificado / Badge / Diploma |
| Toolkit 2 (de pago) | Curso avanzado / Nivel 2 / Módulo pago |
| Laboratorio Auge | Centro / Sala / Espacio IA |
| Asistente virtual institucional | Bot / GPT personal / Agente UNED |
| Proceso primero, herramienta después | IA como sustituto / Automatizá desde ya |
| Microcredencial | Certificado completo / Diploma UCR |

## Reglas de estilo del HTML
- Paleta: azul UCR `#003366`, azul medio `#1A5276`, azul claro `#2E86C1`
- Fuente principal: sistema sans-serif (no cargar Google Fonts externos)
- Estructura de sección: `<section id="...">` con título `<h2>` y subtítulo `<p class="seccion-intro">`
- Botones de recursos: `<a class="btn-recurso" href="...">Texto</a>`
- Cada módulo usa la clase `.modulo-card` con header de color correspondiente
- NO usar inline styles salvo para colores de módulo específicos
- Imágenes de infografías: siempre con `title="Clic para ampliar"` y `loading="lazy"`

## Restricciones críticas
- NUNCA modificar la rama main directamente sin revisar primero
- NUNCA eliminar vínculos a recursos externos sin confirmación explícita
- NUNCA cambiar el nombre del archivo index.html (rompe GitHub Pages)
- Los logos en /logos/ son recursos protegidos — no renombrar ni mover
- Toda atribución institucional debe indicar © UCR-CIOdD/DIPROVID

## Cambios pendientes (Plan de mejoras v1.0 — Jun 2025)
- [x] Módulo 0: diagnóstico de entrada (formulario Google Forms)
- [x] Normalización terminológica en todo el HTML
- [x] Texto introductorio por módulo (100–150 palabras)
- [x] Lista de chequeo al final de cada módulo
- [x] Toolkit 1: 4 nuevas semanas (T1-S1 a T1-S4)
- [x] Migrar vínculos de GPTs a cuentas institucionales cuando estén listos
- [x] Actualizar atribución de asistentes virtuales (quitar referencias UNED donde no corresponda)

## Decisiones de arquitectura del programa (Jun 2025)

### Modelo de dos niveles (definido en reunión técnica con Auge)
- **Nivel gratuito:** Toolkit 1 (pre-operativo, 4 semanas) + Módulos I–III como sitio estático GitHub Pages. Incentivo de completitud: insignia digital.
- **Nivel pago:** Toolkit 2 (avanzado). Plataforma: Moodle (a definir con DIPROVID/METIX). Incluye evaluación estructurada y certificado formal UCR.

### Diagnóstico de entrada (Módulo 0)
- Tres ejes: (1) madurez del negocio, (2) tipo de herramienta pertinente, (3) nivel de experiencia con IA
- Produce ruta personalizada de módulos (no solo dos opciones)
- JavaScript vanilla inline en index.html — sin dependencias externas

### Filosofía pedagógica de Auge (NO negociable en copy del sitio)
- La IA es acelerador, no sustituto
- El emprendedor aprende el proceso primero; la herramienta llega después
- Este principio debe reflejarse en el texto de introducción de cada módulo
- Formulación prohibida en el sitio: "automatice sus procesos" como promesa de entrada antes de que el usuario haya completado el Módulo I

### Laboratorio presencial Auge
- 4–5 licencias compartidas por estación (no por persona)
- Requiere protocolo de borrado de sesión entre usuarios
- No incluir texto sobre el laboratorio en el sitio hasta que esté operativo
- Placeholder interno: comentario HTML <!-- LABORATORIO: pendiente activación -->

### Sostenibilidad de licencias
- Licencias actuales vencen: noviembre 2025
- Monto acordado para renovación: ~$3,000 USD (financiado por Auge)
- Migración pendiente: GPTs de cuentas personales → cuenta institucional
- Plataforma target para migración: Google Workspace (según conversación Alonso)
- Todos los assets deben estar documentados en este CLAUDE.md antes de la migración

### Asistentes virtuales — estado actual (Jun 2025)
| Asistente | Plataforma | Cuenta | Estado |
|-----------|-----------|--------|--------|
| GPT Emprendedores V2 | Gemini | Personal | Migración pendiente |
| OMIPYMES UNED Territorial | ChatGPT | Personal/UNED | Migración pendiente |
| OMIPYMES UNED Analista | ChatGPT | Personal/UNED | Migración pendiente |
| GUESSSY | ChatGPT | Personal | Fuera de scope Auge |
| Guía de Costeo | ChatGPT | Personal | Migración pendiente |
| Marketing Digital | ChatGPT | Personal | Migración pendiente |
| OBI | ChatGPT | Personal | Migración pendiente |

### Contenidos del Toolkit 1 que aún requieren producción
- T1-S1: guía Google Trends + Exploding Topics en español
- T1-S2: plantilla Buyer Persona con Claude/Gemini
- T1-S3: protocolo de encuesta de validación primaria
- T1-S4: canvas de modelo de negocio socrático con IA
- Todos los recursos deben alojarse en cuenta institucional antes de publicarse

