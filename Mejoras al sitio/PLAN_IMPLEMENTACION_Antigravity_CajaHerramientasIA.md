# Plan de implementación — Rediseño del repositorio
## Caja de Herramientas de IA para la MiPYME (CIOdD–DIPROVID, UCR)

> **Documento dirigido a:** Antigravity (agente de desarrollo).
> **Insumos que recibe el agente:** (1) el repositorio completo en GitHub con todas sus funcionalidades; (2) este documento como conjunto de instrucciones.
> **Objetivo:** refactorizar el *continente* (arquitectura, navegación, estado, accesibilidad) **sin alterar el contenido ni eliminar funcionalidades**, llevando el sitio de una página única monolítica a un entorno de aprendizaje MOOC navegable por fases.
> **Origen:** este plan operacionaliza la *Auditoría de usabilidad y arquitectura de información* (v1.0). Cada tarea referencia el hallazgo de auditoría (H1–H15) que cierra.
> **Versión del plan:** 1.0 · Junio 2026.

---

## Índice

1. [Cómo usar este documento](#1-cómo-usar-este-documento)
2. [Restricciones duras (no negociables)](#2-restricciones-duras-no-negociables)
3. [Definición de "Hecho" global](#3-definición-de-hecho-global)
4. [Fase 0 — Pre-vuelo: inventario, línea base y andamiaje](#4-fase-0--pre-vuelo-inventario-línea-base-y-andamiaje)
5. [Decisión de arquitectura y stack](#5-decisión-de-arquitectura-y-stack)
6. [Modelo de contenido (contrato de datos)](#6-modelo-de-contenido-contrato-de-datos)
7. [Esquema de estado (localStorage)](#7-esquema-de-estado-localstorage)
8. [Fase 1 (Ola 1) — Quick wins sobre el sitio actual](#8-fase-1-ola-1--quick-wins-sobre-el-sitio-actual)
9. [Fase 2 (Ola 2) — Refactor arquitectónico a tres niveles](#9-fase-2-ola-2--refactor-arquitectónico-a-tres-niveles)
10. [Fase 3 (Ola 3) — Diferenciación por perfil y cierre motivacional](#10-fase-3-ola-3--diferenciación-por-perfil-y-cierre-motivacional)
11. [Qué NO tocar (preservación)](#11-qué-no-tocar-preservación)
12. [Convenciones de trabajo del agente](#12-convenciones-de-trabajo-del-agente)
13. [Matriz de pruebas de aceptación](#13-matriz-de-pruebas-de-aceptación)
14. [Anexos](#14-anexos)

---

## 1. Cómo usar este documento

1. Ejecutá las fases **en orden** (0 → 1 → 2 → 3). Cada fase es **independientemente desplegable**: al terminar cualquiera, el sitio debe quedar funcional y publicable en GitHub Pages. **Nunca dejes el sitio roto entre fases.**
2. **No confíes en las rutas/nombres que este documento infiere** (Anexo A): la auditoría se hizo sobre el sitio *renderizado*, no sobre el árbol de archivos. La **Fase 0 obliga a mapear el repositorio real** y a corregir cualquier supuesto antes de tocar código.
3. Cada tarea trae **Criterios de aceptación** verificables (checkboxes). No marques una fase como completa hasta que **todos** estén verdes.
4. Ante cualquier conflicto entre "preservar contenido" y "mejorar diseño", **gana preservar contenido**. La pérdida de contenido es el riesgo número uno de este refactor (ver §3, *content parity*).
5. Si una decisión técnica de este plan choca con la realidad del repo, **deténte, documentá la discrepancia en el PR y proponé alternativa** antes de improvisar.

---

## 2. Restricciones duras (no negociables)

- [ ] **Cero pérdida de contenido.** Todo texto, objetivo de aprendizaje, nota crítica, reto, práctica guiada, concepto, rúbrica, enlace, video, plantilla, infografía y referencia académica debe sobrevivir. Verificado por *content parity check* (§3).
- [ ] **Cero pérdida de funcionalidad.** El diagnóstico adaptativo del Módulo 0 (con su ramificación), todos los enlaces externos (Canva, YouTube, Padlet, Google Forms, Make, shares de Gemini, plantillas y rúbricas HTML), y la navegación por secciones deben seguir funcionando.
- [ ] **Sitio 100% estático, compatible con GitHub Pages.** Sin backend, sin base de datos, sin servidor. El estado vive en `localStorage`. Si el agente propone un build step (p. ej. un generador estático), el resultado debe exportarse como estático y desplegarse en Pages sin servidor.
- [ ] **Sin frameworks pesados obligatorios.** Preferencia por *vanilla* JS/CSS. Si se introduce una librería, debe ser ligera, sin paso de compilación complejo, y justificada en el PR.
- [ ] **Preservar identidad institucional:** logos UCR / CIOdD / DIPROVID, atribución institucional, paleta y tono.
- [ ] **Preservar registro lingüístico:** español de Costa Rica, *voseo* en las instrucciones al estudiante ("completá", "ingresá", "revisá"). No "neutralizar" el español.
- [ ] **Preservar el marco ético/legal:** todas las menciones a la Ley 8968, anonimización, transparencia de contenido sintético y Human-in-the-Loop permanecen intactas y visibles.
- [ ] **No romper enlaces profundos existentes.** Las anclas actuales (`#modulo1`, `#m1-s2`, `#t1-s1`, etc.) que circulen en materiales ya distribuidos deben **redirigir** a su nueva ubicación, no devolver 404 (ver Fase 2, *legacy anchors*).
- [ ] **Accesibilidad WCAG 2.1 AA** y **mobile-first** como criterios de aceptación, no como extras.

---

## 3. Definición de "Hecho" global

Una fase está **Hecha** cuando:

- [ ] Todos los criterios de aceptación de sus tareas están verdes.
- [ ] **Content parity = 100%**: un script de verificación confirma que ningún fragmento de texto del sitio original desapareció sin justificación registrada. *Procedimiento:* en Fase 0 se extrae el texto visible del sitio actual a un archivo `baseline/contenido-original.txt` (normalizado: minúsculas, sin espacios redundantes, una frase por línea). Tras cada fase se regenera `contenido-actual.txt` y se hace `diff`. Toda línea eliminada debe estar en una *allowlist* documentada (p. ej. la rúbrica repetida 16 veces → se permite que queden 15 menos porque se consolidó en una sola).
- [ ] **Sin errores en consola** del navegador en las vistas tocadas.
- [ ] **Lighthouse** (móvil) ≥ 90 en *Accessibility* y *Best Practices*; *Performance* ≥ 80.
- [ ] **axe-core / Lighthouse a11y**: 0 violaciones críticas o serias.
- [ ] Funciona en viewport de **360 px** sin scroll horizontal ni solapamientos.
- [ ] Todos los enlaces externos resuelven (verificación automatizada de enlaces rotos).
- [ ] El sitio se despliega correctamente en GitHub Pages desde la rama de la fase (preview).
- [ ] PR con descripción, capturas antes/después y checklist de aceptación.

---

## 4. Fase 0 — Pre-vuelo: inventario, línea base y andamiaje

> **Propósito:** conocer el repo real, congelar una línea base medible y preparar el terreno. **No se modifica diseño ni contenido en esta fase.**

### 4.1 Tareas

1. **Mapear el repositorio.** Generá `docs/INVENTARIO.md` con: árbol de archivos completo; tecnología detectada (HTML plano / generador / JS existente); listado de todas las páginas HTML auxiliares (`/plantillas`, `/rubricas`, `/politicas`); listado de todas las infografías con su nombre de archivo exacto; listado exhaustivo de **todos los enlaces externos** con su URL y la sección donde aparecen.
2. **Confrontar con el Anexo A** de este documento (inventario hipotético) y marcar discrepancias.
3. **Congelar línea base de contenido.** Extraé el texto visible a `baseline/contenido-original.txt` (ver §3). Este archivo es el contrato de no-pérdida.
4. **Congelar línea base de métricas.** Corré Lighthouse y axe sobre el sitio actual (home + una lección representativa) y guardá los reportes en `baseline/`.
5. **Mapa de numeración.** Implementá como tabla de datos el mapeo del [Anexo B](#anexo-b--mapa-de-numeración-unificado) (numeración actual → propuesta). No se aplica todavía; se deja lista para Fase 1/2.
6. **Andamiaje de ramas y despliegue de preview.** Configurá una rama por fase y un despliegue de preview (Pages desde rama, o Netlify/preview). Ver §12.

### 4.2 Criterios de aceptación

- [ ] `docs/INVENTARIO.md` existe, es completo y sus discrepancias con el Anexo A están anotadas.
- [ ] `baseline/contenido-original.txt` y los reportes Lighthouse/axe base están versionados.
- [ ] El despliegue de preview funciona.
- [ ] **El sitio en producción no cambió** (esta fase es no destructiva).

---

## 5. Decisión de arquitectura y stack

### 5.1 De "curso-documento" a "curso-entorno"

El sitio actual es una **página única de scroll infinito** (todo el currículo concatenado por anclas). El destino es una **arquitectura de tres niveles**, con **una sola lección visible a la vez**:

```
Nivel 1 — Panel del estudiante (home)
          progreso global · botón "Continuar" · ruta personalizada · acceso al diagnóstico
   └─ Nivel 2 — Vista de módulo
              lista de semanas con estado (bloqueada/disponible/en curso/completada)
         └─ Nivel 3 — Lección (una semana)
                    encabezado + ciclo RHEC + rúbrica colapsable + "completar" + ‹anterior/siguiente›
```

### 5.2 Stack recomendado (sin build obligatorio)

- **Contenido como datos.** Todo el currículo se extrae de los HTML a un **modelo de datos** (§6). El contenido deja de estar incrustado en marcado y pasa a ser una fuente única de verdad. Esto habilita, de un solo golpe: plantilla canónica única, rúbrica única, las tres sendas, el progreso y el enrutamiento.
- **Renderizado:** *vanilla* JS que toma los datos y renderiza una lección por vez en un *app shell* (`index.html` con `<header>`, `<nav>`, `<main id="vista">`, `<footer>`).
- **Enrutamiento:** *hash routing* (`#/inicio`, `#/modulo/1`, `#/leccion/m1-s2`). El hash routing es **directamente compatible con GitHub Pages** sin configuración (no produce 404 al recargar). *Opcional:* URLs limpias con History API + truco `404.html`, solo si el agente garantiza que el deep-linking sigue funcionando en Pages.
- **Estado:** `localStorage` con esquema versionado (§7). Sin cuentas ni servidor.
- **Estilos:** CSS propio con *custom properties* (tokens de marca UCR), *mobile-first*, sin framework de UI obligatorio.

> Si el agente considera más mantenible un generador estático ligero (p. ej. Astro/11ty), puede proponerlo en un PR aparte **siempre que**: (a) el output sea estático puro desplegable en Pages; (b) el deep-linking y el `localStorage` sigan funcionando; (c) no añada complejidad de mantenimiento para un equipo de investigación. Por defecto, **vanilla**.

### 5.3 Estructura de directorios objetivo

```
/
├── index.html                  # app shell (header, nav, <main>, footer)
├── 404.html                    # opcional, fallback de URLs limpias y legacy anchors
├── assets/
│   ├── css/                    # tokens.css, base.css, componentes.css, responsive.css
│   └── js/
│       ├── app.js              # router + render de vistas
│       ├── estado.js           # API de localStorage (§7)
│       ├── glosario.js         # tooltips de términos
│       ├── progreso.js         # barras, "continuar", marcado de completado
│       └── sendas.js           # lógica de las tres sendas + test-out
├── contenido/
│   ├── curriculum.json         # o /contenido/lecciones/*.json (una por lección)
│   ├── glosario.json           # término → definición breve
│   └── rubrica-semanal.json    # rúbrica canónica única
├── infografias/                # PNG existentes (renombrados sin espacios) + transcripciones
├── plantillas/                 # plantillas HTML existentes, re-estilizadas
├── rubricas/                   # rúbricas completas existentes (enlazadas, no duplicadas)
├── politicas/                  # protocolo de privacidad, etc.
├── logos/
├── baseline/                   # líneas base de Fase 0
└── docs/                       # INVENTARIO.md, CHANGELOG.md, decisiones de arquitectura
```

---

## 6. Modelo de contenido (contrato de datos)

Cada lección (semana) se representa con esta forma. **Este es el contrato que desacopla contenido de presentación.** El agente debe extraer el contenido actual a esta estructura *sin reescribir el texto* (copiar literal).

```jsonc
{
  "id": "m1-s2",                       // identificador estable
  "modulo": "I",                       // "0" | "T1" | "I" | "II" | "III"
  "moduloTitulo": "Diagnóstico con IA",
  "semanaGlobal": 2,                   // numeración unificada (Anexo B)
  "etiqueta": "Semana 2",              // etiqueta visible
  "titulo": "Ingeniería de Prompts (CIFRCE)",
  "tiempoEstimadoMin": 120,            // NUEVO (cierra H13); estimar por densidad de tareas
  "objetivo": "…texto literal del objetivo de aprendizaje…",
  "notaCritica": {
    "titulo": "Salida verificable recomendada",
    "texto": "…texto literal…"
  },
  "infografia": {
    "src": "infografias/s02-prompt-engineering.png",  // renombrado sin espacios
    "alt": "Descripción significativa para lector de pantalla",
    "transcripcion": "…texto contenido en la infografía, liberado a HTML (cierra H10)…"
  },
  "checklist": [ "…ítems si la semana los tiene…" ],
  "rhec": {
    "reto":     { "html": "…literal…", "entregable": "…literal…" },
    "hacer":    { "html": "…literal, incluye pasos numerados…" },
    "entender": { "html": "…literal, incluye conceptos clave…" },
    "compartir":{ "padletUrl": "https://padlet.com/…", "consigna": "…literal…" }
  },
  "recursos": [
    { "titulo": "Recurso: Prompting", "url": "https://…", "tipo": "video" },
    { "titulo": "Plantilla FODA", "url": "plantillas/…html", "tipo": "plantilla" }
  ],
  "rubricaRef": "semanal",             // referencia a la rúbrica canónica única
  "prerequisito": "m1-s1",             // para estado bloqueada/disponible
  "sendas": ["guiada", "acelerada", "profunda"]  // en qué recorridos aparece
}
```

Notas de extracción:

- **Copiá el texto literal.** No parafrasees ni resumas. El *content parity check* lo exige.
- El **Módulo 0 (diagnóstico)** es un caso especial: modelá sus 3 preguntas, la **ramificación de la pregunta 2** (varía según madurez) y la lógica que mapea respuestas → ruta recomendada. Conservá su comportamiento exacto.
- La **rúbrica semanal** se extrae **una sola vez** a `rubrica-semanal.json` (cierra H6). Cada lección la referencia; no se incrusta 16 veces.

---

## 7. Esquema de estado (localStorage)

Clave única, versionada, para permitir migraciones futuras sin perder progreso.

```jsonc
// localStorage["cajaIA.estado.v1"]
{
  "schemaVersion": 1,
  "perfil": null,                 // "guiada" | "acelerada" | "profunda" | null
  "diagnostico": {
    "madurez": null,              // respuesta P1
    "urgencia": null,             // respuesta P2 (rama según madurez)
    "adopcionIA": null,           // respuesta P3
    "rutaRecomendada": null,      // "toolkit" | "modulo-1" | …
    "fecha": null
  },
  "progreso": {
    "m1-s1": { "estado": "completada", "completadaEn": "2026-06-20T10:00:00Z", "entregableUrl": "" },
    "m1-s2": { "estado": "en-curso",   "completadaEn": null, "entregableUrl": "" }
    // estado ∈ "bloqueada" | "disponible" | "en-curso" | "completada"
  },
  "competencias": {               // test-out (cierra H9)
    "cuentas-2fa": false,
    "no-code-basico": false
  },
  "ultimaLeccion": "m1-s2",       // alimenta el botón "Continuar" (cierra H2)
  "insignias": []                 // módulos completados (cierra parte de H14)
}
```

**API mínima en `estado.js`** (el agente define la implementación):

- `cargarEstado()` / `guardarEstado(parcial)` — lectura/merge/persistencia.
- `marcarCompletada(idLeccion)` — actualiza estado, desbloquea la siguiente, recalcula barras.
- `proximaLeccionPendiente()` — devuelve el id para el botón "Continuar".
- `progresoModulo(modulo)` / `progresoGlobal()` — porcentajes para las barras.
- `aplicarDiagnostico(respuestas)` — calcula y persiste perfil + ruta.
- `exportarEstado()` / `importarEstado(json)` — respaldo manual del estudiante (mitiga la limitación de que `localStorage` es por navegador/dispositivo).

**Reglas:**

- [ ] Toda escritura es defensiva (try/catch; el sitio **funciona aunque `localStorage` esté deshabilitado**, solo sin persistencia).
- [ ] Migración: si aparece `schemaVersion` mayor en el futuro, se migra; nunca se borra progreso silenciosamente.

---

## 8. Fase 1 (Ola 1) — Quick wins sobre el sitio actual

> **Propósito:** entregar el mayor descenso de "pérdida del estudiante" con el menor esfuerzo, **sin reescribir aún la arquitectura**. Se puede implementar como mejora progresiva sobre el `index.html` existente. Compra tiempo y demuestra valor antes del refactor mayor de Fase 2.
> **Rama:** `fase-1-quick-wins`.

### 8.1 Tarea — Estado y progreso (cierra H2, H13)

**Archivos:** `assets/js/estado.js`, `assets/js/progreso.js`, retoques en `index.html`.

1. Implementá `estado.js` con el esquema §7 (versión mínima: progreso + `ultimaLeccion`).
2. Insertá un control **"Marcar como completada"** al final de cada sección de semana del `index.html` actual.
3. Insertá un botón **"Continuar donde quedé"** fijo en el encabezado, que haga scroll/enlace a `ultimaLeccion`.
4. Insertá **barras de progreso** por módulo y global, visibles y persistentes.
5. Añadí **tiempo estimado** en el encabezado de cada semana (campo `tiempoEstimadoMin`).

**Criterios de aceptación:**
- [ ] Al marcar una semana y recargar, el estado persiste.
- [ ] "Continuar" lleva a la última semana en curso en ≤ 1 clic.
- [ ] Las barras reflejan el avance real y se actualizan al instante.
- [ ] Cada semana muestra una estimación de tiempo.
- [ ] Funciona con `localStorage` deshabilitado (sin persistencia, sin errores).

### 8.2 Tarea — Rúbrica única + RHEC colapsable (cierra H6, mitiga H1)

1. Extraé la rúbrica semanal a `rubrica-semanal.json` y reemplazá las 16 copias incrustadas por un **panel colapsable "Ver rúbrica del entregable"** que renderiza la única fuente.
2. Convertí el bloque RHEC de cada semana en **acordeón o pestañas** (Reto → Hacer → Entender → Compartir), con una fase abierta a la vez. Reduce la pared de texto sin ocultar nada (todo accesible con un clic/teclado).

**Criterios de aceptación:**
- [ ] Existe **una** definición de rúbrica; las semanas la referencian.
- [ ] *Content parity*: el texto de la rúbrica sigue presente (allowlist documenta las 15 copias retiradas).
- [ ] El acordeón RHEC es operable por teclado y lector de pantalla (`aria-expanded`, foco correcto).

### 8.3 Tarea — Numeración unificada + glosario emergente (cierra H5, H7)

1. Aplicá el mapa de numeración del [Anexo B]: una sola línea temporal legible (el contador "Semana N" no se reinicia).
2. Implementá `glosario.js`: cada término técnico (LLM, 2FA, no-code, trigger, router, API, few-shot, webhook, CRM, ROI…) en su primera aparición abre una **definición breve** al pasar el cursor o tocar, sin abandonar la página. Fuente: `glosario.json`.

**Criterios de aceptación:**
- [ ] No coexisten dos esquemas de numeración; el Toolkit queda etiquetado de forma coherente (p. ej. "Semanas 0.1–0.4").
- [ ] Los términos del glosario son accesibles por teclado y anunciados por lector de pantalla.
- [ ] El glosario no rompe la lectura ni desplaza el layout (sin *layout shift*).

### 8.4 Definición de Hecho de la Fase 1
- [ ] §3 completo. El sitio sigue siendo la página actual, pero ahora **recuerda, orienta y pesa menos**.

---

## 9. Fase 2 (Ola 2) — Refactor arquitectónico a tres niveles

> **Propósito:** descomponer la página única en panel → módulo → lección. Es la intervención estructural mayor.
> **Rama:** `fase-2-arquitectura`.
> **Pre-requisito:** Fase 1 mergeada y el modelo de contenido (§6) poblado.

### 9.1 Tarea — Extracción de contenido al modelo de datos (§6)

1. Migrá **todo** el contenido del `index.html` actual a `contenido/` según §6, **texto literal**.
2. Corré el *content parity check*: el texto extraído debe coincidir 1:1 con `baseline/contenido-original.txt` (salvo allowlist).

**Criterios de aceptación:**
- [ ] *Content parity = 100%*.
- [ ] El currículo completo es navegable desde los datos, no desde marcado incrustado.

### 9.2 Tarea — App shell + router + tres vistas

1. Reconstruí `index.html` como *app shell*. Implementá `app.js` con hash routing: `#/inicio`, `#/modulo/:id`, `#/leccion/:id`.
2. **Vista Panel (Nivel 1):** progreso global, "Continuar", ruta personalizada, acceso al diagnóstico. **Una sola decisión dominante** en pantalla.
3. **Vista Módulo (Nivel 2):** semanas con estado (bloqueada/disponible/en curso/completada), objetivo y entregable de cada una, progreso del módulo.
4. **Vista Lección (Nivel 3):** una semana a pantalla completa con plantilla canónica única (encabezado → RHEC → rúbrica colapsable → "completar" → ‹anterior/siguiente›). **Scroll acotado a una semana.**
5. **Breadcrumb** en todas las vistas (Inicio › Módulo II › Semana 6).

**Criterios de aceptación:**
- [ ] Solo una lección visible a la vez (cierra H1).
- [ ] El deep-linking funciona: `#/leccion/m2-s6` abre directo y recargar no rompe (Pages OK).
- [ ] Anterior/Siguiente y breadcrumb operables por teclado.

### 9.3 Tarea — Legacy anchors (no romper enlaces ya distribuidos)

1. Implementá redirección de las anclas antiguas (`#modulo1`, `#m1-s2`, `#t1-s1`, …) a las nuevas rutas, vía mapa en `app.js` y/o `404.html`.

**Criterios de aceptación:**
- [ ] Toda ancla histórica conocida resuelve a su lección nueva (0 enlaces a 404).

### 9.4 Tarea — Diagnóstico persistente que configura el panel (cierra H8)

1. Conservá el cuestionario de 3 preguntas (incluida la ramificación de P2) y su lógica de ruta.
2. Guardá el resultado en estado y **traducilo a una experiencia**: el panel resalta el punto de partida, atenúa lo no recomendado y propone la primera acción concreta. Recordado en cada visita.

**Criterios de aceptación:**
- [ ] Tras el diagnóstico, el panel queda configurado y lo sigue estando al volver.
- [ ] El comportamiento de ramificación es idéntico al original.

### 9.5 Tarea — Biblioteca interna + migajas de retorno (cierra H3)

1. Creá una **Biblioteca** interna (vista propia) que indexe todos los recursos (videos, plantillas, rúbricas, herramientas) por módulo y semana.
2. Los enlaces externos abren en pestaña nueva y, donde aplique, con **migaja de retorno** clara ("‹ Volver a la Semana 5").
3. Re-estilizá `plantillas/` y `rubricas/` bajo el mismo patrón visual del sitio.

**Criterios de aceptación:**
- [ ] Todos los recursos externos están catalogados y accesibles desde la Biblioteca.
- [ ] El estudiante nunca queda "varado" fuera del sitio sin vía de retorno.

### 9.6 Tarea — Liberar texto de infografías + tablas responsivas (cierra H10, H11)

1. Renombrá las infografías **sin espacios** y actualizá referencias.
2. Acompañá cada infografía con su **transcripción en HTML** (campo `transcripcion`) y `alt` significativo.
3. Convertí las tablas de 4–5 columnas en **tarjetas apiladas** en viewports pequeños.

**Criterios de aceptación:**
- [ ] El contenido de cada infografía es buscable, accesible y legible en móvil.
- [ ] Ninguna tabla produce scroll horizontal a 360 px.

### 9.7 Definición de Hecho de la Fase 2
- [ ] §3 completo. El sitio es ahora un **entorno de tres niveles** con una lección a la vez, deep-linking, diagnóstico personalizado y biblioteca, sin perder nada.

---

## 10. Fase 3 (Ola 3) — Diferenciación por perfil y cierre motivacional

> **Propósito:** servir a los tres perfiles de estudiante sobre un mismo cuerpo de contenido y cerrar el bucle motivacional.
> **Rama:** `fase-3-sendas-credencial`.

### 10.1 Tarea — Tres sendas + test-out (cierra H9, parte de H4)

Implementá `sendas.js`. Una misma base de contenido, tres recorridos sugeridos (**no muros**: el curso completo sigue disponible):

| Senda | Perfil objetivo | Qué cambia respecto del recorrido lineal |
|---|---|---|
| **Guiada** | Rol 1 — cero tech/IA | Glosario más presente; peldaños intermedios antes del Módulo II; "siguiente paso" único siempre visible; encabezados en lenguaje más llano. |
| **Acelerada** | Rol 2 — tech sí, IA no | Operativa básica (cuentas, 2FA) en checklists colapsables marcables; conceptos de IA en primer plano; **test-out** para declarar competencias ya adquiridas. |
| **Profunda** | Rol 3 — tech + algo de IA | Acceso directo a Módulos II–III; capa teórica avanzada (Kolb–Bloom–Kapur, sandboxes regulatorios) como contenido de primera clase; retos de extensión. |

**Criterios de aceptación:**
- [ ] El diagnóstico asigna una senda por defecto, pero el estudiante puede cambiarla en cualquier momento.
- [ ] El *test-out* permite marcar competencias y omitir lo ya dominado **sin bloquear** el acceso a ese material si se desea repasar.
- [ ] Ninguna senda oculta contenido de forma irreversible.

### 10.2 Tarea — Peldaños intermedios antes del Módulo II (cierra H4)

1. Insertá uno o más pasos puente entre la Semana 1 (primera conversación) y la Semana 5 (Make con manejo de errores): p. ej. una automatización de **un solo paso**, plenamente guiada, con captura esperada en cada clic. Marcalos como contenido nuevo en el `CHANGELOG`.

**Criterios de aceptación:**
- [ ] Existe una rampa de dificultad sin saltos abruptos hacia el Módulo II.
- [ ] El contenido nuevo se añade; **nada del existente se elimina**.

### 10.3 Tarea — Bucle evidencia → portafolio → credencial (cierra H14)

1. Cada lección permite anotar el **enlace al entregable** (campo `entregableUrl`).
2. Una vista **Portafolio** reúne las evidencias del estudiante.
3. Hacé visible el circuito evidencia → autoevaluación con rúbrica → registro → credencial, para que el menú "Credenciales" tenga un camino tangible.
4. **Micro-reconocimientos** (insignia/hito en el panel) por módulo completado.

**Criterios de aceptación:**
- [ ] El estudiante puede registrar y revisar sus evidencias dentro del sitio.
- [ ] Cada módulo completado produce un reconocimiento visible.

### 10.4 Tarea — Compartir estructurado + metadatos (cierra H12, H15)

1. Estructurá la actividad "Compartir" por semana (no un único muro indiferenciado), conservando el Padlet o segmentándolo.
2. Corregí la inconsistencia de metadatos: `canonical` y `og:url` deben apuntar a la URL real (`cajadeherramientasparaemprendedores`).

**Criterios de aceptación:**
- [ ] Las contribuciones de "Compartir" quedan organizables por semana.
- [ ] `canonical`/Open Graph apuntan a la URL correcta; las tarjetas de compartir resuelven bien.

### 10.5 Definición de Hecho de la Fase 3
- [ ] §3 completo. El sitio sirve a los tres perfiles y cierra el bucle de motivación y credencial.

---

## 11. Qué NO tocar (preservación)

Estos activos son la razón del rediseño y **no se alteran en su sustancia**:

- **Ciclo RHEC** (Reto–Hacer–Entender–Compartir) y su fundamento Kolb–Bloom–Kapur.
- **Modelo CIFRCE** y su introducción gradual (C+I primero; F, R, CE después).
- **Principio Human-in-the-Loop** y su anclaje a la Ley 8968.
- **Regla 70/30** y la lógica "primero el proceso, después la IA".
- **Rúbrica analítica** de cuatro criterios y **matriz de alineación pedagógica** (se consolidan, no se eliminan).
- **Énfasis en privacidad, anonimización y transparencia** de contenido sintético.
- **Identidad institucional** (logos, atribución, paleta) y **registro voseante**.
- **Todos los enlaces externos y recursos** (videos, plantillas, rúbricas, formularios).

> El rediseño reduce **carga extrínseca** (la que impone el diseño) para liberar capacidad hacia la **carga intrínseca** (aprender IA). Menos fricción de navegación = más profundidad de aprendizaje. Rigor y sencillez no compiten.

---

## 12. Convenciones de trabajo del agente

- **Una rama por fase** (`fase-0-prevuelo`, `fase-1-quick-wins`, `fase-2-arquitectura`, `fase-3-sendas-credencial`). **Un PR por fase.**
- **Commits convencionales** (`feat:`, `refactor:`, `fix:`, `docs:`, `a11y:`, `perf:`).
- **El sitio debe quedar desplegable y verde tras cada merge.** Nada de dejar `main` roto.
- **No reescribir contenido.** Cuando una tarea exige mover texto, se **copia literal**; cualquier cambio de redacción se propone aparte y se aprueba antes.
- **`docs/CHANGELOG.md`** por fase: qué se añadió, qué se movió, qué se consolidó, qué se permitió retirar (con su entrada en la allowlist de parity).
- **Decisiones de arquitectura** registradas en `docs/` (formato ADR breve).
- **Sin force-push** a ramas compartidas.
- **Preview deploy por rama** y captura antes/después en cada PR.
- Ante discrepancia entre este plan y el repo real: **documentar y consultar**, no improvisar.

---

## 13. Matriz de pruebas de aceptación

Pruebas mínimas a verificar por fase (manual + automatizado donde sea posible). Cada fila mapea a uno o más hallazgos de auditoría.

| # | Prueba (recorrido del estudiante) | Resultado esperado | Cierra | Fase |
|---|---|---|---|---|
| T1 | Marcar una semana como completada y recargar | El estado persiste; la barra avanza | H2 | 1 |
| T2 | Cerrar el navegador y pulsar "Continuar" | Abre la última lección en curso en ≤ 1 clic | H2 | 1 |
| T3 | Abrir una lección y revisar la rúbrica | La rúbrica aparece desde una única fuente | H6 | 1 |
| T4 | Recorrer una semana con lector de pantalla | RHEC y glosario anunciados correctamente | H7 | 1 |
| T5 | Leer el contador de semanas de inicio a fin | Numeración monótona, sin reinicios | H5 | 1/2 |
| T6 | Cargar `#/leccion/m2-s6` y recargar | Abre directo; no 404 | H1 | 2 |
| T7 | Abrir un ancla antigua (`#m1-s2`) | Redirige a la lección nueva | — | 2 |
| T8 | Completar el diagnóstico y volver al día siguiente | El panel sigue configurado con la ruta | H8 | 2 |
| T9 | Abrir una plantilla externa y volver | Migaja de retorno lleva a la lección | H3 | 2 |
| T10 | Ver una lección con infografía en móvil (360 px) | Texto de la infografía legible/buscable; sin scroll horizontal | H10, H11 | 2 |
| T11 | Como Rol 2, activar test-out de "cuentas/2FA" | Esos pasos se marcan como hechos sin bloquear repaso | H9 | 3 |
| T12 | Como Rol 1, transitar Semana 1 → Módulo II | Hay peldaños intermedios; sin salto abrupto | H4 | 3 |
| T13 | Registrar un entregable y abrir el Portafolio | La evidencia queda listada | H14 | 3 |
| T14 | Completar un módulo | Aparece reconocimiento visible | H14 | 3 |
| T15 | Compartir la URL en redes | `canonical`/OG correctos; tarjeta bien | H15 | 3 |
| T-P | *Content parity* tras cada fase | 100% (salvo allowlist) | todos | 0–3 |

> **Validación con usuarios (posterior al desarrollo):** antes de dar por bueno el rediseño, ejecutar prueba de usabilidad con **3 participantes por perfil** (9 en total) sobre tareas T1–T12, midiendo tasa de éxito, tiempo, "pérdidas" verbalizadas y **SUS ≥ 75** en los tres perfiles. (Protocolo completo en el Anexo B de la auditoría v1.0.)

---

## 14. Anexos

### Anexo A — Inventario hipotético del repositorio (verificar en Fase 0)

> Inferido del sitio renderizado. **El agente debe confirmarlo o corregirlo** contra el repo real.

- **Página principal:** `index.html` (página única, navegación por anclas).
- **Secciones de contenido:** Inicio · Cómo usar el curso · Objetivos · Metodología (CIFRCE / RHEC / HITL / 70/30) · Ruta de aprendizaje · Matriz de alineación · Módulo 0 (diagnóstico) · Toolkit 1 (T1-S1…T1-S4) · Módulo I (Semanas 1–4) · Módulo II (Semanas 5–8) · Módulo III (Semanas 9–12) · Credenciales · Biblioteca de Recursos.
- **`/logos/`** — `ucr.png`, `ciodd.png`, `diprovid.png`.
- **`/Infografias/`** — PNG por semana, **con espacios en los nombres** (p. ej. `Semana 1. Historia de la IA.png`). *Renombrar sin espacios.*
- **`/templates/`** (o `/plantillas/`) — buyer persona, business model canvas, FODA, IVU, CRM básico, consentimiento de clientes, prefactibilidad.
- **`/rubricas/`** — toolkit-preoperativo, módulo-diagnóstico, módulo-automatización, módulo-comercialización.
- **`/politicas/`** — protocolo de privacidad y anonimización.
- **Enlaces externos a catalogar:** Canva (retos semanales), playlists de YouTube y videos sueltos, Padlet (muro de "Compartir"), Google Forms (autodiagnóstico institucional), Make.com, shares de Gemini, Google Trends, Exploding Topics, Eleven Labs, CapCut, etc.
- **Bug conocido (H15):** `canonical`/`og:url` apuntan a `cajaherramientaspymes`, pero la URL real es `cajadeherramientasparaemprendedores`.

### Anexo B — Mapa de numeración unificado

| Numeración actual | Numeración propuesta | Etiqueta visible sugerida |
|---|---|---|
| Módulo 0: Diagnóstico | Paso 0 | "Empezá aquí: encontrá tu ruta" |
| Toolkit 1 · T1-S1…T1-S4 | Semanas 0.1 – 0.4 | "Pre-operativo (opcional según ruta)" |
| Módulo I · Semana 1…4 | Semanas 1 – 4 | "Diagnóstico con IA" |
| Módulo II · Semana 5…8 | Semanas 5 – 8 | "Automatización" |
| Módulo III · Semana 9…12 | Semanas 9 – 12 | "Comercialización" |

### Anexo C — Resumen de hallazgos → fase que los resuelve

| Hallazgo | Descripción corta | Severidad | Fase |
|---|---|---|---|
| H1 | Página única monolítica | 4 | 1 (mitiga) / 2 (resuelve) |
| H2 | Sin estado ni progreso | 4 | 1 |
| H3 | Fragmentación a +30 recursos externos | 4 | 2 |
| H4 | Curva de dificultad discontinua (Módulo II) | 4 | 3 |
| H5 | Doble esquema de numeración | 3 | 1 |
| H6 | Rúbrica repetida ~16 veces | 3 | 1 |
| H7 | Vocabulario sin glosario | 3 | 1 |
| H8 | Diagnóstico sin persistencia | 3 | 2 |
| H9 | Sin rutas por perfil ni test-out | 3 | 3 |
| H10 | Texto encerrado en infografías PNG | 3 | 2 |
| H11 | Tablas no responsivas | 3 | 2 |
| H12 | Padlet único para 16 actividades | 2 | 3 |
| H13 | Sin estimación de tiempo por semana | 2 | 1 |
| H14 | Credencial sin bucle de evidencia | 2 | 3 |
| H15 | Inconsistencia de metadatos canonical | 1 | 3 |

---

*Fin del plan de implementación. v1.0 — preparado para ejecución por Antigravity. Acompaña a la Auditoría de usabilidad y arquitectura de información v1.0.*
