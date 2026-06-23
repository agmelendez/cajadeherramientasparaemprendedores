# Plan de implementación v2.2 — Rediseño integral del repositorio bajo GitHub Pages
## Caja de Herramientas de IA para Emprendedores y MiPYMES
### CIOdD – DIPROVID · UCR · Proyecto AUGE

> **Documento dirigido a:** Antigravity, agente de desarrollo.
>
> **Versión:** 2.2 · Ajuste GitHub Pages + autodiagnóstico ampliado y algoritmo de clasificación · Junio 2026.
>
> **Insumos de referencia:**
> 1. Auditoría UX · Caja de Herramientas de IA para la MiPYME.
> 2. Especificaciones de diseño y desarrollo · Plataforma Web con Experiencia de Aprendizaje Modular.
> 3. Plan de implementación v1.0 para Antigravity.
>
> **Objetivo operativo:** refactorizar el sitio desde una página-documento de scroll extenso hacia una plataforma estática de aprendizaje modular, progresiva, trazable, accesible y compatible con GitHub Pages, preservando el contenido sustantivo, las funcionalidades existentes y el rigor pedagógico.
>
> **Decisión central de esta versión 2.2:** adoptar una arquitectura de **cuatro niveles de experiencia**: `Inicio → Módulo → Semana → Unidad de contenido`, estrictamente compatible con GitHub Pages, y sustituir el filtro débil de tres preguntas por un **autodiagnóstico ampliado de al menos 15 preguntas**, con algoritmo de clasificación client-side, puntajes por dimensión y recomendación trazable de módulos, ruta y senda de acompañamiento. La auditoría proponía resolver el problema de orientación mediante una estructura panel–módulo–lección; las especificaciones técnicas bajan un nivel adicional y exigen que la persona vea **una sola unidad de contenido por pantalla**. Esta versión integra ambos enfoques y convierte el diagnóstico en una funcionalidad condicionante del sistema.

---

## 0. Instrucción ejecutiva para Antigravity

La prioridad no es “embellecer” el sitio. La prioridad es **cambiar la experiencia de aprendizaje** sin perder contenido.

La persona usuaria no debe volver a enfrentar todo el curso en una sola pantalla. Al terminar este refactor, la plataforma debe permitirle:

1. Entrar y ver tarjetas de módulos, no una pared de texto.
2. Saber dónde está, qué sigue y cuánto ha avanzado.
3. Completar una unidad pequeña por vez.
4. Guardar avance localmente.
5. Retomar donde quedó.
6. Ver una ruta recomendada según diagnóstico.
7. Consultar recursos sin perderse fuera del sitio.
8. Registrar evidencia mediante enlaces, notas o almacenamiento local, sin prometer carga real a servidor en la versión estática.
9. Usar el sitio correctamente en teléfono móvil.
10. Navegar con teclado y lector de pantalla.

**No se debe eliminar contenido. No se debe reescribir el fondo pedagógico. No se debe romper GitHub Pages.**

**Cambio crítico v2.2:** el autodiagnóstico deja de ser un formulario breve de orientación general. Debe convertirse en un mecanismo de clasificación funcional. El resultado del diagnóstico condiciona la pantalla de inicio, la ruta recomendada, el módulo sugerido para iniciar, la senda de acompañamiento, las ayudas visibles, los test-out y los mensajes de nivelación. Todo esto debe funcionar localmente, sin backend, mediante JSON estático + JavaScript + `localStorage`.

---

## 1. Cambios principales respecto al plan v1.0

| Área | Plan v1.0 | Ajuste v2.0 |
|---|---|---|
| Arquitectura | Tres niveles: panel → módulo → lección | Cuatro niveles: inicio → módulo → semana → unidad de contenido |
| Unidad visible | Una semana/lección visible | Una unidad visible: introducción, entender, video, reto, hacer, compartir o rúbrica |
| Progreso | Por lección/módulo/global | Por unidad, semana, módulo y programa completo |
| Estado | `localStorage` por lección | `localStorage` versionado con progreso por unidad y semana |
| Evidencia | Campo de entregable URL | URL + notas + opción local; sin prometer carga real a servidor en V1 |
| Lenguaje | Preservar voseo | Interfaz institucional en “usted” o forma impersonal; contenido sustantivo solo se modifica con mapa aprobado |
| Módulos | Módulo 0 + Toolkit + Módulos I–III | Módulos 0–4 con nombres institucionales y frases amigables |
| Diagnóstico | Tres preguntas y ruta | Autodiagnóstico ampliado, mínimo 15 preguntas, dimensiones ponderadas y algoritmo de clasificación trazable |
| Asistente IA | No desarrollado | Mantener asistente, desactivarlo durante autodiagnóstico y contextualizarlo en Reto/Hacer |
| Administración | No aplica | En V1, configuración por JSON; panel admin real queda para V2 con backend |
| Backend | No backend | Se explicita una V1 estática y una V2 futura con usuarios, base de datos y cargas reales |

---

## 2. Restricciones duras y jerarquía de decisiones

### 2.1 No negociables

- [ ] **Cero pérdida de contenido sustantivo.** Deben preservarse objetivos, instrucciones, prácticas, retos, conceptos, notas críticas, rúbricas, referencias, infografías, enlaces, videos y plantillas.
- [ ] **Cero pérdida de funcionalidad existente.** El diagnóstico, enlaces externos, plantillas, rúbricas, Padlet, formularios, herramientas externas y navegación histórica deben seguir funcionando.
- [ ] **Filtro diagnóstico robusto.** El Módulo 0 debe pasar de tres preguntas generales a un instrumento mínimo de 15 preguntas, con dimensiones, puntajes, reglas de decisión, justificación visible y persistencia local. Esta mejora condiciona la funcionalidad de recomendación del sistema.
- [ ] **Sitio estático en V1.** La primera versión debe funcionar en GitHub Pages sin servidor, sin base de datos, sin login obligatorio y sin dependencia de servicios de pago.
- [ ] **Progreso persistente local.** El avance se guarda en `localStorage`; opcionalmente se puede usar `IndexedDB` solo para datos locales más pesados, nunca como promesa de sincronización institucional.
- [ ] **Accesibilidad WCAG 2.1 AA.** Debe ser criterio de aceptación, no recomendación estética.
- [ ] **Mobile-first.** Debe funcionar desde 360 px sin scroll horizontal.
- [ ] **No romper enlaces históricos.** Las anclas antiguas deben redirigir a la nueva ruta.
- [ ] **Preservar identidad UCR / CIOdD / DIPROVID.** Mantener logos, atribución institucional y paleta visual base.
- [ ] **Preservar el marco ético.** Ley 8968, anonimización, Human-in-the-Loop, transparencia de contenido sintético y regla 70/30 deben seguir visibles.

### 2.2 Regla de resolución de conflictos

Cuando haya conflicto entre documentos, aplicar esta jerarquía:

1. **No perder contenido ni funcionalidad.**
2. **Mantener compatibilidad con GitHub Pages en V1.**
3. **Garantizar que el algoritmo de clasificación recomiende rutas de forma trazable y no arbitraria.**
4. **Adoptar la arquitectura de cuatro niveles de las especificaciones.**
5. **Preservar la profundidad pedagógica de la auditoría.**
6. **Convertir necesidades de backend en backlog V2, no simularlas como si ya existieran.**

### 2.3 Corrección importante sobre lenguaje

El plan v1.0 pedía preservar el voseo. El documento de especificaciones pide migrar la interfaz a **segunda persona formal o tercera persona impersonal**. Por tanto:

- La **microcopia de interfaz** debe usar “usted” o forma impersonal: “Iniciar”, “Continuar”, “Guardar y continuar”, “Declarar semana completada”.
- Las instrucciones operativas deben evitar “vos / hacés / tenés”.
- Los textos pedagógicos extensos no se deben reescribir masivamente sin una tabla de cambios aprobada.
- Todo cambio lingüístico debe quedar registrado en `docs/CAMBIOS_DE_LENGUAJE.md`.

### 2.4 Condición técnica superior: GitHub Pages como plataforma de ejecución

Este repositorio se publica bajo GitHub Pages. Por tanto, Antigravity debe tratar el proyecto como una **aplicación estática del lado del cliente**, no como una plataforma con servidor. Esta condición manda sobre cualquier especificación que sugiera base de datos, carga real de archivos, autenticación o panel administrativo dinámico.

Reglas obligatorias:

- [ ] **No usar backend.** No PHP, Python, Ruby, Node server, Express, bases de datos, sesiones de servidor ni endpoints propios.
- [ ] **No usar rutas limpias dependientes del servidor.** La navegación principal debe usar `hash routing` (`#/modulo/1`, `#/semana/m1-s1`, `#/unidad/m1-s1/u03`) o páginas HTML físicas. La opción recomendada para este repo es `hash routing`.
- [ ] **No depender de reescrituras de servidor.** GitHub Pages no permite configurar reglas tipo Apache/Nginx para enviar cualquier ruta a `index.html`.
- [ ] **Usar rutas relativas.** No usar `/assets/...` ni `/contenido/...` como rutas absolutas, porque el sitio puede estar publicado como proyecto en `https://usuario.github.io/nombre-repositorio/`. Usar `./assets/...`, `assets/...` o un `BASE_PATH` calculado.
- [ ] **Mantener `index.html` en la raíz de publicación.** Si la fuente de Pages es `/docs`, el `index.html` debe estar en `/docs`; si es raíz, debe estar en raíz; si se usa GitHub Actions, el artefacto publicado debe incluir `index.html` en la raíz del artefacto.
- [ ] **Agregar `.nojekyll` si no se usa Jekyll.** Esto evita procesamiento no deseado y reduce problemas con carpetas o archivos que GitHub Pages/Jekyll podría ignorar.
- [ ] **No exponer claves.** Todo JavaScript del sitio es público; no incluir API keys, tokens, credenciales, endpoints privados ni secretos institucionales.
- [ ] **No prometer sincronización multidispositivo.** `localStorage` e `IndexedDB` son locales al navegador/dispositivo.
- [ ] **No implementar carga real de archivos en V1.** Se permite registrar URL, notas, metadatos del archivo o guardar información local; no se puede subir evidencia al repositorio ni a un servidor propio desde GitHub Pages.
- [ ] **No asumir que el sitio puede escribir en GitHub.** Cualquier cambio al repositorio requiere commit/PR; la persona usuaria no puede guardar evidencias en el repo desde el navegador sin un servicio externo autenticado, lo cual queda fuera de V1.
- [ ] **Controlar peso y límites.** Mantener assets optimizados, evitar videos pesados alojados en el repo, comprimir imágenes y referenciar multimedia externa cuando aplique.

Decisión operativa: **V1 = SPA estática con hash routing + datos JSON + localStorage + recursos externos controlados.** Todo lo demás pasa a backlog V2.

---

## 3. Definición global de “Hecho”

Una fase se considera hecha cuando cumple simultáneamente:

- [ ] El sitio corre en local y en la URL real/preview de GitHub Pages.
- [ ] La URL publicada funciona bajo subcarpeta de repositorio, no solo en dominio raíz.
- [ ] Todas las rutas internas usan hash routing o enlaces relativos compatibles con GitHub Pages.
- [ ] Existe `.nojekyll` si no se usa Jekyll.
- [ ] No hay errores críticos en consola.
- [ ] No hay enlaces internos rotos.
- [ ] Los enlaces externos están catalogados; los rotos quedan documentados con fecha de verificación.
- [ ] `content parity` no muestra pérdida injustificada de contenido.
- [ ] Lighthouse móvil: Accessibility ≥ 90, Best Practices ≥ 90, Performance ≥ 80.
- [ ] axe-core: 0 violaciones críticas o serias.
- [ ] El sitio funciona a 360 px sin scroll horizontal.
- [ ] La navegación por teclado permite completar una semana.
- [ ] El usuario puede marcar avance, cerrar, volver y continuar donde quedó.
- [ ] Cada PR incluye capturas antes/después, checklist, cambios de datos y riesgos conocidos.

---

## 4. Arquitectura objetivo

### 4.1 Modelo de experiencia

```text
Nivel 0 — Pantalla de inicio
  Tarjetas de módulos · progreso global · botón Continuar · ruta sugerida · acceso a diagnóstico

Nivel 1 — Módulo
  Panel lateral o vista de módulo · semanas del módulo · estado de cada semana · progreso del módulo

Nivel 2 — Semana
  Secuencia de unidades · paso actual · progreso de semana · objetivo · entregable

Nivel 3 — Unidad de contenido
  Una sola cosa por pantalla: introducción, entender, video, reto, hacer, compartir, rúbrica o reflexión
```

**Regla principal:** la persona usuaria debe leer, ver o completar **una sola unidad** antes de avanzar. No debe existir scroll infinito dentro de una semana.

### 4.2 Rutas de aplicación compatibles con GitHub Pages

Usar **hash routing** como decisión por defecto. En GitHub Pages, la parte posterior al `#` no se envía al servidor; por eso al recargar no se genera 404 y el `index.html` puede reconstruir la vista correcta desde JavaScript.

```text
./index.html#/inicio
./index.html#/diagnostico
./index.html#/ruta
./index.html#/modulo/0
./index.html#/modulo/1
./index.html#/semana/m1-s1
./index.html#/unidad/m1-s1/u03
./index.html#/biblioteca
./index.html#/portafolio
./index.html#/glosario
./index.html#/credenciales
```

Reglas de implementación:

- No usar rutas tipo `/modulo/1` o `/semana/m1-s1` en V1, salvo que se creen archivos físicos reales para cada ruta.
- No usar React Router/Vue Router/SvelteKit en modo History sin una estrategia probada para GitHub Pages.
- `404.html` puede existir como respaldo para enlaces antiguos, pero no debe ser la estrategia principal de navegación.
- Todo enlace interno debe generarse con una función central, por ejemplo `routeTo('unidad', { semana: 'm1-s1', unidad: 'u03' })`, para evitar enlaces rotos.
- El router debe tolerar rutas desconocidas y mostrar una vista de recuperación: “No encontramos esta sección. Volver al inicio / continuar donde quedó”.

### 4.3 Legacy anchors

Crear un mapa de redirección desde anclas antiguas:

```js
const legacyRoutes = {
  '#modulo0': '#/modulo/0',
  '#diagnostico': '#/diagnostico',
  '#t1-s1': '#/semana/m1-s1',
  '#t1-s2': '#/semana/m1-s2',
  '#m1-s1': '#/semana/m2-s1',
  '#m2-s5': '#/semana/m3-s1',
  '#m3-s9': '#/semana/m4-s1'
};
```

Antigravity debe ajustar este mapa tras inventariar el repo real.

---

## 5. Módulos objetivo y mapa de reorganización

### 5.1 Nombres institucionales y frases amigables

| Código | Nombre institucional | Frase para la persona usuaria |
|---|---|---|
| Módulo 0 | Punto de partida: mi perfil y mi negocio | ¿Dónde estoy y qué necesito? |
| Módulo 1 | Validar antes de invertir | Antes de gastar, validemos |
| Módulo 2 | Radiografía del negocio con IA | Miremos el negocio con lupa |
| Módulo 3 | Ordenar y automatizar procesos | Ahorrar tiempo y ordenar mejor |
| Módulo 4 | Comunicar, vender y decidir con datos | Vender mejor con evidencia |

### 5.2 Mapeo tentativo desde la estructura previa

| Estructura previa | Nueva ubicación probable | Acción requerida |
|---|---|---|
| Módulo 0: diagnóstico | Módulo 0 | Sustituir filtro de tres preguntas por instrumento ampliado de clasificación, mínimo 15 preguntas, persistencia local y recomendación trazable |
| Toolkit pre-operativo / Toolkit 1 | Módulo 1 | Mantener semanas T1-S1…T1-S4 como semanas del nuevo Módulo 1 |
| Módulo I: diagnóstico con IA | Módulo 2 | Reubicar como radiografía del negocio |
| Módulo II: automatización | Módulo 3 | Mantener, agregando peldaños intermedios |
| Módulo III: comercialización / decisiones | Módulo 4 | Integrar comunicación, ventas, datos y prefactibilidad |

**Advertencia:** este mapa es operativo, no definitivo. En Fase 0 se debe confirmar contra el repositorio real y documentar discrepancias.

---

## 6. Stack recomendado

### 6.1 V1 estática obligatoria para GitHub Pages

- `index.html` como app shell en la raíz de publicación.
- CSS propio con variables institucionales.
- JavaScript vanilla o librerías muy ligeras sin servidor.
- Contenido en JSON estático servido desde `/contenido` o ruta relativa equivalente.
- Estado en `localStorage`; `IndexedDB` solo si se justifica para almacenamiento local más pesado.
- Hash routing.
- Archivo `.nojekyll` si el sitio no usa Jekyll.
- Rutas relativas, nunca absolutas a raíz.
- Sin base de datos.
- Sin login obligatorio.
- Sin carga real de archivos a servidor.
- Sin panel administrativo dinámico; configuración por JSON editado en el repositorio.
- Sin API keys en cliente.
- Sin dependencias que requieran proceso de servidor en tiempo de ejecución.

Patrón recomendado:

```text
index.html carga assets/js/app.js
app.js detecta location.hash
app.js carga contenido/curriculum.json con fetch relativo
renderiza la vista solicitada en <main id="app"></main>
estado.js lee/escribe localStorage
```

Para pruebas locales, Antigravity debe levantar un servidor estático simple, por ejemplo `python -m http.server`, porque `fetch()` de JSON puede fallar si se abre el HTML directamente con `file://`.

### 6.2 V2 futura con backend, fuera del alcance obligatorio

Solo si la institución decide formalizar credenciales o seguimiento:

- Autenticación.
- Base de datos.
- Progreso multidispositivo.
- Carga real de archivos.
- Panel administrativo.
- Emisión formal de credenciales.
- Analítica institucional de avance.

### 6.3 Implicación para campos de evidencia

En V1, cuando las especificaciones indiquen “cargar archivo”, implementar así:

1. Campo para pegar URL de evidencia.
2. Campo de texto libre para notas.
3. Opción local de seleccionar archivo solo para registrar nombre/tipo/tamaño o guardar localmente si se usa `IndexedDB`.
4. Mensaje claro: “La evidencia se guarda localmente en este navegador. Para conservarla fuera de este dispositivo, utilice un enlace de Drive, OneDrive, Canva, Padlet u otra plataforma.”

No implementar una falsa carga de archivo si no existe servidor.

### 6.4 Prohibiciones explícitas en V1 GitHub Pages

Estas solicitudes deben rechazarse o moverse al backlog V2:

| Solicitud | Decisión V1 | Alternativa estática |
|---|---|---|
| Guardar progreso en base de datos | No permitido | `localStorage` + exportar/importar JSON |
| Login institucional | No permitido | Perfil local no autenticado |
| Subir archivos de evidencia | No permitido | Pegar URL externa + nota + metadatos locales |
| Panel administrativo | No permitido | Archivos JSON versionados en Git |
| Enviar correos desde el sitio | No permitido | Enlace `mailto:` o formulario externo |
| Analítica nominal de usuarios | No permitido | Sin analítica nominal; métricas agregadas solo con herramienta externa aprobada |
| API de IA con clave | No permitido en cliente | Enlace externo o V2 con backend seguro |
| Certificados automáticos institucionales | No permitido | Constancia local/guía de requisitos; emisión formal fuera del sitio |

### 6.5 Compatibilidad con URL de proyecto

El sitio probablemente opera como proyecto GitHub Pages, por ejemplo:

```text
https://agmelendez.github.io/cajadeherramientasparaemprendedores/
```

Por eso Antigravity debe probar explícitamente que funcionan:

```text
https://agmelendez.github.io/cajadeherramientasparaemprendedores/
https://agmelendez.github.io/cajadeherramientasparaemprendedores/#/inicio
https://agmelendez.github.io/cajadeherramientasparaemprendedores/#/unidad/m1-s1/u03
```

No basta con que funcione en `localhost` ni en `https://agmelendez.github.io/`.

---

## 7. Estructura objetivo de archivos

```text
/
├── index.html                  # entrada requerida por GitHub Pages
├── 404.html                    # respaldo, no router principal
├── .nojekyll                   # obligatorio si no se usa Jekyll
├── CNAME                       # opcional, solo si existe dominio propio
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── componentes.css
│   │   ├── unidades.css
│   │   ├── responsive.css
│   │   └── print.css
│   └── js/
│       ├── app.js
│       ├── router.js
│       ├── estado.js
│       ├── progreso.js
│       ├── renderInicio.js
│       ├── renderModulo.js
│       ├── renderSemana.js
│       ├── renderUnidad.js
│       ├── diagnostico.js
│       ├── sendas.js
│       ├── glosario.js
│       ├── biblioteca.js
│       ├── portafolio.js
│       ├── asistente.js
│       ├── legacyRoutes.js
│       └── a11y.js
├── contenido/
│   ├── modulos.json
│   ├── semanas.json
│   ├── unidades.json
│   ├── diagnostico.json
│   ├── glosario.json
│   ├── rubrica-semanal.json
│   ├── recursos.json
│   ├── rutas.json
│   └── config.json
├── infografias/
│   ├── originales/
│   └── transcripciones/
├── plantillas/
├── rubricas/
├── politicas/
├── logos/
├── baseline/
├── scripts/
│   ├── extract-visible-text.js
│   ├── check-content-parity.js
│   ├── check-links.js
│   ├── check-a11y.js
│   └── build-search-index.js
└── docs/
    ├── INVENTARIO.md
    ├── CHANGELOG.md
    ├── DECISIONES_ARQUITECTURA.md
    ├── MAPA_LEGACY_ANCHORS.md
    ├── CAMBIOS_DE_LENGUAJE.md
    ├── LIMITACIONES_V1_ESTATICA.md
    └── QA_CHECKLIST.md
```

---

## 8. Modelo de datos

### 8.1 `modulos.json`

```jsonc
[
  {
    "id": "m0",
    "codigo": "Módulo 0",
    "nombre": "Punto de partida: mi perfil y mi negocio",
    "frase": "¿Dónde estoy y qué necesito?",
    "descripcion": "Autodiagnóstico inicial para orientar la ruta de aprendizaje.",
    "orden": 0,
    "duracionSemanas": 0,
    "tipo": "diagnostico",
    "desbloqueadoPorDefecto": true
  },
  {
    "id": "m1",
    "codigo": "Módulo 1",
    "nombre": "Validar antes de invertir",
    "frase": "Antes de gastar, validemos",
    "descripcion": "Validación inicial de ideas, tendencias y evidencia mínima antes de invertir.",
    "orden": 1,
    "duracionSemanas": 4,
    "tipo": "aprendizaje",
    "desbloqueadoPorDefecto": true
  }
]
```

### 8.2 `semanas.json`

```jsonc
[
  {
    "id": "m1-s1",
    "moduloId": "m1",
    "ordenModulo": 1,
    "semanaGlobal": 1,
    "codigoAnterior": "T1-S1",
    "titulo": "Validación de idea y tendencias de mercado",
    "objetivo": "Texto literal del objetivo actual.",
    "descripcionBreve": "Resumen máximo de tres oraciones, derivado del contenido existente.",
    "entregable": "Captura de Google Trends y Exploding Topics con tres términos.",
    "tiempoEstimadoMin": 120,
    "prerequisito": null,
    "unidadInicial": "m1-s1-u01",
    "recursos": ["r-google-trends", "r-exploding-topics"],
    "rubricaRef": "rubrica-semanal",
    "sendas": ["guiada", "acelerada", "profunda"]
  }
]
```

### 8.3 `unidades.json`

```jsonc
[
  {
    "id": "m1-s1-u01",
    "semanaId": "m1-s1",
    "orden": 1,
    "tipo": "introduccion",
    "titulo": "Objetivo y entregable de la semana",
    "html": "Texto literal o migrado sin pérdida.",
    "requiereAccion": false,
    "boton": "Comenzar"
  },
  {
    "id": "m1-s1-u02",
    "semanaId": "m1-s1",
    "orden": 2,
    "tipo": "entender",
    "pesoPedagogico": 25,
    "titulo": "Conceptos clave",
    "html": "Texto literal del bloque ENTENDER.",
    "requiereAccion": false,
    "boton": "Siguiente"
  },
  {
    "id": "m1-s1-u04",
    "semanaId": "m1-s1",
    "orden": 4,
    "tipo": "reto",
    "pesoPedagogico": 5,
    "titulo": "Mi primera validación de tendencia",
    "html": "Texto literal del reto.",
    "entregable": "Captura de pantalla o enlace a evidencia.",
    "evidencia": {
      "aceptaUrl": true,
      "aceptaNota": true,
      "aceptaArchivoLocal": true,
      "persistencia": "local"
    },
    "requiereAccion": true,
    "boton": "Marcar como completado y continuar"
  }
]
```

### 8.4 Tipos de unidad válidos

| Tipo | Uso | Cuenta avance al presionar |
|---|---|---|
| `introduccion` | Objetivo, descripción y entregable | Siguiente |
| `entender` | Concepto teórico, explicación, marco crítico | Siguiente |
| `multimedia` | Video, audio o recurso embebido | Siguiente |
| `interpretacion_critica` | Advertencia, reflexión ética o metodológica | Siguiente |
| `reto` | Actividad breve de exploración | Marcar completado |
| `hacer` | Práctica guiada principal | Guardar y continuar |
| `compartir` | Padlet u otro espacio colaborativo | Marqué como compartido / Siguiente si opcional |
| `rubrica` | Autoevaluación y cierre de semana | Declarar semana completada |
| `herramienta` | Simulador, plantilla o formulario interno | Guardar y continuar |
| `reflexion` | Cierre metacognitivo | Siguiente |

### 8.5 Rúbrica canónica

La rúbrica no debe repetirse en cada semana. Debe existir una única fuente:

```jsonc
{
  "id": "rubrica-semanal",
  "titulo": "Antes de avanzar, revise su evidencia con estos criterios",
  "criterios": [
    {
      "id": "pertinencia",
      "nombre": "Pertinencia empresarial",
      "inicial": "...",
      "adecuado": "...",
      "solido": "..."
    },
    {
      "id": "uso-critico-ia",
      "nombre": "Uso crítico de IA",
      "inicial": "...",
      "adecuado": "...",
      "solido": "..."
    },
    {
      "id": "evidencia",
      "nombre": "Evidencia verificable",
      "inicial": "...",
      "adecuado": "...",
      "solido": "..."
    },
    {
      "id": "privacidad-etica",
      "nombre": "Privacidad y ética",
      "inicial": "...",
      "adecuado": "...",
      "solido": "..."
    }
  ]
}
```



### 8.6 `diagnostico-preguntas.json` — Instrumento ampliado de clasificación

El Módulo 0 debe convertirse en un instrumento de clasificación funcional. El formulario actual de tres preguntas no filtra con suficiente precisión, por lo que debe reemplazarse por un instrumento mínimo de **15 preguntas**. Para reducir errores de clasificación, la versión 2.2 recomienda implementar **20 preguntas base** agrupadas en cinco dimensiones.

Dimensiones obligatorias:

| Dimensión | Código | Qué mide | Uso en recomendación |
|---|---|---|---|
| Competencias digitales | `CD` | Manejo de herramientas, archivos, formularios, seguridad y autonomía digital | Define necesidad de senda guiada o posibilidad de avanzar a módulos operativos |
| Alfabetización en IA | `AIA` | Comprensión básica de IA generativa, prompts, verificación, límites y riesgos | Define nivelación, glosario activo, test-out y acceso a contenidos avanzados |
| Acceso a tecnologías | `AT` | Internet, dispositivo, correo, cuentas, posibilidad de usar herramientas externas | Condiciona si conviene iniciar con automatización o con nivelación |
| Claridad de uso/beneficio de IA | `CUB` | Capacidad de identificar problemas del negocio donde IA puede aportar valor | Define si se inicia por validación, diagnóstico, automatización o ventas/datos |
| Contexto y madurez de la empresa | `CME` | Etapa, claridad de oferta, datos, procesos, ventas y urgencias operativas | Define módulo inicial y secuencia recomendada |

Estructura sugerida:

```jsonc
[
  {
    "id": "q01",
    "dimension": "CD",
    "bloque": "persona_gestora",
    "texto": "¿Con qué frecuencia utiliza formularios, hojas de cálculo, correo electrónico o herramientas digitales para su negocio?",
    "tipo": "likert_0_4",
    "opciones": [
      { "valor": 0, "etiqueta": "Nunca o casi nunca" },
      { "valor": 1, "etiqueta": "Pocas veces" },
      { "valor": 2, "etiqueta": "A veces" },
      { "valor": 3, "etiqueta": "Con frecuencia" },
      { "valor": 4, "etiqueta": "Todos los días o casi todos los días" }
    ],
    "peso": 1.0,
    "requerida": true
  }
]
```

Reglas:

- Cada pregunta debe tener `id`, `dimension`, `bloque`, `texto`, `tipo`, `opciones`, `peso` y `requerida`.
- El sistema debe permitir agregar o quitar preguntas desde JSON sin tocar el código de render.
- Todas las preguntas obligatorias deben contestarse antes de calcular la recomendación.
- Las preguntas no deben pedir datos personales sensibles ni información identificable de clientes.
- El asistente del sitio debe estar desactivado durante el diagnóstico para no inducir respuestas.

### 8.7 Instrumento mínimo recomendado — 20 preguntas base

Antigravity debe cargar estas preguntas desde `contenido/diagnostico-preguntas.json`. Las opciones pueden implementarse como Likert 0–4, selección única o selección múltiple ponderada según el tipo.

| ID | Dimensión | Pregunta | Tipo sugerido | Uso esperado |
|---|---|---|---|---|
| q01 | CD | ¿Con qué frecuencia utiliza correo, formularios, hojas de cálculo o herramientas digitales para su negocio? | Likert 0–4 | Autonomía digital general |
| q02 | CD | ¿Puede crear, guardar, buscar y compartir archivos digitales sin ayuda? | Likert 0–4 | Manejo operativo básico |
| q03 | CD | ¿Ha creado cuentas en plataformas digitales y activado mecanismos de seguridad como verificación en dos pasos? | Likert 0–4 | Test-out de cuentas/2FA |
| q04 | CD | Cuando una herramienta digital cambia o falla, ¿puede resolverlo buscando instrucciones o tutoriales? | Likert 0–4 | Capacidad de autoaprendizaje digital |
| q05 | AIA | ¿Ha utilizado herramientas de IA generativa como ChatGPT, Gemini, Copilot u otras? | Likert 0–4 | Exposición previa a IA |
| q06 | AIA | ¿Sabe formular instrucciones o prompts para obtener respuestas útiles? | Likert 0–4 | Nivel de prompting |
| q07 | AIA | ¿Verifica la información que entrega una IA antes de usarla en una decisión del negocio? | Likert 0–4 | Pensamiento crítico/HITL |
| q08 | AIA | ¿Reconoce riesgos de usar IA, como errores, sesgos, datos personales o información inventada? | Likert 0–4 | Nivel ético/crítico |
| q09 | AT | ¿Cuenta con acceso estable a Internet para trabajar en el curso y probar herramientas externas? | Likert 0–4 | Viabilidad operativa |
| q10 | AT | ¿Dispone de computadora o teléfono inteligente suficiente para usar herramientas web, videos y formularios? | Likert 0–4 | Restricción tecnológica |
| q11 | AT | ¿Puede instalar, registrarse o ingresar a herramientas externas cuando el curso lo solicite? | Likert 0–4 | Preparación para automatización/no-code |
| q12 | CUB | ¿Tiene claro qué problema de su negocio quisiera resolver con IA? | Likert 0–4 | Dirección de aprendizaje |
| q13 | CUB | ¿Puede identificar tareas repetitivas o lentas que podrían automatizarse parcialmente? | Likert 0–4 | Recomendación Módulo 3 |
| q14 | CUB | ¿Tiene claro cómo la IA podría ayudarle a vender, comunicar, atender clientes o tomar decisiones? | Likert 0–4 | Recomendación Módulo 4 |
| q15 | CUB | ¿Sabe distinguir entre usar IA por moda y usarla para resolver un problema concreto del negocio? | Likert 0–4 | Madurez de adopción |
| q16 | CME | ¿En qué etapa se encuentra su emprendimiento o empresa? | Selección única | Idea / inicio / operación / crecimiento |
| q17 | CME | ¿Tiene claramente definida su oferta, cliente principal y propuesta de valor? | Likert 0–4 | Recomendación Módulo 1 o 2 |
| q18 | CME | ¿Ha validado su idea, producto o servicio con datos, ventas, entrevistas o evidencia real? | Likert 0–4 | Recomendación Módulo 1 |
| q19 | CME | ¿Registra ventas, costos, clientes, inventario o procesos de forma ordenada? | Likert 0–4 | Recomendación Módulo 2 |
| q20 | CME | ¿Cuál es la urgencia principal de su negocio en los próximos tres meses? | Selección única ponderada | Validar / ordenar / automatizar / vender / números |

Pregunta opcional recomendada para mejorar clasificación:

| ID | Dimensión | Pregunta | Tipo sugerido | Uso esperado |
|---|---|---|---|---|
| q21 | CME | ¿Cuánto tiempo real puede dedicar por semana al curso? | Selección única | Ajustar ritmo, no bloquear módulos |

### 8.8 `diagnostico-reglas.json` — Algoritmo de clasificación local

El algoritmo debe ser transparente, determinístico, trazable y ejecutarse completamente en el navegador. No debe llamar APIs externas ni usar modelos de IA para clasificar.

Cálculo mínimo:

```js
puntajeDimension = 100 * suma(valorPregunta * pesoPregunta) / suma(valorMaximoPregunta * pesoPregunta)
```

Salida esperada:

```jsonc
{
  "versionInstrumento": "2.2.0",
  "fecha": "2026-06-22T00:00:00.000Z",
  "puntajes": {
    "CD": 68,
    "AIA": 42,
    "AT": 80,
    "CUB": 55,
    "CME": 47
  },
  "senda": "acelerada",
  "nivelacionRequerida": false,
  "moduloInicial": "m2",
  "modulosRecomendados": ["m2", "m3", "m4"],
  "modulosNoPrioritarios": ["m1"],
  "testOutSugerido": ["cuentas-basicas", "seguridad-2fa"],
  "ayudasActivas": ["glosario-basico", "verificacion-ia"],
  "confianzaClasificacion": "media",
  "justificacion": [
    "El negocio ya opera, pero requiere ordenar información y diagnosticar prioridades.",
    "La persona tiene acceso tecnológico suficiente, pero alfabetización en IA intermedia."
  ]
}
```

### 8.9 Reglas de decisión para senda de acompañamiento

| Condición | Senda recomendada | Ayudas activas |
|---|---|---|
| `CD < 45` o `AIA < 35` o `AT < 40` | Guiada | Glosario básico siempre visible, pasos pequeños, nivelación, mensajes de apoyo |
| `CD >= 45` y `AIA < 65` | Acelerada | Test-out de herramientas básicas, foco en IA, checklists colapsables |
| `CD >= 65` y `AIA >= 65` y `AT >= 60` | Profunda | Retos avanzados, acceso directo a Módulos 3–4, teoría avanzada visible |
| `AT < 40` | Guiada con advertencia de acceso | Recomendación de preparar cuenta/dispositivo/conexión antes de herramientas externas |

La senda no debe bloquear contenido. Solo modifica ayudas, orden sugerido, nivel de detalle y test-out.

### 8.10 Reglas de decisión para módulo inicial

| Patrón de respuestas | Módulo inicial sugerido | Secuencia sugerida |
|---|---|---|
| `CME` indica idea/inicio y `q18 <= 2` | Módulo 1 — Validar antes de invertir | m1 → m2 → m4 → m3 |
| Negocio en operación, `q19 <= 2` o baja claridad de datos/procesos | Módulo 2 — Radiografía del negocio con IA | m2 → m3 → m4 |
| Alta carga repetitiva (`q13 >= 3`) y `CD >= 50` y `AT >= 50` | Módulo 3 — Ordenar y automatizar procesos | m3 → m2 → m4 |
| Problema principal es vender/comunicar/clientes y `q14 >= 3` | Módulo 4 — Comunicar, vender y decidir con datos | m4 → m2 → m3 |
| `CD < 35` o `AIA < 25` | Módulo 0 extendido / nivelación | m0 → m1 o m2 según etapa |
| Empate entre módulos | Módulo con mayor urgencia declarada en q20 | Mostrar dos rutas alternativas |

Restricciones de calidad:

- No recomendar Módulo 3 como inicio si `AT < 40`, aunque la persona declare interés en automatizar.
- No recomendar Módulo 4 como inicio si la oferta, cliente o propuesta de valor están muy poco claros; en ese caso sugerir Módulo 1 o 2 primero.
- No ocultar módulos no recomendados; mostrarlos como “también disponible”.
- Siempre mostrar la razón de la recomendación en lenguaje claro.

### 8.11 Archivos nuevos requeridos para el diagnóstico v2.2

```text
contenido/
├── diagnostico-preguntas.json
├── diagnostico-reglas.json
└── diagnostico-mensajes.json

assets/js/
├── diagnostico.js          # render del formulario, validación y navegación
├── clasificador.js         # cálculo de puntajes y reglas de recomendación
└── recomendador.js         # genera salida visible: módulo, senda, justificación, próximos pasos
```

Criterios de aceptación del modelo diagnóstico:

- [ ] Hay al menos 15 preguntas activas; recomendado: 20 preguntas base + 1 opcional.
- [ ] Cada pregunta se carga desde JSON, no está quemada en HTML.
- [ ] El algoritmo produce puntajes por dimensión.
- [ ] El algoritmo recomienda módulo inicial, secuencia de módulos, senda y ayudas.
- [ ] La recomendación muestra justificación visible.
- [ ] El usuario puede aceptar, cambiar o ignorar la recomendación.
- [ ] El diagnóstico se guarda en `localStorage`.
- [ ] El asistente no está activo durante el diagnóstico.
- [ ] Todo funciona en GitHub Pages sin backend.


---

## 9. Esquema de estado local

### 9.1 Clave principal

La versión 2.2 amplía el estado del diagnóstico. Usar nueva clave y migrar desde versiones anteriores si existen.

```js
localStorage["cajaIA.estado.v3"]
```

### 9.2 Estructura

```jsonc
{
  "schemaVersion": 3,
  "instaladoEn": "2026-06-22T00:00:00.000Z",
  "actualizadoEn": "2026-06-22T00:00:00.000Z",
  "perfil": "guiada",
  "diagnostico": {
    "versionInstrumento": "2.2.0",
    "completado": false,
    "fechaInicio": null,
    "fechaCompletado": null,
    "respuestas": {
      "q01": null,
      "q02": null,
      "q03": null
    },
    "puntajes": {
      "CD": null,
      "AIA": null,
      "AT": null,
      "CUB": null,
      "CME": null
    },
    "resultado": {
      "senda": null,
      "nivelacionRequerida": false,
      "moduloInicial": null,
      "modulosRecomendados": [],
      "modulosNoPrioritarios": [],
      "testOutSugerido": [],
      "ayudasActivas": [],
      "confianzaClasificacion": null,
      "justificacion": [],
      "primerPaso": null
    }
  },
  "progreso": {
    "unidades": {
      "m1-s1-u01": {
        "estado": "vista",
        "vistoEn": "2026-06-22T00:00:00.000Z",
        "completadoEn": null
      }
    },
    "semanas": {
      "m1-s1": {
        "estado": "en-curso",
        "porcentaje": 43,
        "ultimaUnidad": "m1-s1-u03",
        "completadaEn": null,
        "autoevaluacion": {}
      }
    },
    "modulos": {
      "m1": {
        "estado": "en-curso",
        "porcentaje": 25
      }
    }
  },
  "evidencias": {
    "m1-s1-u04": {
      "url": "",
      "nota": "",
      "archivoLocal": {
        "nombre": "",
        "tipo": "",
        "tamanoBytes": 0,
        "guardadoEnIndexedDB": false
      },
      "fecha": null
    }
  },
  "competencias": {
    "cuentas-basicas": false,
    "seguridad-2fa": false,
    "uso-chatbot-basico": false,
    "prompting-basico": false,
    "no-code-basico": false,
    "datos-basicos": false
  },
  "ultimaRuta": "#/unidad/m1-s1/u03",
  "insignias": [],
  "preferencias": {
    "glosarioSiempreVisible": false,
    "modoAltoContraste": false,
    "tamanoTexto": "normal"
  }
}
```

### 9.3 API mínima

Implementar en `estado.js`, `diagnostico.js`, `clasificador.js` y `recomendador.js`:

- `cargarEstado()`
- `guardarEstado(parcial)`
- `migrarEstado(estadoAnterior)`
- `guardarRespuestaDiagnostico(preguntaId, valor)`
- `validarDiagnosticoCompleto()`
- `calcularPuntajesDiagnostico(respuestas, preguntas)`
- `clasificarPerfil(puntajes, respuestas, reglas)`
- `generarRecomendacion(resultado)`
- `aceptarRutaRecomendada()`
- `cambiarRutaManual(moduloId, senda)`
- `marcarUnidadVista(unidadId)`
- `marcarUnidadCompletada(unidadId)`
- `guardarEvidencia(unidadId, evidencia)`
- `declararSemanaCompletada(semanaId, autoevaluacion)`
- `calcularProgresoSemana(semanaId)`
- `calcularProgresoModulo(moduloId)`
- `calcularProgresoGlobal()`
- `obtenerUltimaRuta()`
- `obtenerSiguienteUnidad(semanaId, unidadId)`
- `obtenerSiguienteSemana(semanaId)`
- `exportarEstado()`
- `importarEstado(json)`
- `resetearProgreso(confirmacion)`

### 9.4 Reglas de seguridad, privacidad y validez

- [ ] No guardar datos sensibles de clientes.
- [ ] No solicitar cédula, teléfono, dirección, nombre de clientes, ingresos exactos ni información tributaria identificable.
- [ ] Mostrar advertencia en el diagnóstico: las respuestas se guardan solo en este navegador.
- [ ] Mostrar advertencia en unidades de evidencia: no subir ni pegar datos personales identificables.
- [ ] Ofrecer exportación manual del progreso como JSON.
- [ ] Ofrecer importación manual del progreso para migrar de navegador.
- [ ] Si `localStorage` falla, el sitio debe seguir funcionando sin persistencia.
- [ ] La recomendación debe presentarse como orientación, no como obligación.
- [ ] El usuario debe poder revisar o repetir el diagnóstico.

### 9.5 Trazabilidad de la recomendación

Toda recomendación debe mostrar:

1. Módulo sugerido para iniciar.
2. Secuencia recomendada.
3. Senda de acompañamiento.
4. Dos o tres razones principales.
5. Competencias que puede omitir mediante test-out.
6. Advertencias de nivelación si aplica.
7. Enlace para cambiar ruta manualmente.

Ejemplo de microcopy:

> Según sus respuestas, le recomendamos iniciar por **Módulo 2: Radiografía del negocio con IA**, porque su negocio ya opera, pero requiere ordenar información, procesos y prioridades antes de automatizar o vender con IA. También activamos la senda **Acelerada**, porque usted ya utiliza herramientas digitales, pero todavía está fortaleciendo el uso crítico de IA.

---

## 10. Fase 0 — Pre-vuelo, inventario y línea base

> **Rama:** `fase-0-prevuelo`
>
> **Propósito:** conocer el repositorio real antes de refactorizar. No modificar diseño ni contenido.

### 10.1 Inventario técnico

Crear `docs/INVENTARIO.md` con:

- Árbol de archivos real.
- Tecnología detectada.
- HTML principales y auxiliares.
- CSS existentes.
- JS existentes.
- Imágenes e infografías.
- Plantillas.
- Rúbricas.
- Políticas.
- Formularios.
- Recursos externos.
- Dependencias externas.
- Anclas internas.
- Rutas públicas existentes.
- Elementos del asistente de curso.

### 10.2 Inventario pedagógico

Crear `docs/INVENTARIO_PEDAGOGICO.md` con:

- Módulos actuales.
- Semanas actuales.
- Correspondencia con nuevos módulos 0–4.
- Objetivo por semana.
- Entregable por semana.
- Reto por semana.
- Práctica por semana.
- Bloque Entender por semana.
- Actividad Compartir por semana.
- Rúbricas repetidas.
- Infografías asociadas.

### 10.3 Línea base de contenido

Crear:

```text
baseline/contenido-original.txt
baseline/enlaces-originales.csv
baseline/anclas-originales.json
baseline/lighthouse-home.html
baseline/lighthouse-semana.html
baseline/axe-home.json
baseline/axe-semana.json
```

### 10.4 Scripts base

Crear o preparar:

```text
scripts/extract-visible-text.js
scripts/check-content-parity.js
scripts/check-links.js
scripts/check-a11y.js
```

### 10.5 Criterios de aceptación Fase 0

- [ ] Existe inventario técnico completo.
- [ ] Existe inventario pedagógico completo.
- [ ] Existe mapa de estructura actual → estructura nueva.
- [ ] Están identificadas las anclas históricas.
- [ ] Están identificados los enlaces externos.
- [ ] Están identificadas las infografías que requieren transcripción.
- [ ] Producción no cambia.

---

## 11. Fase 1 — Estabilización rápida sobre el sitio actual

> **Rama:** `fase-1-estabilizacion`
>
> **Propósito:** reducir desorientación antes de la refactorización mayor.
>
> **Resultado esperado:** el sitio sigue siendo parecido, pero ya ofrece progreso, continuar, glosario, numeración coherente y menor carga visual.

### 11.1 Progreso mínimo y botón Continuar

Implementar:

- `estado.js` versión inicial.
- Botón “Continuar donde quedé”.
- Marcado de semana completada.
- Barras de progreso por módulo.
- Progreso global.
- Persistencia local.

Criterios:

- [ ] Al marcar una semana y recargar, el avance persiste.
- [ ] Continuar lleva a la última sección activa.
- [ ] Si no hay progreso, Continuar lleva al diagnóstico o Módulo 0.
- [ ] No hay errores con `localStorage` bloqueado.

### 11.2 Rúbrica única temporal

- Extraer rúbrica repetida a componente único.
- Reemplazar repeticiones por botón o acordeón “Ver rúbrica”.
- Documentar en allowlist las repeticiones removidas.

Criterios:

- [ ] La rúbrica se mantiene completa.
- [ ] No hay 16 copias innecesarias.
- [ ] El componente es accesible con teclado.

### 11.3 RHEC colapsable

- Convertir Reto, Hacer, Entender y Compartir en pestañas o acordeones.
- Una sección abierta por defecto.
- Mantener todo el contenido accesible.

Criterios:

- [ ] No se oculta contenido de forma irreversible.
- [ ] `aria-expanded` y foco funcionan correctamente.
- [ ] En móvil no hay solapamientos.

### 11.4 Glosario emergente

Crear `glosario.json` con términos iniciales:

- IA
- IA generativa
- LLM
- prompt
- CIFRCE
- RHEC
- Human-in-the-Loop
- 2FA
- API
- no-code
- Make
- n8n
- trigger
- webhook
- router
- CRM
- ROI
- prefactibilidad
- anonimización
- dato sensible
- Ley 8968

Criterios:

- [ ] Cada término tiene definición breve.
- [ ] El tooltip funciona en teclado, mouse y táctil.
- [ ] No genera cambio brusco de layout.

### 11.5 Numeración transicional

- Crear etiquetas visibles coherentes.
- No eliminar códigos anteriores todavía.
- Mostrar ambos si ayuda durante transición: “Módulo 1 · antes Toolkit T1-S1”.

Criterios:

- [ ] La persona entiende el orden completo.
- [ ] No hay reinicios confusos de semana.
- [ ] El mapa de equivalencias está documentado.

### 11.6 Cierre Fase 1

- [ ] Sitio desplegable.
- [ ] Paridad de contenido.
- [ ] Progreso local funcional.
- [ ] Glosario activo.
- [ ] RHEC menos cargado visualmente.

---

## 12. Fase 2 — Migración a datos y arquitectura de cuatro niveles

> **Rama:** `fase-2-arquitectura-cuatro-niveles`
>
> **Propósito:** convertir el sitio en plataforma modular real.

### 12.1 Migrar contenido a JSON

Migrar a:

```text
contenido/modulos.json
contenido/semanas.json
contenido/unidades.json
contenido/recursos.json
contenido/rubrica-semanal.json
contenido/glosario.json
```

Reglas:

- Copiar texto literal cuando sea contenido sustantivo.
- Microresúmenes de tarjeta pueden redactarse, pero deben derivarse del contenido existente.
- Toda redacción nueva debe documentarse.

Criterios:

- [ ] El sitio puede renderizarse desde JSON.
- [ ] `content parity` no detecta pérdida no autorizada.
- [ ] Cada semana tiene unidades secuenciales.

### 12.2 Crear app shell

`index.html` debe contener únicamente:

- Header institucional.
- Navegación principal.
- Contenedor principal `main#app`.
- Footer.
- Scripts.
- Fallback accesible.

Criterios:

- [ ] No queda el curso completo incrustado como HTML monolítico.
- [ ] El contenido se renderiza desde datos.
- [ ] Si falla JS, hay mensaje claro de error y enlace de recuperación.

### 12.2.1 Reglas de router para GitHub Pages

El router debe cumplir:

- [ ] Lee `window.location.hash`, no `window.location.pathname`, para decidir la vista.
- [ ] Tolera despliegue bajo subcarpeta del repositorio.
- [ ] Usa `new URL('./contenido/curriculum.json', document.baseURI)` o equivalente para cargar datos.
- [ ] No genera enlaces internos con `/` inicial.
- [ ] No requiere configuración de servidor ni rewrite rules.
- [ ] Al recargar `/#/unidad/m1-s1/u03`, reconstruye la misma unidad.
- [ ] Al recibir un hash antiguo, consulta `legacyRoutes` y redirige.
- [ ] Al recibir un hash inválido, muestra recuperación sin romper la app.

### 12.3 Vista Inicio

Debe mostrar:

- Nombre del programa.
- Logos UCR / CIOdD / DIPROVID.
- Botón principal: “Continuar”.
- Botón secundario: “Realizar diagnóstico”.
- Progreso global.
- Tarjetas de módulos.
- Acceso a Ruta de aprendizaje.
- Acceso a Biblioteca.
- Acceso a Portafolio.

Cada tarjeta de módulo debe incluir:

- Número de módulo.
- Nombre institucional.
- Frase amigable.
- Duración estimada.
- Barra de progreso.
- Estado: disponible, en curso, completado o bloqueado.
- Botón: “Iniciar”, “Continuar” o “Revisar”.

Criterios:

- [ ] La primera pantalla no muestra todas las semanas.
- [ ] Hay una acción dominante clara.
- [ ] Las tarjetas son legibles en móvil.

### 12.4 Vista Módulo

Debe mostrar:

- Panel lateral o panel superior en móvil.
- Lista de semanas del módulo.
- Estado por semana.
- Progreso del módulo.
- Objetivo del módulo.
- Botón “← Todos los módulos”.
- Acceso a recursos del módulo.

Criterios:

- [ ] La semana activa se identifica visualmente.
- [ ] En móvil el panel no bloquea el contenido.
- [ ] Se puede navegar sin scroll lateral.

### 12.5 Vista Semana

Debe mostrar:

- Título de semana.
- Objetivo.
- Entregable.
- Tiempo estimado.
- Progreso: “Paso X de Y”.
- Secuencia de unidades.
- Botón para ir a la unidad actual.

Criterios:

- [ ] La semana no despliega todo el contenido de una vez.
- [ ] La persona sabe cuántos pasos faltan.
- [ ] El enlace directo a una semana funciona.

### 12.6 Vista Unidad

Debe mostrar solo una unidad por pantalla.

Componentes comunes:

- Breadcrumb.
- Indicador de módulo, semana y paso.
- Título de unidad.
- Tipo de unidad con badge.
- Contenido principal.
- Botón anterior.
- Botón siguiente / guardar / declarar completada.
- Acceso contextual al glosario.
- Acceso contextual al asistente si aplica.

Criterios:

- [ ] No hay scroll infinito.
- [ ] El botón principal está siempre visible o fácilmente accesible.
- [ ] Navegación teclado: Tab, Enter, Escape funcionan.
- [ ] Estados se guardan al avanzar.

### 12.7 Ruta de aprendizaje

Crear vista `#/ruta`:

- Trayectoria completa.
- Módulos 0–4.
- Semanas/unidades principales.
- Estado visual.
- Ruta recomendada resaltada.
- Enlaces directos.

Criterios:

- [ ] La persona puede ver todo el mapa sin quedar obligada a navegarlo linealmente.
- [ ] Cada semana enlaza a su vista.
- [ ] La ruta del diagnóstico aparece resaltada.

### 12.8 Legacy anchors

- Implementar `legacyRoutes.js`.
- Registrar todos los mappings en `docs/MAPA_LEGACY_ANCHORS.md`.
- Si una ancla no puede mapearse, llevar a la vista más cercana y documentar.

Criterios:

- [ ] Ningún enlace histórico conocido queda roto.
- [ ] Recargar rutas hash no produce 404.

---

## 13. Fase 3 — Autodiagnóstico ampliado, algoritmo de clasificación, rutas y personalización

> **Rama:** `fase-3-diagnostico-algoritmo-rutas`
>
> **Propósito:** convertir el Módulo 0 en un motor real de orientación. Esta fase es funcionalmente crítica: si el filtro clasifica mal, el resto de la experiencia modular pierde precisión.

### 13.1 Cambio de alcance de la Fase 3

El diagnóstico actual de tres preguntas no es suficiente para recomendar con precisión por dónde iniciar. Antigravity debe implementar un autodiagnóstico ampliado con al menos **15 preguntas activas**; se recomienda implementar las **20 preguntas base** definidas en la sección 8.7.

El diagnóstico debe recopilar información sobre:

1. Competencias digitales.
2. Alfabetización en IA.
3. Acceso a tecnologías.
4. Claridad en el uso o beneficios de IA para emprendimientos y MiPYMES.
5. Contexto, etapa y madurez de la empresa.

La salida del diagnóstico debe orientar:

- módulo inicial recomendado;
- secuencia de módulos recomendada;
- senda de acompañamiento: guiada, acelerada o profunda;
- ayudas activas: glosario, nivelación, checklists, test-out;
- primer paso concreto;
- justificación visible para la persona usuaria.

### 13.2 Implementar instrumento por bloques

Implementar Módulo 0 como formulario secuencial, una pregunta o grupo breve por pantalla.

#### Bloque A — Competencias digitales de la persona gestora

Incluye preguntas q01–q04. Mide autonomía digital, manejo de archivos, uso de herramientas, creación de cuentas, seguridad básica y resolución de problemas digitales.

#### Bloque B — Alfabetización en IA

Incluye preguntas q05–q08. Mide experiencia previa con IA generativa, prompting, verificación, reconocimiento de errores, sesgos, privacidad y Human-in-the-Loop.

#### Bloque C — Acceso a tecnologías

Incluye preguntas q09–q11. Mide conectividad, dispositivo, posibilidad de ingresar a herramientas externas y condiciones materiales para completar actividades.

#### Bloque D — Claridad en el uso o beneficios de IA

Incluye preguntas q12–q15. Mide si la persona identifica problemas reales del negocio, tareas repetitivas, oportunidades de ventas/comunicación/datos y si distingue entre adopción útil y adopción por moda.

#### Bloque E — Contexto y madurez de la empresa

Incluye preguntas q16–q20 y q21 opcional. Mide etapa del negocio, claridad de oferta, cliente, validación con evidencia, registro de datos, urgencia principal y tiempo disponible.

Criterios:

- [ ] Hay al menos 15 preguntas activas; recomendado: 20 base + 1 opcional.
- [ ] El diagnóstico muestra barra de avance.
- [ ] Se puede retroceder sin perder respuestas.
- [ ] Las respuestas incompletas se guardan localmente.
- [ ] El diagnóstico puede retomarse si la persona abandona a mitad.
- [ ] No solicita datos sensibles.
- [ ] El asistente del curso permanece desactivado durante el diagnóstico.

### 13.3 Implementar algoritmo de clasificación

Crear `assets/js/clasificador.js` y `contenido/diagnostico-reglas.json`.

El algoritmo debe:

1. Leer preguntas desde `diagnostico-preguntas.json`.
2. Validar respuestas requeridas.
3. Calcular puntajes 0–100 por dimensión: `CD`, `AIA`, `AT`, `CUB`, `CME`.
4. Aplicar reglas determinísticas para recomendar senda.
5. Aplicar reglas determinísticas para recomendar módulo inicial.
6. Ordenar módulos recomendados.
7. Estimar confianza de clasificación: alta, media o baja.
8. Generar justificación visible.
9. Guardar todo en `localStorage["cajaIA.estado.v3"]`.

Criterios:

- [ ] La clasificación es reproducible: mismas respuestas producen mismo resultado.
- [ ] No usa IA externa ni llamadas a APIs.
- [ ] Las reglas están en JSON o en funciones documentadas, no dispersas en botones o HTML.
- [ ] La recomendación explica por qué se sugiere el módulo inicial.
- [ ] En casos de empate, muestra dos rutas posibles y permite escoger.
- [ ] En casos de baja confianza, recomienda revisar respuestas o iniciar por Módulo 0/Módulo 1.

### 13.4 Reglas de recomendación de módulos

Implementar las reglas base de la sección 8.10.

Criterios específicos:

- [ ] Si la persona tiene idea o emprendimiento inicial sin validación, el sistema prioriza Módulo 1.
- [ ] Si el negocio ya opera, pero tiene baja organización de datos/procesos, prioriza Módulo 2.
- [ ] Si existe alta carga repetitiva y suficiente acceso/competencia digital, prioriza Módulo 3.
- [ ] Si la urgencia es vender, comunicar o decidir con datos, prioriza Módulo 4.
- [ ] Si hay baja competencia digital o baja alfabetización en IA, activa nivelación y senda guiada.
- [ ] Si hay bajo acceso tecnológico, no recomienda automatización como primer paso.
- [ ] El sistema nunca bloquea módulos no recomendados; solo los marca como “también disponibles”.

### 13.5 Reglas de senda de acompañamiento

Además de la ruta temática por módulo, aplicar una **senda de acompañamiento**:

| Senda | Perfil | Comportamiento |
|---|---|---|
| Guiada | Baja competencia digital, baja alfabetización IA o bajo acceso tecnológico | Más glosario, pasos pequeños, mensajes de apoyo, nivelación y advertencias antes de herramientas externas |
| Acelerada | Maneja tecnología, pero todavía no domina IA | Checklists colapsables, test-out de pasos básicos, foco en conceptos IA y verificación |
| Profunda | Ya usa tecnología e IA con criterio | Acceso directo a retos avanzados, ROI, automatización, prefactibilidad, datos y teoría avanzada |

Criterios:

- [ ] La senda no oculta contenido permanentemente.
- [ ] Se puede cambiar la senda en cualquier momento.
- [ ] La senda modifica navegación, ayudas y recomendaciones, no el fondo del contenido.
- [ ] Si el usuario cambia la senda manualmente, el sistema conserva la recomendación original como referencia.

### 13.6 Resultado del diagnóstico en pantalla

Al finalizar, mostrar una tarjeta de resultado con:

- “Le recomendamos iniciar por…”
- Módulo inicial.
- Secuencia recomendada.
- Senda asignada.
- Razones principales.
- Primer botón de acción.
- Opción “Cambiar ruta”.
- Opción “Ver todo el programa”.
- Opción “Repetir diagnóstico”.

Ejemplo:

```text
Le recomendamos iniciar por Módulo 2: Radiografía del negocio con IA.

¿Por qué?
1. Su negocio ya está operando.
2. Usted indicó que registra información de forma parcial.
3. Antes de automatizar o vender con IA, conviene ordenar procesos y datos.

Senda sugerida: Acelerada.
Primer paso: iniciar Semana 1 del Módulo 2.
```

Criterios:

- [ ] La persona entiende por qué se le recomienda una ruta.
- [ ] El botón principal lleva al módulo o unidad inicial correcta.
- [ ] El panel de inicio queda configurado con esa ruta.
- [ ] La recomendación se mantiene al cerrar y volver al sitio.

### 13.7 Test-out y compresión de contenidos básicos

Implementar declaración de competencias, alimentada por respuestas del diagnóstico y editable manualmente:

- Cuentas básicas.
- Seguridad y 2FA.
- Uso básico de chatbot.
- Prompting básico.
- No-code básico.
- Registro básico de datos.

Criterios:

- [ ] El usuario puede marcar competencias ya adquiridas.
- [ ] El sistema puede sugerir test-out según puntajes.
- [ ] Los contenidos básicos quedan comprimidos, no eliminados.
- [ ] El progreso refleja lo declarado sin falsificar actividades aplicadas.

### 13.8 Validación interna del algoritmo

Antes de cerrar la fase, crear al menos cinco casos sintéticos de prueba en `docs/CASOS_DIAGNOSTICO.md`:

| Caso | Perfil esperado | Módulo esperado | Senda esperada |
|---|---|---|---|
| Caso 1 | Persona sin competencias digitales y sin IA | M0/M1 | Guiada |
| Caso 2 | Idea inicial sin validación | M1 | Guiada o Acelerada |
| Caso 3 | Negocio operando con datos desordenados | M2 | Acelerada |
| Caso 4 | Negocio con tareas repetitivas y buena base digital | M3 | Acelerada o Profunda |
| Caso 5 | Empresa con uso previo de IA y necesidad comercial | M4 | Profunda |

Criterios:

- [ ] Los cinco casos producen resultados esperados.
- [ ] Los empates se resuelven de forma documentada.
- [ ] Se documentan límites del algoritmo en `docs/LIMITACIONES_DIAGNOSTICO.md`.

---

## 14. Fase 4 — Evidencias, portafolio, credenciales y motivación

> **Rama:** `fase-4-portafolio-credenciales`
>
> **Propósito:** cerrar el ciclo evidencia → autoevaluación → portafolio → reconocimiento.

### 14.1 Campos de evidencia por unidad

En unidades `reto`, `hacer` y `compartir`:

- URL de evidencia.
- Nota descriptiva.
- Registro opcional de archivo local.
- Advertencia de privacidad.
- Estado visual: guardado, pendiente, error local.

Criterios:

- [ ] La evidencia se guarda localmente.
- [ ] La persona puede editarla.
- [ ] Se informa claramente que no hay carga institucional en V1.

### 14.2 Portafolio

Crear `#/portafolio` con:

- Evidencias por módulo.
- Evidencias por semana.
- Estado de autoevaluación.
- Exportar portafolio como JSON.
- Exportar resumen imprimible.

Criterios:

- [ ] El usuario ve todas sus evidencias.
- [ ] Puede exportar respaldo.
- [ ] El portafolio no expone datos sensibles por defecto.

### 14.3 Rúbrica y autoevaluación

La unidad `rubrica` debe permitir:

- Seleccionar nivel por criterio.
- Guardar autoevaluación.
- Declarar semana completada.
- Desbloquear siguiente semana si aplica.

Criterios:

- [ ] La semana solo llega a 100% al declarar rúbrica completada o al criterio definido.
- [ ] La autoevaluación queda en el portafolio.

### 14.4 Microcredenciales locales

En V1, implementar reconocimientos locales:

- Módulo iniciado.
- Primera evidencia registrada.
- Semana completada.
- Módulo completado.
- Ruta completada.

Criterios:

- [ ] El reconocimiento es motivacional, no certificación formal.
- [ ] El texto evita prometer acreditación oficial si no existe proceso institucional.

### 14.5 Credencial formal futura

Crear sección `#/credenciales` con dos niveles:

1. **Reconocimientos locales de avance.** Funcionan en V1.
2. **Credencial institucional.** Requiere revisión y backend/proceso externo. Explicar requisitos.

---

## 15. Fase 5 — Biblioteca, recursos externos y asistente

> **Rama:** `fase-5-biblioteca-asistente`
>
> **Propósito:** evitar que la persona se pierda al salir hacia recursos externos.

### 15.1 Biblioteca interna

Crear `#/biblioteca` con filtros:

- Módulo.
- Semana.
- Tipo: video, plantilla, formulario, herramienta, lectura, rúbrica, Padlet.
- Nivel: básico, intermedio, avanzado.
- Recurso obligatorio/opcional.

Criterios:

- [ ] Todos los recursos están catalogados.
- [ ] Cada recurso tiene título, descripción, URL, módulo y semana.
- [ ] Recursos externos abren en nueva pestaña.

### 15.2 Migajas de retorno

Donde haya recursos internos o páginas auxiliares:

- Mostrar “← Volver a la semana”.
- Mantener contexto de módulo/semana.
- Registrar último recurso visitado si aplica.

Criterios:

- [ ] El usuario puede volver en un clic.
- [ ] No queda varado en plantillas o rúbricas.

### 15.3 Padlet o compartir estructurado

- No usar un único muro indiferenciado.
- Crear secciones por semana o enlaces diferenciados por consigna.
- Si se conserva un solo Padlet, añadir instrucciones claras de etiqueta: `M1-S1`, `M2-S3`, etc.

Criterios:

- [ ] La actividad Compartir queda trazable por semana.
- [ ] Hay recordatorio de privacidad.

### 15.4 Asistente del curso

Mantener el asistente actual con reglas:

- No activo durante autodiagnóstico.
- Disponible en unidades `reto` y `hacer`.
- Puede ofrecer sugerencias contextuales.
- Debe recordar que no sustituye el criterio humano ni la revisión ética.
- Debe reforzar privacidad y anonimización.

Criterios:

- [ ] El asistente no influye en respuestas del diagnóstico.
- [ ] En Reto/Hacer aparece con contexto de la unidad.
- [ ] No bloquea navegación móvil.

---

## 16. Fase 6 — Accesibilidad, móvil, rendimiento y SEO

> **Rama:** `fase-6-a11y-mobile-seo`
>
> **Propósito:** cerrar calidad técnica antes de la validación con usuarios.

### 16.1 Infografías accesibles

Para cada infografía:

- Renombrar sin espacios.
- Mantener imagen original.
- Crear `alt` significativo.
- Crear transcripción HTML.
- Asociar transcripción a la unidad correspondiente.

Criterios:

- [ ] El contenido de infografías es buscable.
- [ ] Lector de pantalla accede a contenido equivalente.
- [ ] No hay imágenes de texto sin alternativa.

### 16.2 Tablas responsivas

- Convertir tablas anchas en tarjetas en móvil.
- Mantener tabla en desktop si es legible.
- Usar encabezados semánticos.

Criterios:

- [ ] 360 px sin scroll horizontal.
- [ ] Tablas leíbles con lector de pantalla.

### 16.3 Microinteracciones accesibles

- Foco visible.
- Skip link.
- Estados `aria-current`, `aria-expanded`, `aria-live`.
- Contraste suficiente.
- Tamaño táctil mínimo.

Criterios:

- [ ] Navegación completa sin mouse.
- [ ] No hay trampas de foco.

### 16.4 Metadatos

Corregir:

- `canonical`.
- `og:url`.
- `og:title`.
- `og:description`.
- `twitter:card`.
- Sitemap si aplica.

URL correcta:

```text
https://agmelendez.github.io/cajadeherramientasparaemprendedores/
```

Criterios:

- [ ] Compartir el sitio genera tarjeta correcta.
- [ ] No apunta a URL anterior o inconsistente.

---

## 17. Fase 7 — Validación con usuarios y ajuste final

> **Rama:** `fase-7-validacion-ajustes`
>
> **Propósito:** confirmar con usuarios reales que bajó la desorientación.

### 17.1 Prueba mínima

Reclutar 9 personas:

- 3 Rol 1: cero tecnología / cero IA.
- 3 Rol 2: tecnología sí / IA no.
- 3 Rol 3: tecnología + algo de IA.

### 17.2 Tareas a observar

1. Entrar al sitio y encontrar por dónde iniciar.
2. Completar diagnóstico ampliado.
3. Interpretar ruta sugerida y razones de clasificación.
4. Cambiar manualmente la ruta recomendada si lo desea.
4. Iniciar una semana.
5. Completar una unidad Reto.
6. Guardar evidencia por URL o nota.
7. Usar glosario.
8. Abrir un recurso externo y volver.
9. Cerrar navegador y retomar.
10. Encontrar portafolio.

### 17.3 Métricas

- Tasa de éxito.
- Tiempo por tarea.
- Número de momentos “no sé dónde estoy”.
- Número de abandonos.
- SUS ≥ 75 por perfil.
- Retomar lección correcta en máximo 2 clics.

### 17.4 Criterios de aceptación final

- [ ] Ningún perfil queda sistemáticamente perdido.
- [ ] Rol 1 puede retomar en ≤ 2 clics.
- [ ] Rol 2 puede saltar lo básico sin perder acceso.
- [ ] Rol 3 encuentra contenido avanzado en ≤ 3 clics.
- [ ] SUS promedio ≥ 75.
- [ ] H1–H4 bajan de severidad 4 a severidad ≤ 2 en reevaluación heurística.

---

## 18. Qué preservar intacto

No alterar en sustancia:

- Ciclo RHEC.
- Modelo CIFRCE.
- Human-in-the-Loop.
- Ley 8968.
- Regla 70/30.
- Principio “primero el proceso, después la IA”.
- Rúbrica analítica de cuatro criterios.
- Matriz de alineación pedagógica.
- Privacidad, anonimización y transparencia.
- Enfoque aplicado a MiPYMES.
- Identidad institucional UCR / CIOdD / DIPROVID.
- Enlaces y recursos externos, salvo corrección documentada de enlaces rotos.

---

## 19. Qué sí puede cambiar

Puede cambiarse:

- Arquitectura de navegación.
- Orden visual de presentación.
- Separación en módulos/semanas/unidades.
- Microcopia de botones.
- Tarjetas de inicio.
- Forma de mostrar la rúbrica.
- Forma de mostrar RHEC.
- Nombres visibles de módulos según especificaciones.
- Transcripciones de infografías.
- Diseño responsivo.
- Componentes de progreso.
- Sistema de rutas.
- Organización de recursos.

Todo cambio debe estar documentado.

---

## 20. Convenciones de desarrollo

- Una rama por fase.
- Un PR por fase.
- Commits convencionales:
  - `feat:` nueva funcionalidad.
  - `refactor:` reorganización sin cambiar comportamiento.
  - `fix:` corrección.
  - `docs:` documentación.
  - `a11y:` accesibilidad.
  - `perf:` rendimiento.
  - `content:` migración o ajuste de contenido aprobado.
- No hacer force-push en ramas compartidas.
- Mantener `main` siempre desplegable.
- Registrar decisiones en `docs/DECISIONES_ARQUITECTURA.md`.
- Registrar limitaciones en `docs/LIMITACIONES_V1_ESTATICA.md`.
- Registrar cambios de lenguaje en `docs/CAMBIOS_DE_LENGUAJE.md`.

---

## 21. Matriz de pruebas de aceptación

| # | Prueba | Resultado esperado | Fase |
|---|---|---|---|
| T01 | Abrir home en móvil | Tarjetas legibles, sin scroll horizontal | 2 |
| T02 | Iniciar diagnóstico | Aparece el instrumento por bloques, no todo el formulario | 3 |
| T03 | Completar diagnóstico ampliado | Se calculan puntajes por dimensión y ruta sugerida persistente | 3 |
| T04 | Volver al home | Se muestra ruta y botón Continuar | 3 |
| T05 | Abrir Módulo 1 | Se ve lista de semanas y progreso | 2 |
| T06 | Abrir semana | Se ve objetivo, entregable y paso actual | 2 |
| T07 | Avanzar unidad | Solo aparece una unidad por pantalla | 2 |
| T08 | Completar unidad Reto | Se guarda estado y evidencia | 4 |
| T09 | Completar rúbrica | Semana pasa a 100% | 4 |
| T10 | Cerrar y volver | Retoma última unidad | 2/3 |
| T11 | Abrir glosario | Definición accesible por teclado | 1/2 |
| T12 | Usar ancla antigua | Redirige a nueva ruta | 2 |
| T13 | Abrir recurso externo | Abre en pestaña nueva y hay retorno | 5 |
| T14 | Abrir portafolio | Evidencias se listan por módulo/semana | 4 |
| T15 | Exportar progreso | Descarga JSON válido | 4 |
| T16 | Navegar sin mouse | Toda la secuencia es usable | 6 |
| T17 | Lector de pantalla | Orden semántico correcto | 6 |
| T18 | Compartir URL | Open Graph/canonical correctos | 6 |
| T19 | Lighthouse móvil | Accessibility ≥ 90; Best Practices ≥ 90; Performance ≥ 80 | 6 |
| T20 | Validación usuario Rol 1 | Retoma en ≤ 2 clics | 7 |
| T21 | Validación usuario Rol 2 | Test-out reduce pasos básicos | 7 |
| T22 | Validación usuario Rol 3 | Encuentra ruta profunda rápido | 7 |
| T23 | Caso sintético diagnóstico: idea sin validación | Recomienda Módulo 1 y justifica por validación insuficiente | 3 |
| T24 | Caso sintético diagnóstico: baja tecnología | Activa senda guiada y no recomienda automatización como primer paso | 3 |
| T25 | Repetir diagnóstico | Actualiza puntajes, ruta y panel sin borrar progreso previo | 3 |

---

## 22. Pruebas específicas de GitHub Pages

Además de la matriz general, antes de entregar V1 Antigravity debe ejecutar estas pruebas en la URL publicada o preview de Pages:

| Prueba | Procedimiento | Resultado esperado |
|---|---|---|
| Ruta raíz | Abrir la URL base del repo | Carga `index.html` sin errores |
| Ruta con hash | Abrir `/#/inicio` | Muestra pantalla de inicio |
| Deep link | Abrir `/#/unidad/m1-s1/u03` directamente | Reconstruye la unidad correcta |
| Recarga | Recargar estando en una unidad | No hay 404; se conserva la vista |
| Subcarpeta | Revisar network paths | No hay solicitudes fallidas por usar `/assets` en vez de rutas relativas |
| JSON | Verificar carga de `contenido/*.json` | HTTP 200 y MIME correcto |
| Anclas antiguas | Abrir `#m1-s1`, `#t1-s1`, etc. | Redirigen a hash route nueva |
| Sin localStorage | Bloquear almacenamiento del navegador | El sitio funciona con aviso de no persistencia |
| Sin conexión parcial | Simular falla de un recurso externo | El sitio no se cae; muestra mensaje de recurso no disponible |
| Móvil GitHub Pages | Abrir desde teléfono o emulación 360px | Sin scroll horizontal ni solapamientos |

Criterio duro: una funcionalidad que funciona en `localhost` pero falla en GitHub Pages **no está terminada**.

---

## 23. Backlog V2 con backend

No implementar en V1 salvo que el repositorio ya tenga infraestructura real.

| Función | Motivo para V2 |
|---|---|
| Login de usuarios | Requiere autenticación y gestión de datos personales |
| Base de datos de progreso | Requiere backend o servicio externo |
| Carga real de archivos | GitHub Pages no guarda archivos |
| Panel administrativo | Requiere permisos, autenticación y persistencia |
| Credencial institucional formal | Requiere validación, emisión y trazabilidad |
| Analítica institucional | Requiere consentimiento y tratamiento de datos |
| Progreso multidispositivo | Requiere identidad de usuario |

---

## 23. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Pérdida de contenido al migrar a JSON | Alto | `content parity`, revisión manual y allowlist |
| Prometer carga de archivos sin backend | Alto | Implementar solo URL/notas/local y explicar limitación |
| Romper enlaces ya distribuidos | Alto | `legacyRoutes.js` y pruebas de anclas |
| Sobrecargar V1 con funciones de plataforma completa | Alto | Separar V1 estática y V2 backend |
| Usar rutas limpias que producen 404 en Pages | Alto | Usar hash routing como estándar V1 |
| Usar rutas absolutas que fallan en subcarpeta | Alto | Usar rutas relativas y pruebas en URL real |
| Poner API keys en JavaScript público | Crítico | No usar claves en V1; mover a V2 con backend |
| Depender de archivos excluidos por Jekyll | Medio | Agregar `.nojekyll` o configurar explícitamente |
| Cambiar demasiado el lenguaje pedagógico | Medio | Cambiar microcopia; documentar cambios sustantivos |
| Bajo rendimiento por JSON grande | Medio | Cargar datos por módulo o lazy loading si hace falta |
| Algoritmo de diagnóstico clasifica mal | Alto | Usar dimensiones ponderadas, casos sintéticos, revisión experta y justificación visible |
| Preguntas diagnósticas no discriminan suficientemente | Alto | Usar mínimo 15 preguntas, recomendado 20, validar con usuarios y ajustar pesos |
| La persona interpreta la recomendación como obligación | Medio | Mostrar opción de cambiar ruta y ver todo el programa |
| Accesibilidad débil en acordeones/tooltips | Medio | ARIA, pruebas teclado y axe |
| Usuario avanzado percibe curso básico | Medio | Senda profunda y acceso a módulos avanzados |
| Usuario principiante abandona en automatización | Alto | Peldaños intermedios y senda guiada |

---

## 24. Entregables esperados por fase

| Fase | Entregables |
|---|---|
| Fase 0 | Inventarios, línea base, scripts, mapa de migración |
| Fase 1 | Progreso mínimo, glosario, rúbrica única, RHEC colapsable |
| Fase 2 | App shell, router, JSON, vistas Inicio/Módulo/Semana/Unidad |
| Fase 3 | Autodiagnóstico ampliado, mínimo 15 preguntas, algoritmo de clasificación, ruta sugerida, sendas y test-out |
| Fase 4 | Evidencias locales, portafolio, autoevaluación y reconocimientos |
| Fase 5 | Biblioteca, recursos externos, Padlet estructurado y asistente contextual |
| Fase 6 | Accesibilidad, móvil, transcripciones, SEO y rendimiento |
| Fase 7 | Validación con usuarios, ajustes y cierre |

---

## 26. Prompt operativo corto para Antigravity

Usar este resumen si se necesita dar una instrucción inicial breve al agente:

> Refactorice el repositorio de la Caja de Herramientas de IA para MiPYMES desde una página monolítica hacia una SPA estática modular estrictamente compatible con GitHub Pages. Use arquitectura `Inicio → Módulo → Semana → Unidad de contenido`, con una sola unidad visible por pantalla. Use `hash routing`, rutas relativas, `index.html` como app shell, contenido JSON estático, `.nojekyll` si no se usa Jekyll y progreso local en `localStorage`. No use backend, base de datos, login, carga real de archivos, API keys en cliente ni rutas limpias dependientes del servidor. Sustituya el autodiagnóstico débil de tres preguntas por un instrumento ampliado de al menos 15 preguntas, recomendado 20, cargado desde JSON, con dimensiones de competencias digitales, alfabetización en IA, acceso tecnológico, claridad de uso de IA y contexto empresarial. Implemente un algoritmo determinístico client-side que calcule puntajes por dimensión y recomiende módulo inicial, secuencia de módulos, senda de acompañamiento, test-out y ayudas activas, mostrando justificación visible. Implemente glosario, biblioteca de recursos, portafolio local de evidencias y accesibilidad WCAG 2.1 AA. No elimine contenido ni funcionalidades. Mantenga identidad UCR/CIOdD/DIPROVID, preserve RHEC/CIFRCE/HITL/70-30 y documente toda migración con pruebas de paridad de contenido, casos sintéticos del algoritmo y pruebas en la URL real de GitHub Pages.

---

## 27. Anexo A — Mapa de hallazgos a fases

| Hallazgo | Descripción | Fase principal |
|---|---|---|
| H1 | Página única monolítica | 2 |
| H2 | Sin estado ni progreso | 1–2 |
| H3 | Recursos externos fragmentados | 5 |
| H4 | Curva de dificultad discontinua | 3 |
| H5 | Numeración doble | 1–2 |
| H6 | Rúbrica repetida | 1–2 |
| H7 | Vocabulario sin glosario | 1 |
| H8 | Diagnóstico sin persistencia | 3 |
| H9 | Sin rutas diferenciadas/test-out | 3 |
| H10 | Texto encerrado en infografías | 6 |
| H11 | Tablas no responsivas | 6 |
| H12 | Padlet único indiferenciado | 5 |
| H13 | Sin tiempo estimado | 1–2 |
| H14 | Credencial sin circuito visible | 4 |
| H15 | Metadatos inconsistentes | 6 |

---

## 28. Anexo B — Checklist de PR

Cada PR debe responder:

- [ ] ¿Qué fase implementa?
- [ ] ¿Qué hallazgos cierra?
- [ ] ¿Qué archivos se movieron?
- [ ] ¿Qué contenido cambió de ubicación?
- [ ] ¿Hubo cambios de redacción?
- [ ] ¿Está actualizada la allowlist de paridad?
- [ ] ¿Se probaron rutas antiguas?
- [ ] ¿Se probó móvil 360 px?
- [ ] ¿Se probó navegación por teclado?
- [ ] ¿Se corrió Lighthouse?
- [ ] ¿Se corrió axe?
- [ ] ¿Se verificaron enlaces externos?
- [ ] ¿Qué queda pendiente?

---

## 29. Anexo C — Mensajes de interfaz recomendados

| Contexto | Texto recomendado |
|---|---|
| Botón inicial | Continuar |
| Sin progreso | Realizar diagnóstico |
| Módulo nuevo | Iniciar módulo |
| Módulo en curso | Continuar módulo |
| Unidad pasiva | Siguiente |
| Reto | Marcar como completado y continuar |
| Práctica | Guardar y continuar |
| Compartir | Marqué como compartido y continuar |
| Rúbrica | Declarar semana completada |
| Fin de módulo | Completado: volver al programa |
| Evidencia local | La evidencia se guarda en este navegador. Para conservarla fuera de este dispositivo, use un enlace externo. |
| Privacidad | No incluya datos personales o identificables de clientes. |
| Diagnóstico | Sus respuestas orientan la ruta; puede cambiarla después. |
| Asistente desactivado | El asistente no está disponible durante el diagnóstico para no influir en sus respuestas. |


---

## 30. Anexo D — Instrumento diagnóstico v2.2 para implementar en JSON

Este anexo resume el instrumento mínimo que debe quedar operativo en `contenido/diagnostico-preguntas.json`.

| ID | Dimensión | Pregunta abreviada | Escala |
|---|---|---|---|
| q01 | CD | Uso de correo, formularios, hojas de cálculo o herramientas digitales | 0–4 |
| q02 | CD | Crear, guardar, buscar y compartir archivos digitales | 0–4 |
| q03 | CD | Crear cuentas y activar seguridad/2FA | 0–4 |
| q04 | CD | Resolver problemas digitales buscando instrucciones | 0–4 |
| q05 | AIA | Uso previo de IA generativa | 0–4 |
| q06 | AIA | Capacidad de formular prompts útiles | 0–4 |
| q07 | AIA | Verificación de respuestas de IA | 0–4 |
| q08 | AIA | Reconocimiento de riesgos, errores, sesgos y privacidad | 0–4 |
| q09 | AT | Acceso estable a Internet | 0–4 |
| q10 | AT | Dispositivo suficiente para trabajar | 0–4 |
| q11 | AT | Posibilidad de usar herramientas externas | 0–4 |
| q12 | CUB | Problema claro del negocio a resolver con IA | 0–4 |
| q13 | CUB | Identificación de tareas repetitivas | 0–4 |
| q14 | CUB | Uso posible en ventas, comunicación, clientes o datos | 0–4 |
| q15 | CUB | Diferencia entre IA útil e IA por moda | 0–4 |
| q16 | CME | Etapa del emprendimiento/empresa | Categórica ponderada |
| q17 | CME | Claridad de oferta, cliente y propuesta de valor | 0–4 |
| q18 | CME | Validación con evidencia real | 0–4 |
| q19 | CME | Registro ordenado de ventas, costos, clientes o procesos | 0–4 |
| q20 | CME | Urgencia principal del negocio | Categórica ponderada |
| q21 | CME | Tiempo semanal disponible | Categórica, opcional |

Categorización sugerida de q20:

| Opción | Peso principal | Recomendación probable |
|---|---|---|
| Validar si la idea/producto tiene mercado | M1 | Validar antes de invertir |
| Entender qué está fallando o qué mejorar primero | M2 | Radiografía del negocio con IA |
| Ahorrar tiempo y reducir tareas repetitivas | M3 | Ordenar y automatizar procesos |
| Mejorar ventas, comunicación o clientes | M4 | Comunicar, vender y decidir con datos |
| Revisar costos, precios o viabilidad | M4 + M2 | Decidir con datos, previo diagnóstico |

Regla de presentación: el diagnóstico no debe mostrar puntajes técnicos como si fueran una calificación del usuario. Debe traducirlos en orientación práctica: “le conviene iniciar por…”, “conviene activar ayudas…”, “puede omitir pasos básicos si ya domina…”.

---

## 31. Anexo E — Referencias técnicas para GitHub Pages

Estas referencias orientan decisiones técnicas del plan:

- GitHub Pages publica archivos HTML, CSS y JavaScript desde un repositorio y puede ejecutar un proceso de build estático antes de publicar.
- GitHub Pages no soporta lenguajes de servidor como PHP, Ruby o Python.
- Si se usa una fuente por rama/carpeta, el archivo de entrada debe ser `index.html`, `index.md` o `README.md` en la raíz de la fuente de publicación.
- GitHub Pages puede publicar archivos estáticos directamente o mediante generadores estáticos; si no se desea Jekyll, se debe considerar `.nojekyll`.
- GitHub Pages tiene límites de tamaño, tiempo de build y uso; por eso conviene optimizar imágenes y no alojar multimedia pesada directamente en el repositorio.

---

## 31. Cierre

Este plan v2.1 integra la auditoría UX y las especificaciones de plataforma. La corrección principal es pasar de una refactorización por “lecciones” a una experiencia de **unidades de contenido secuenciales**, sin perder el marco pedagógico. La V1 debe ser estática y realista; la V2 puede convertirse en plataforma con usuarios, base de datos y credenciales formales si la institución decide avanzar a ese nivel.

**Fin del documento v2.1.**
