# Plan maestro de correcciones para Antigravity  
## Auditoría e implementación del sitio “Caja de Herramientas de Inteligencia Artificial para la MiPYME”

**Sitio objetivo:** https://agmelendez.github.io/cajadeherramientasparaemprendedores/  
**Propósito del archivo:** instruir a Antigravity para aplicar, de forma integral, las correcciones pedagógicas, técnicas, éticas, de accesibilidad y de gobernanza identificadas en la auditoría.  
**Resultado esperado:** una versión del sitio más robusta, auditable, accesible, institucionalmente clara y alineada con cursos autogestionados abiertos en HTML/GitHub.

---

## 0. Rol que debe asumir Antigravity

Actuá como un **agente de refactorización pedagógica, técnica y UX**. No te limites a corregir redacción. Debés intervenir el sitio para que funcione como un curso autogestionado abierto, con:

1. Objetivos de aprendizaje medibles.
2. Rúbricas por entregable.
3. Evidencias verificables por semana.
4. Política clara de uso de IA.
5. Protocolo de privacidad y anonimización de datos.
6. Accesibilidad WCAG 2.2 AA como meta.
7. Mejor arquitectura de información.
8. Gobernanza institucional más clara.
9. Mejor trazabilidad de credenciales.
10. Textos pedagógicos consistentes con aprendizaje adulto, aplicado y crítico.

---

## 1. Principios de implementación

### 1.1. Mantener lo que ya funciona

No eliminar estos elementos, porque son fortalezas del sitio:

- Modelo **70/30**: 70% práctica aplicada y 30% fundamento teórico.
- Ciclo **RHEC**: Reto, Hacer, Entender, Compartir.
- Modelo de prompting **CIFRCE**.
- Enfoque **Human-in-the-Loop**.
- Diagnóstico inicial adaptativo.
- Ruta por madurez del emprendimiento.
- Estructura por Toolkit 1, Módulo I, Módulo II y Módulo III.
- Enfoque de IA aplicada a negocio real.
- Lenguaje cercano para personas emprendedoras costarricenses.
- Identidad UCR / CIOdD / DIPROVID / Auge, siempre que quede correctamente delimitada.

### 1.2. No introducir complejidad innecesaria

El sitio debe seguir siendo estático, liviano y usable. Evitá frameworks pesados si no son necesarios.

Preferencias:

- HTML semántico.
- CSS modular.
- JavaScript vanilla.
- Componentes reutilizables simples.
- Sin dependencias innecesarias.
- Sin romper los anchors existentes.
- Sin eliminar contenido útil.

### 1.3. Lenguaje

Usar español claro, formal-cercano y contextualizado para Costa Rica.

Preferir:

- “persona emprendedora”
- “MiPYME”
- “negocio”
- “cliente”
- “datos personales”
- “validación humana”
- “evidencia”
- “criterio empresarial”
- “no subás datos sensibles”
- “vos decidís”

Evitar:

- jerga técnica innecesaria;
- promesas excesivas;
- tono publicitario exagerado;
- afirmaciones de certificación si no hay respaldo institucional formal;
- frases que sugieran que la IA sustituye el juicio humano.

---

## 2. Problemas detectados que deben corregirse

### 2.1. Problema P0: faltan objetivos de aprendizaje medibles

Actualmente el sitio presenta módulos, semanas y entregables, pero no formula objetivos de aprendizaje observables. Agregá objetivos generales del programa y objetivos específicos por módulo y semana.

### 2.2. Problema P0: faltan rúbricas

El sitio solicita entregables, pero no define criterios de calidad. Cada entregable debe tener una mini-rúbrica con niveles de desempeño.

### 2.3. Problema P0: privacidad insuficientemente operativizada

El sitio menciona Ley 8968 y protección de datos, pero varias actividades piden usar respuestas de clientes, CRM, chatbots o formularios. Se requiere un protocolo operativo de anonimización y consentimiento.

### 2.4. Problema P0: uso de “chain-of-thought” o “pensá paso a paso”

Reemplazar todas las instrucciones que pidan “razoná paso a paso”, “piensa paso a paso” o “chain-of-thought”. En su lugar, pedir:

- supuestos utilizados;
- datos faltantes;
- fórmula aplicada;
- riesgos de error;
- tabla verificable;
- justificación resumida;
- fuentes o criterios de validación.

### 2.5. Problema P0: credenciales no suficientemente blindadas

La sección de credenciales promete insignias y certificados. Debe aclararse que están en fase de diseño y sujetas a validación institucional, rúbricas y evidencias.

### 2.6. Problema P1: arquitectura muy concentrada en una sola página

Si el proyecto permite multiarchivo, modularizar en páginas o componentes. Si no, al menos mejorar navegación, anchors, índice, cards, botones de avance y secciones colapsables.

### 2.7. Problema P1: comunidad no resuelta

Definir dónde se comparte evidencia: WhatsApp, foro, GitHub Discussions, Google Classroom, Moodle u otro medio. Si aún no existe, dejarlo como “espacio de comunidad definido por la coordinación del programa”.

### 2.8. Problema P1: biblioteca institucional ambigua

Separar recursos oficiales, recursos experimentales y recursos externos. No mezclar asistentes de OMIPYMES UNED o recursos en migración con recursos institucionales UCR sin aclaración.

### 2.9. Problema P1: accesibilidad no verificable

Agregar mejoras de accesibilidad y una declaración visible:

- alt text real;
- contraste suficiente;
- navegación por teclado;
- foco visible;
- estructura h1-h6 correcta;
- etiquetas aria solo donde sean necesarias;
- formularios con labels;
- botones accesibles;
- no depender solo de color o íconos.

### 2.10. Problema P2: falta documentación abierta

Agregar o crear:

- README.md;
- CHANGELOG.md;
- LICENSE.md;
- CONTRIBUTING.md;
- carpeta `/templates`;
- carpeta `/rubricas`;
- carpeta `/politicas`;
- carpeta `/assets`.

---

## 3. Cambios estructurales recomendados

### 3.1. Estructura ideal del proyecto

Si el sitio actualmente está en un solo `index.html`, mantenelo funcionando, pero organizá el repositorio así:

```text
/
├── index.html
├── README.md
├── CHANGELOG.md
├── LICENSE.md
├── CONTRIBUTING.md
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── diagnostico.js
│   └── accesibilidad.js
├── assets/
│   ├── logos/
│   ├── icons/
│   └── images/
├── templates/
│   ├── plantilla-foda.md
│   ├── plantilla-ivu.md
│   ├── plantilla-business-model-canvas.md
│   ├── plantilla-buyer-persona.md
│   ├── plantilla-consentimiento-clientes.md
│   ├── plantilla-crm-basico.md
│   ├── plantilla-prefactibilidad.md
│   └── plantilla-campana-aida.md
├── rubricas/
│   ├── rubrica-general-entregables.md
│   ├── rubrica-toolkit-preoperativo.md
│   ├── rubrica-modulo-diagnostico.md
│   ├── rubrica-modulo-automatizacion.md
│   └── rubrica-modulo-comercializacion.md
└── politicas/
    ├── politica-uso-ia.md
    ├── protocolo-privacidad-datos.md
    ├── declaracion-accesibilidad.md
    └── gobernanza-recursos.md
```

Si no se desea dividir el sitio, al menos crear esos archivos como documentación complementaria y enlazarlos desde la Biblioteca de Recursos.

---

## 4. Nueva sección obligatoria: “Cómo usar este curso”

Insertar después de la introducción principal y antes de “Modelo de Aprendizaje Autogestionado”.

### Texto sugerido

```html
<section id="como-usar-curso" class="course-section">
  <h2>Cómo usar este curso</h2>
  <p>
    Esta caja de herramientas está diseñada para personas emprendedoras que necesitan aplicar la inteligencia artificial a problemas reales de su negocio, sin depender de horarios fijos ni de acompañamiento permanente.
  </p>

  <div class="info-grid">
    <article class="info-card">
      <h3>1. Iniciá con el diagnóstico</h3>
      <p>
        Antes de usar herramientas, completá el diagnóstico de entrada. Este paso te ayuda a decidir si debés comenzar en el Toolkit Pre-Operativo o avanzar directamente al Módulo I.
      </p>
    </article>

    <article class="info-card">
      <h3>2. Producí evidencias</h3>
      <p>
        Cada semana termina con un entregable. No se trata solo de leer o ver videos: debés producir una evidencia útil para tu negocio.
      </p>
    </article>

    <article class="info-card">
      <h3>3. Verificá antes de implementar</h3>
      <p>
        La IA puede sugerir, ordenar y acelerar, pero las decisiones finales deben revisarse con tu criterio empresarial, tus datos reales y tu conocimiento del cliente.
      </p>
    </article>

    <article class="info-card">
      <h3>4. Cuidá los datos</h3>
      <p>
        No ingresés nombres, teléfonos, correos, direcciones, datos bancarios, números de identificación ni información sensible de clientes en herramientas de IA abiertas o gratuitas.
      </p>
    </article>
  </div>
</section>
```

---

## 5. Nueva sección obligatoria: objetivos generales

Insertar después de “Cómo usar este curso”.

### Texto sugerido

```html
<section id="objetivos-aprendizaje" class="course-section">
  <h2>Objetivos de aprendizaje</h2>

  <p>
    Al finalizar esta caja de herramientas, la persona participante será capaz de utilizar inteligencia artificial de manera crítica, segura y aplicada para diagnosticar, automatizar y fortalecer procesos básicos de una MiPYME.
  </p>

  <h3>Objetivos específicos</h3>
  <ul>
    <li>Diagnosticar el estado de madurez digital y empresarial de un emprendimiento o MiPYME.</li>
    <li>Construir prompts empresariales usando contexto, instrucción, formato, restricciones y criterios de éxito.</li>
    <li>Validar una idea de negocio mediante tendencias, entrevistas, encuestas y evidencia primaria.</li>
    <li>Elaborar un FODA dinámico, un plan de acción y una matriz de priorización IVU.</li>
    <li>Diseñar automatizaciones simples para reducir tareas repetitivas sin perder control humano del proceso.</li>
    <li>Construir un CRM básico y un flujo de atención inicial cuidando la privacidad de los datos.</li>
    <li>Crear piezas de comunicación comercial con IA respetando transparencia, derechos de autor y autenticidad de marca.</li>
    <li>Evaluar la prefactibilidad de una idea mediante supuestos, costos, punto de equilibrio y criterios de decisión.</li>
    <li>Documentar evidencias de aprendizaje y justificar decisiones empresariales con criterio propio.</li>
  </ul>
</section>
```

---

## 6. Matriz global de alineación pedagógica

Crear una sección nueva llamada `#matriz-alineacion` antes de los módulos o dentro de “Fundamento académico”.

### Texto sugerido

```html
<section id="matriz-alineacion" class="course-section">
  <h2>Matriz de alineación pedagógica</h2>
  <p>
    Cada módulo vincula objetivos, actividades, herramientas, evidencias y criterios de revisión. Esta alineación permite verificar que el aprendizaje no dependa de respuestas automáticas de IA, sino de productos aplicados y revisados por la persona emprendedora.
  </p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Módulo</th>
          <th>Objetivo observable</th>
          <th>Actividad central</th>
          <th>Evidencia</th>
          <th>Criterio de logro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Módulo 0: Diagnóstico</td>
          <td>Identificar el punto de partida del emprendimiento y la ruta recomendada.</td>
          <td>Autodiagnóstico de madurez, urgencia y adopción de IA.</td>
          <td>Resultado de ruta personalizada y reflexión inicial.</td>
          <td>La persona justifica por qué inicia en una ruta específica.</td>
        </tr>
        <tr>
          <td>Toolkit 1: Pre-Operativo</td>
          <td>Validar una idea de negocio antes de invertir recursos significativos.</td>
          <td>Tendencias, buyer persona, encuesta y canvas.</td>
          <td>Carpeta con 4 artefactos de validación.</td>
          <td>Las decisiones se basan en evidencia, no solo en intuición.</td>
        </tr>
        <tr>
          <td>Módulo I: Diagnóstico con IA</td>
          <td>Diagnosticar el negocio y priorizar acciones con apoyo de IA.</td>
          <td>Configuración segura, prompting, FODA, matriz IVU y plan de acción.</td>
          <td>Informe breve de diagnóstico y plan priorizado.</td>
          <td>El plan muestra revisión humana y criterios de priorización explícitos.</td>
        </tr>
        <tr>
          <td>Módulo II: Automatización</td>
          <td>Automatizar tareas repetitivas sin delegar decisiones críticas.</td>
          <td>Flujo no-code, chatbot, CRM básico y cálculo de ROI.</td>
          <td>Capturas, flujo funcional, base de datos de prueba y cálculo de retorno.</td>
          <td>La automatización resuelve un proceso comprendido y medido.</td>
        </tr>
        <tr>
          <td>Módulo III: Comercialización</td>
          <td>Crear contenido y campañas con IA de forma ética y verificable.</td>
          <td>Identidad visual, video, prefactibilidad y campaña AIDA.</td>
          <td>Kit de comunicación, video, prefactibilidad y calendario de campaña.</td>
          <td>La propuesta comunica valor, respeta transparencia y se basa en datos verificables.</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

## 7. Agregar objetivos específicos por semana

Cada semana debe iniciar con un bloque antes de “Reto”.

Usar este patrón:

```html
<div class="learning-objectives">
  <h4>Objetivo de aprendizaje de la semana</h4>
  <p>Al finalizar esta semana, la persona participante será capaz de [acción observable] mediante [actividad] para [propósito empresarial].</p>
</div>
```

### 7.1. Objetivos sugeridos por semana

#### Módulo 0

```text
Al finalizar el diagnóstico de entrada, la persona participante será capaz de identificar su punto de partida formativo según la madurez de su emprendimiento, su urgencia operativa y su nivel actual de adopción de IA.
```

#### Semana T1-S1: Tendencias

```text
Al finalizar esta semana, la persona participante será capaz de comparar señales básicas de interés de mercado usando Google Trends, Exploding Topics u otras fuentes abiertas, y explicar si su idea muestra señales iniciales de oportunidad o alerta.
```

#### Semana T1-S2: Mercado y cliente

```text
Al finalizar esta semana, la persona participante será capaz de construir una ficha de buyer persona y un mapa de empatía, verificando que sus supuestos estén conectados con problemas reales de clientes potenciales.
```

#### Semana T1-S3: Encuesta

```text
Al finalizar esta semana, la persona participante será capaz de diseñar, aplicar y analizar una encuesta breve de validación primaria, anonimizando las respuestas antes de procesarlas con IA.
```

#### Semana T1-S4: Business Model Canvas

```text
Al finalizar esta semana, la persona participante será capaz de estructurar un Business Model Canvas preliminar y justificar los principales supuestos de valor, cliente, ingresos y costos.
```

#### Semana 1: Configuración

```text
Al finalizar esta semana, la persona participante será capaz de configurar una herramienta de IA generativa con medidas básicas de seguridad, control de datos y criterios de uso responsable.
```

#### Semana 2: Prompting

```text
Al finalizar esta semana, la persona participante será capaz de redactar prompts empresariales usando el modelo CIFRCE y evaluar la utilidad de las respuestas mediante criterios verificables.
```

#### Semana 3: FODA dinámico

```text
Al finalizar esta semana, la persona participante será capaz de elaborar un FODA dinámico con apoyo de IA, diferenciando hechos, supuestos y recomendaciones accionables.
```

#### Semana 4: Plan de acción

```text
Al finalizar esta semana, la persona participante será capaz de priorizar al menos tres iniciativas de mejora mediante una matriz de impacto, viabilidad y urgencia.
```

#### Semana 5: No-code

```text
Al finalizar esta semana, la persona participante será capaz de construir un flujo automático básico para una tarea repetitiva previamente identificada y documentar su funcionamiento.
```

#### Semana 6: Chatbots

```text
Al finalizar esta semana, la persona participante será capaz de diseñar un flujo básico de atención automatizada con límites claros de escalamiento humano.
```

#### Semana 7: CRM y datos

```text
Al finalizar esta semana, la persona participante será capaz de estructurar un CRM básico con datos mínimos, anonimizados o de prueba, y definir reglas de protección de información.
```

#### Semana 8: ROI

```text
Al finalizar esta semana, la persona participante será capaz de calcular una estimación simple del retorno de una automatización considerando tiempo ahorrado, costo de herramienta y riesgo operativo.
```

#### Semana 9: Identidad visual

```text
Al finalizar esta semana, la persona participante será capaz de crear una pieza visual coherente con su propuesta de valor, respetando derechos de autor y autenticidad de marca.
```

#### Semana 10: Video y audio

```text
Al finalizar esta semana, la persona participante será capaz de producir un video breve con apoyo de IA, incorporando declaración de transparencia cuando use voz sintética, avatar o imagen generada.
```

#### Semana 11: Prefactibilidad

```text
Al finalizar esta semana, la persona participante será capaz de elaborar una prefactibilidad básica con supuestos explícitos, punto de equilibrio, flujo de caja simple y decisión justificada de continuar o no continuar.
```

#### Semana 12: Campaña AIDA

```text
Al finalizar esta semana, la persona participante será capaz de diseñar una campaña básica de lanzamiento usando el modelo AIDA, con mensajes, calendario, canal y criterio de medición.
```

---

## 8. Rúbrica general para todos los entregables

Crear un componente reutilizable. Insertarlo en cada semana después del entregable o antes de “Compartir”.

### HTML sugerido

```html
<div class="rubric-box">
  <h4>Rúbrica rápida del entregable</h4>
  <p>Antes de avanzar, revisá tu evidencia con estos criterios:</p>
  <table>
    <thead>
      <tr>
        <th>Criterio</th>
        <th>Inicial</th>
        <th>Adecuado</th>
        <th>Sólido</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Pertinencia empresarial</td>
        <td>El entregable es genérico o no se conecta claramente con el negocio.</td>
        <td>El entregable se conecta con una necesidad real del negocio.</td>
        <td>El entregable permite tomar una decisión o mejorar un proceso concreto.</td>
      </tr>
      <tr>
        <td>Uso crítico de IA</td>
        <td>Se acepta la respuesta de IA sin revisión.</td>
        <td>Se revisa la respuesta y se ajusta parcialmente.</td>
        <td>Se contrastan supuestos, datos y recomendaciones antes de implementar.</td>
      </tr>
      <tr>
        <td>Evidencia verificable</td>
        <td>No hay datos, capturas, cálculos o fuentes que respalden el resultado.</td>
        <td>Hay alguna evidencia, pero incompleta.</td>
        <td>La evidencia permite verificar cómo se llegó al resultado.</td>
      </tr>
      <tr>
        <td>Privacidad y ética</td>
        <td>Incluye datos personales o contenido sin permiso.</td>
        <td>Reduce algunos datos sensibles, pero requiere revisión.</td>
        <td>Usa datos anonimizados, consentimiento cuando aplica y transparencia en contenido generado.</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 9. Rúbricas específicas por bloque

### 9.1. Toolkit 1: Pre-Operativo

Crear `rubricas/rubrica-toolkit-preoperativo.md`.

```markdown
# Rúbrica del Toolkit Pre-Operativo

| Criterio | Inicial | Adecuado | Sólido |
|---|---|---|---|
| Tendencias | Compara términos sin justificar selección. | Compara 3 términos y describe tendencia. | Interpreta patrones, estacionalidad y riesgos de demanda. |
| Cliente ideal | Buyer persona genérico. | Buyer persona con datos básicos y dolores. | Buyer persona conectado con evidencia primaria o supuestos explícitos. |
| Encuesta | Preguntas sesgadas o sin aplicación real. | Encuesta aplicada a al menos 10 personas. | Preguntas no sesgadas, respuestas anonimizadas y hallazgos accionables. |
| Canvas | Canvas incompleto o copiado de IA. | Canvas completo con 9 bloques. | Canvas revisado críticamente, con supuestos y decisiones claras. |
```

### 9.2. Módulo I: Diagnóstico con IA

Crear `rubricas/rubrica-modulo-diagnostico.md`.

```markdown
# Rúbrica del Módulo I: Diagnóstico con IA

| Criterio | Inicial | Adecuado | Sólido |
|---|---|---|---|
| Seguridad de uso | Usa IA sin revisar configuración. | Configura cuenta y revisa privacidad básica. | Activa controles, evita datos sensibles y documenta reglas de uso. |
| Prompting CIFRCE | Prompts vagos o genéricos. | Prompts con contexto, instrucción y formato. | Prompts completos con restricciones, criterios de éxito y verificación. |
| FODA dinámico | FODA superficial. | FODA con fortalezas, oportunidades, debilidades y amenazas. | FODA basado en preguntas críticas, datos y decisiones priorizadas. |
| Plan de acción | Lista de ideas sin prioridad. | Plan con 3 acciones priorizadas. | Plan con impacto, viabilidad, urgencia, responsables y plazo. |
```

### 9.3. Módulo II: Automatización

Crear `rubricas/rubrica-modulo-automatizacion.md`.

```markdown
# Rúbrica del Módulo II: Automatización

| Criterio | Inicial | Adecuado | Sólido |
|---|---|---|---|
| Proceso elegido | Automatiza una tarea sin entenderla. | Automatiza una tarea repetitiva identificada. | Documenta proceso, entradas, salidas, errores y límites humanos. |
| Flujo no-code | Flujo incompleto o no probado. | Flujo ejecutado con evidencia básica. | Flujo probado, documentado y con escenario de error previsto. |
| Chatbot | Responde sin límites. | Atiende preguntas frecuentes. | Incluye escalamiento humano, mensajes de privacidad y límites claros. |
| ROI | Cálculo incompleto. | Estima tiempo, costo y ahorro. | Explica supuestos, sensibilidad y decisión de mantener o descartar. |
```

### 9.4. Módulo III: Comercialización

Crear `rubricas/rubrica-modulo-comercializacion.md`.

```markdown
# Rúbrica del Módulo III: Comercialización

| Criterio | Inicial | Adecuado | Sólido |
|---|---|---|---|
| Identidad visual | Pieza visual genérica. | Pieza coherente con marca y cliente. | Pieza validada con propuesta de valor, canal y público específico. |
| Video/audio | Video sin mensaje claro. | Video comunica oferta básica. | Video incluye transparencia IA, llamada a la acción y autenticidad de marca. |
| Prefactibilidad | Proyección sin supuestos. | Incluye costos, ingresos y punto de equilibrio. | Presenta supuestos, riesgos, sensibilidad y decisión ir/no-ir. |
| Campaña AIDA | Mensajes aislados. | Campaña con atención, interés, deseo y acción. | Campaña calendarizada, medible y ajustada a cliente real. |
```

---

## 10. Protocolo obligatorio de privacidad y datos

Crear `politicas/protocolo-privacidad-datos.md` y enlazarlo desde:

- Human-in-the-Loop.
- Semana T1-S3.
- Semana 6.
- Semana 7.
- Semana 10.
- Semana 11.
- Biblioteca de Recursos.

### Texto corto para insertar en cada actividad sensible

```html
<div class="privacy-warning">
  <h4>Antes de usar datos reales</h4>
  <p>
    No ingresés en herramientas de IA nombres, teléfonos, correos, direcciones, números de identificación, datos bancarios, información médica, fotografías de clientes ni conversaciones privadas sin consentimiento.
  </p>
  <p>
    Cuando necesités analizar respuestas de clientes, anonimizá primero la información. Usá etiquetas como Cliente 1, Cliente 2 o Participante A. Conservá solo la información necesaria para el aprendizaje.
  </p>
</div>
```

### Documento largo sugerido

```markdown
# Protocolo de privacidad y uso de datos en actividades con IA

## 1. Regla general

La persona participante no debe ingresar datos personales identificables de clientes, proveedores, colaboradores o familiares en herramientas de IA abiertas o gratuitas.

## 2. Datos que deben eliminarse antes de usar IA

- Nombre y apellidos.
- Número de identificación.
- Teléfono.
- Correo electrónico.
- Dirección física.
- Datos bancarios o financieros individuales.
- Fotografías o videos identificables.
- Información de salud.
- Información de menores de edad.
- Conversaciones privadas.
- Cualquier combinación de datos que permita identificar a una persona.

## 3. Cómo anonimizar

Reemplazar:

- “María Fernández, 8888-0000, vecina de Cartago” por “Cliente 1, mujer adulta, zona urbana”.
- “Pedro López compró ₡125.000 en abril” por “Cliente 2 realizó una compra alta en el último mes”.
- “La empresa XYZ me debe dinero” por “Cliente corporativo con cuenta pendiente”.

## 4. Consentimiento

Si la actividad requiere grabar, fotografiar, publicar o usar testimonios de una persona real, se debe pedir consentimiento expreso.

## 5. Uso de datos de prueba

Para CRM, chatbots y automatizaciones, usar datos ficticios durante el aprendizaje.

Ejemplo:

| Nombre | Correo | Consulta |
|---|---|---|
| Cliente 1 | cliente1@ejemplo.com | Consulta sobre precio |
| Cliente 2 | cliente2@ejemplo.com | Consulta sobre horario |

## 6. Regla de mínima información

Usar solo los datos estrictamente necesarios para completar la actividad.

## 7. Revisión humana

Antes de aplicar una recomendación generada por IA con impacto en clientes, precios, crédito, contratación o inversión, la persona emprendedora debe revisar los supuestos y validar con información propia.
```

---

## 11. Plantilla de consentimiento

Crear `templates/plantilla-consentimiento-clientes.md`.

```markdown
# Plantilla breve de consentimiento para entrevistas, encuestas o testimonios

Yo, ________________________________, acepto participar voluntariamente en una actividad de validación de mercado realizada por ________________________________.

Entiendo que:

1. Mi participación es voluntaria.
2. Puedo negarme a responder cualquier pregunta.
3. La información será usada para mejorar una idea, producto o servicio.
4. Mis datos personales no serán publicados sin autorización.
5. Si se usan herramientas de inteligencia artificial para analizar respuestas, la información será anonimizada previamente.

Autorizo el uso de mis respuestas de forma anónima para fines de aprendizaje y mejora del negocio.

Firma: ________________________________  
Fecha: ________________________________  
Contacto del emprendimiento: ________________________________
```

---

## 12. Política de uso de IA: requerir vs restringir

Crear `politicas/politica-uso-ia.md`.

### Insertar también una versión resumida en el sitio

```html
<section id="politica-uso-ia" class="course-section">
  <h2>Cuándo usar IA y cuándo no usarla</h2>
  <p>
    En este programa la IA se usa para aumentar la capacidad de análisis y producción de la persona emprendedora, no para sustituir su criterio.
  </p>

  <div class="two-column">
    <article class="policy-card required-ai">
      <h3>Usá IA para acelerar</h3>
      <ul>
        <li>Ordenar información.</li>
        <li>Comparar alternativas.</li>
        <li>Generar borradores.</li>
        <li>Crear tablas, listas y estructuras.</li>
        <li>Simular escenarios con supuestos claros.</li>
        <li>Automatizar tareas repetitivas que ya entendés.</li>
      </ul>
    </article>

    <article class="policy-card restricted-ai">
      <h3>No delegués a la IA</h3>
      <ul>
        <li>Decisiones estratégicas sin validación humana.</li>
        <li>Entrevistas reales con clientes.</li>
        <li>Lectura del lenguaje corporal o negociación.</li>
        <li>Decisiones sobre crédito, contratación o despido.</li>
        <li>Uso de datos personales sin consentimiento.</li>
        <li>Publicación de testimonios o imagen de clientes sin permiso.</li>
      </ul>
    </article>
  </div>
</section>
```

---

## 13. Reemplazo obligatorio de prompts problemáticos

Buscar en todo el proyecto:

- `Chain-of-thought`
- `chain-of-thought`
- `razone paso a paso`
- `razona paso a paso`
- `Piensa paso a paso`
- `piensa paso a paso`
- `pensá paso a paso`
- `razoná paso a paso`

### 13.1. Reemplazo en Semana 2

Texto actual aproximado:

```text
Aplique Few-shot prompting dando 2 ejemplos del formato esperado y Chain-of-thought pidiendo que el modelo "razone paso a paso".
```

Sustituir por:

```text
Aplique Few-shot prompting dando 2 ejemplos del formato esperado. Luego pedí al modelo que entregue: supuestos utilizados, criterios de decisión, riesgos de error, datos faltantes y una versión final verificable. No aceptés la respuesta sin contrastarla con tu conocimiento del negocio.
```

### 13.2. Reemplazo en autoevaluación del Módulo I

Texto actual aproximado:

```text
Aplicar las técnicas few-shot prompting y chain-of-thought en al menos un prompt real de tu negocio.
```

Sustituir por:

```text
Aplicar few-shot prompting y solicitar salidas verificables con supuestos, criterios de decisión, riesgos de error y datos faltantes en al menos un prompt real de tu negocio.
```

### 13.3. Reemplazo en Semana 11

Texto actual aproximado:

```text
Proyecta un flujo de caja simple a 6 meses para este nuevo producto, considerando costos iniciales y ventas estimadas. Piensa paso a paso.
```

Sustituir por:

```text
Proyectá un flujo de caja simple a 6 meses para este nuevo producto. Presentá los supuestos usados, datos faltantes, fórmula de cálculo, tabla mensual, punto de equilibrio, riesgos de error y una recomendación final de ir/no-ir. Marcá claramente qué cifras son estimadas y cuáles provienen de datos reales.
```

---

## 14. Ajuste de credenciales

Modificar sección “Credenciales y Valor Agregado”.

### Sustituir por este texto

```html
<section id="credenciales" class="course-section">
  <h2>Credenciales y evidencias de aprendizaje</h2>

  <p>
    Completar este programa no significa solo recorrer contenidos: significa construir evidencias aplicadas al negocio. Las credenciales asociadas al programa se encuentran en fase de diseño y validación institucional.
  </p>

  <article class="credential-card">
    <h3>Toolkit 1 — Ruta gratuita de validación inicial</h3>
    <p>
      Al completar las cuatro semanas del Toolkit Pre-Operativo, la persona participante podrá organizar un portafolio básico con:
    </p>
    <ul>
      <li>Análisis de tendencias.</li>
      <li>Buyer Persona y Mapa de Empatía.</li>
      <li>Reporte de validación primaria con datos anonimizados.</li>
      <li>Business Model Canvas preliminar.</li>
    </ul>
    <p class="status-note">
      Estado: credencial digital en fase de diseño. Su emisión estará sujeta a validación de evidencias, rúbrica de desempeño y aprobación de las instancias institucionales correspondientes.
    </p>
  </article>

  <article class="credential-card">
    <h3>Toolkit 2 — Ruta avanzada</h3>
    <p>
      La ruta avanzada para negocios en marcha se encuentra en diseño. Podrá incluir evaluación estructurada, contenidos extendidos y acompañamiento institucional, según disponibilidad y aprobación formal.
    </p>
    <p class="status-note">
      Estado: detalles académicos, financieros y administrativos en desarrollo.
    </p>
  </article>
</section>
```

---

## 15. Portafolio de evidencias

Crear una sección nueva antes de “Credenciales”.

### HTML sugerido

```html
<section id="portafolio-evidencias" class="course-section">
  <h2>Portafolio de evidencias</h2>
  <p>
    Para demostrar el aprendizaje, cada persona participante debe construir un portafolio con los productos generados durante el programa. Este portafolio permite revisar el avance, comparar decisiones y verificar que el uso de IA fue crítico y responsable.
  </p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Bloque</th>
          <th>Evidencias mínimas</th>
          <th>Formato recomendado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Toolkit 1</td>
          <td>Tendencias, buyer persona, encuesta anonimizada, canvas.</td>
          <td>PDF o carpeta digital.</td>
        </tr>
        <tr>
          <td>Módulo I</td>
          <td>Prompts CIFRCE, FODA dinámico, matriz IVU, plan de acción.</td>
          <td>Documento breve con anexos.</td>
        </tr>
        <tr>
          <td>Módulo II</td>
          <td>Flujo no-code, diseño de chatbot, CRM de prueba, cálculo ROI.</td>
          <td>Capturas, enlaces y hoja de cálculo.</td>
        </tr>
        <tr>
          <td>Módulo III</td>
          <td>Pieza visual, video, prefactibilidad, campaña AIDA.</td>
          <td>Carpeta de campaña y reporte final.</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

## 16. Mejoras para la comunidad y el componente “Compartir”

### 16.1. Agregar sección general

```html
<section id="comunidad-aprendizaje" class="course-section">
  <h2>Comunidad y retroalimentación</h2>
  <p>
    La fase Compartir permite aprender de otras personas emprendedoras. Sin embargo, compartir no significa exponer información sensible del negocio ni datos personales de clientes.
  </p>

  <h3>Reglas mínimas para compartir</h3>
  <ul>
    <li>No publicar nombres, teléfonos, correos ni datos privados de clientes.</li>
    <li>No compartir capturas con información sensible del negocio.</li>
    <li>Explicar qué decisión se tomó y con qué evidencia.</li>
    <li>Dar retroalimentación respetuosa, concreta y orientada a mejora.</li>
    <li>Distinguir entre opinión, dato, supuesto y recomendación.</li>
  </ul>

  <p>
    El canal oficial de comunidad será definido por la coordinación del programa. Mientras no exista un canal institucional activo, las actividades de Compartir deben realizarse como reflexión individual o en espacios autorizados por la coordinación.
  </p>
</section>
```

### 16.2. Ajustar textos de “Compartir”

Reemplazar formulaciones abiertas como:

```text
Comparta el Buyer Persona generado.
```

Por:

```text
Comparta una versión resumida y anonimizada del Buyer Persona. No incluya nombres reales, teléfonos, correos, ubicaciones exactas ni información que permita identificar a una persona.
```

Reemplazar:

```text
Publique en el grupo de WhatsApp...
```

Por:

```text
Comparta en el espacio definido por la coordinación del programa una versión breve de su hallazgo, sin datos sensibles ni información identificable de clientes.
```

---

## 17. Ajustes específicos por semana

### 17.1. Semana T1-S1: Tendencias

Agregar:

- Objetivo de aprendizaje.
- Advertencia de no confundir tendencia con demanda real.
- Rúbrica rápida.

Texto adicional:

```html
<div class="critical-note">
  <h4>Interpretación crítica</h4>
  <p>
    Una tendencia de búsqueda no demuestra por sí sola que exista demanda suficiente para un negocio. Usala como señal inicial y combinala con entrevistas, encuestas y observación del mercado local.
  </p>
</div>
```

### 17.2. Semana T1-S2: Buyer Persona

Agregar:

```html
<div class="critical-note">
  <h4>Evitar buyer personas inventados</h4>
  <p>
    La IA puede ayudarte a estructurar un perfil, pero no debe inventar al cliente. Marcá cuáles datos vienen de tu experiencia, cuáles son supuestos y cuáles deben validarse con personas reales.
  </p>
</div>
```

### 17.3. Semana T1-S3: Encuesta

Agregar antes del paso de pegar respuestas en Claude:

```html
<div class="privacy-warning">
  <h4>Anonimizá antes de analizar</h4>
  <p>
    Antes de copiar respuestas en Claude, ChatGPT, Gemini u otra herramienta, eliminá nombres, teléfonos, correos, direcciones y cualquier dato que permita identificar a las personas encuestadas.
  </p>
</div>
```

Modificar paso 3:

```text
Descargue las respuestas, elimine cualquier dato identificable y luego pida al modelo: “Clasificá estas respuestas anonimizadas en 3 temas clave, identificá el problema más común y señalá qué datos serían insuficientes para tomar una decisión”.
```

### 17.4. Semana T1-S4: Canvas

Agregar:

```html
<div class="critical-note">
  <h4>Supuestos del Canvas</h4>
  <p>
    Cada bloque del Canvas debe marcarse como dato validado, supuesto razonable o hipótesis pendiente. No tratés como hecho una afirmación generada por IA.
  </p>
</div>
```

### 17.5. Semana 1: Configuración

Agregar checklist de seguridad:

```html
<ul class="checklist">
  <li>Activé autenticación de dos factores cuando la herramienta lo permite.</li>
  <li>Revisé configuración de historial, entrenamiento o uso de datos.</li>
  <li>No subí archivos con información privada de clientes.</li>
  <li>Identifiqué qué versión de la herramienta estoy usando: gratuita, educativa, empresarial o de pago.</li>
</ul>
```

### 17.6. Semana 2: Prompting

Aplicar reemplazo de chain-of-thought. Agregar:

```html
<div class="prompt-quality-box">
  <h4>Salida verificable recomendada</h4>
  <p>
    Cuando usés IA para decisiones empresariales, pedí siempre: supuestos, datos faltantes, riesgos de error, criterios usados y una tabla final revisable.
  </p>
</div>
```

### 17.7. Semana 3: FODA

Agregar distinción:

```html
<div class="critical-note">
  <h4>Dato, supuesto o recomendación</h4>
  <p>
    En el FODA, clasificá cada elemento como dato observado, supuesto del negocio o recomendación de IA. Esta separación evita tomar decisiones estratégicas con base en afirmaciones no verificadas.
  </p>
</div>
```

### 17.8. Semana 4: Plan de acción

Agregar matriz IVU descargable y criterios:

```text
Impacto: cuánto podría mejorar el negocio.
Viabilidad: qué tan posible es ejecutarlo con recursos actuales.
Urgencia: qué tan pronto debe resolverse.
```

### 17.9. Semana 5: No-code

Agregar:

```html
<div class="automation-safety">
  <h4>Automatizá solo procesos comprendidos</h4>
  <p>
    Antes de automatizar, escribí manualmente el proceso en 5 pasos. Si no podés explicarlo sin la herramienta, todavía no está listo para automatizarse.
  </p>
</div>
```

### 17.10. Semana 6: Chatbots

Agregar reglas obligatorias:

```html
<ul class="checklist">
  <li>El chatbot indica que es una asistencia automatizada.</li>
  <li>El chatbot no promete precios, crédito, disponibilidad o condiciones no verificadas.</li>
  <li>El chatbot ofrece derivación a una persona cuando la consulta es compleja.</li>
  <li>El chatbot no solicita datos sensibles innecesarios.</li>
</ul>
```

### 17.11. Semana 7: CRM

Usar datos ficticios por defecto. Agregar:

```html
<div class="privacy-warning">
  <h4>CRM de práctica</h4>
  <p>
    Para esta actividad usá datos ficticios o anonimizados. No construyás la práctica con una base real de clientes si no tenés consentimiento y medidas de protección adecuadas.
  </p>
</div>
```

### 17.12. Semana 8: ROI

Agregar fórmula visible:

```html
<div class="formula-box">
  <h4>Fórmula simple de ROI</h4>
  <p><strong>ROI estimado = ((beneficio mensual esperado - costo mensual de la herramienta) / costo mensual de la herramienta) × 100</strong></p>
  <p>
    Incluí también tiempo ahorrado, costo de aprendizaje, riesgo de error y dependencia tecnológica.
  </p>
</div>
```

### 17.13. Semana 9: Identidad visual

Agregar:

```html
<div class="ethics-box">
  <h4>Derechos de uso</h4>
  <p>
    Verificá la licencia de imágenes, música, tipografías y plantillas. No usés recursos de terceros sin permiso o sin una licencia compatible con uso comercial.
  </p>
</div>
```

### 17.14. Semana 10: Video, locución y avatares

Mantener la sección de transparencia, pero agregar plantilla:

```html
<div class="transparency-template">
  <h4>Declaración sugerida</h4>
  <p>
    “Este contenido fue producido con apoyo de herramientas de inteligencia artificial. La voz, imagen o avatar utilizados son sintéticos. La información comercial fue revisada por la persona responsable del emprendimiento.”
  </p>
</div>
```

### 17.15. Semana 11: Prefactibilidad

Aplicar reemplazo de “Piensa paso a paso”. Agregar:

```html
<div class="financial-warning">
  <h4>Advertencia financiera</h4>
  <p>
    Las proyecciones generadas con IA son estimaciones. No sustituyen asesoría contable, tributaria, financiera ni legal. Validá precios, costos, impuestos, tasas y normativa aplicable antes de invertir.
  </p>
</div>
```

### 17.16. Semana 12: Campaña AIDA

Agregar:

```html
<div class="measurement-box">
  <h4>Indicadores mínimos de campaña</h4>
  <ul>
    <li>Canal principal.</li>
    <li>Público objetivo.</li>
    <li>Mensaje central.</li>
    <li>Fecha de publicación.</li>
    <li>Indicador de respuesta: clics, mensajes, llamadas, ventas o formularios.</li>
    <li>Criterio de éxito definido antes de publicar.</li>
  </ul>
</div>
```

---

## 18. Accesibilidad y usabilidad

### 18.1. Agregar declaración de accesibilidad

Crear `politicas/declaracion-accesibilidad.md` y enlazarla en el footer.

```markdown
# Declaración de accesibilidad

Este sitio busca cumplir progresivamente con criterios WCAG 2.2 nivel AA.

Medidas implementadas:

- Uso de estructura semántica HTML.
- Texto alternativo en imágenes relevantes.
- Navegación por teclado.
- Contraste suficiente entre texto y fondo.
- Botones y enlaces con nombres accesibles.
- Formularios con etiquetas visibles.
- Contenido organizado por encabezados jerárquicos.
- No dependencia exclusiva del color para transmitir información.

Si encuentra una barrera de accesibilidad, puede reportarla a la coordinación del programa.
```

### 18.2. Cambios técnicos mínimos

Revisar e implementar:

```html
<header role="banner">...</header>
<nav aria-label="Menú principal">...</nav>
<main id="main-content">...</main>
<footer role="contentinfo">...</footer>
```

Agregar enlace de salto:

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
```

CSS:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #005da4;
  color: #fff;
  padding: 8px 12px;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}

:focus-visible {
  outline: 3px solid #ffbf47;
  outline-offset: 3px;
}
```

### 18.3. Botones y enlaces

Asegurar que todo botón tenga texto accesible.

Incorrecto:

```html
<button>×</button>
```

Correcto:

```html
<button aria-label="Cerrar menú">×</button>
```

### 18.4. Imágenes

Los logos deben tener alt descriptivo. Las imágenes decorativas deben tener `alt=""`.

Ejemplo:

```html
<img src="assets/logos/ucr.png" alt="Logo oficial de la Universidad de Costa Rica">
```

### 18.5. Tablas

Toda tabla debe estar dentro de `.table-responsive` y tener encabezados reales.

```html
<div class="table-responsive">
  <table>
    <caption>Rúbrica rápida del entregable semanal</caption>
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

---

## 19. Gobernanza institucional de recursos

Crear `politicas/gobernanza-recursos.md`.

### Reestructurar Biblioteca de Recursos

Sustituir la sección actual de “Asistentes Virtuales Institucionales” por tres categorías:

```html
<section id="biblioteca-recursos" class="course-section">
  <h2>Biblioteca de Recursos</h2>

  <h3>Recursos oficiales del programa</h3>
  <p>
    Recursos validados por la coordinación académica del programa para apoyar las actividades formativas.
  </p>
  <ul>
    <li><a href="...">Canal de video oficial</a></li>
    <li><a href="...">Guía de seguridad digital</a></li>
    <li><a href="...">Guía de prompting CIFRCE</a></li>
  </ul>

  <h3>Recursos experimentales en validación</h3>
  <p>
    Herramientas o asistentes en proceso de revisión. Su uso es opcional y no implica respaldo definitivo hasta completar la validación institucional.
  </p>
  <ul>
    <li><a href="...">GPT Emprendedores V2</a> — En validación.</li>
  </ul>

  <h3>Recursos externos recomendados</h3>
  <p>
    Sitios y herramientas externas que pueden apoyar el aprendizaje. Cada persona debe revisar sus términos, costos, privacidad y condiciones de uso.
  </p>
  <ul>
    <li><a href="https://trends.google.com">Google Trends</a></li>
    <li><a href="https://explodingtopics.com">Exploding Topics</a></li>
    <li><a href="https://www.canva.com">Canva</a></li>
  </ul>
</section>
```

### Eliminar o mover de categoría

Los recursos marcados como “Migración pendiente” no deben aparecer como “institucionales”. Deben moverse a “recursos experimentales en validación” o eliminarse temporalmente.

---

## 20. README.md sugerido

Crear o actualizar `README.md`.

```markdown
# Caja de Herramientas de Inteligencia Artificial para la MiPYME

Recurso formativo abierto para personas emprendedoras y microempresarias interesadas en aplicar inteligencia artificial de forma práctica, crítica y responsable.

## Instituciones

Universidad de Costa Rica  
Centro de Investigación Observatorio del Desarrollo  
Dirección de Promoción de la Vinculación para el Desarrollo  
Colaboración: Programa Auge

## Propósito

Desarrollar capacidades prácticas para usar IA en diagnóstico, validación, automatización y comercialización de MiPYMEs, manteniendo el criterio humano en el centro de las decisiones.

## Metodología

El sitio usa:

- Modelo 70/30: práctica aplicada y fundamento teórico.
- Ciclo RHEC: Reto, Hacer, Entender, Compartir.
- Modelo CIFRCE para prompts empresariales.
- Enfoque Human-in-the-Loop.
- Portafolio de evidencias.

## Estructura

- Módulo 0: Diagnóstico de entrada.
- Toolkit 1: Validación pre-operativa.
- Módulo I: Diagnóstico con IA.
- Módulo II: Automatización de procesos.
- Módulo III: Comercialización y contenido.
- Credenciales y portafolio de evidencias.

## Uso responsable de IA

La IA se usa como apoyo para ordenar, analizar, simular y producir borradores. No sustituye la validación humana, la relación con clientes, el criterio empresarial, ni la asesoría profesional especializada.

## Privacidad

No se deben ingresar datos personales identificables en herramientas de IA abiertas. Las actividades con clientes requieren anonimización y, cuando corresponda, consentimiento.

## Accesibilidad

El sitio busca cumplir progresivamente con WCAG 2.2 AA.

## Estado del proyecto

Recurso en desarrollo y mejora continua. Las credenciales se encuentran sujetas a validación institucional.

## Licencia

Definir licencia antes de publicar reutilización abierta. Recomendación: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International, si la UCR lo autoriza.
```

---

## 21. CHANGELOG.md sugerido

Crear `CHANGELOG.md`.

```markdown
# Historial de cambios

## Versión 0.2.0 — Auditoría pedagógica y accesibilidad

### Agregado

- Objetivos de aprendizaje generales y específicos.
- Matriz de alineación pedagógica.
- Rúbricas por entregable.
- Portafolio de evidencias.
- Protocolo de privacidad y anonimización.
- Política de uso de IA: requerir vs restringir.
- Declaración de accesibilidad.
- Gobernanza de recursos oficiales, experimentales y externos.

### Cambiado

- Reemplazadas instrucciones tipo “pensar paso a paso” por salidas verificables.
- Ajustada sección de credenciales para indicar estado de diseño institucional.
- Reforzadas advertencias de privacidad en actividades con clientes, CRM y chatbots.
- Mejorada estructura de comunidad y fase Compartir.

### Pendiente

- Validación institucional de credenciales.
- Revisión WCAG completa.
- Definición formal de licencia.
- Implementación de canal oficial de comunidad.
```

---

## 22. CONTRIBUTING.md sugerido

Crear `CONTRIBUTING.md`.

```markdown
# Guía de contribución

Gracias por contribuir a la Caja de Herramientas de IA para la MiPYME.

## Tipos de contribución aceptadas

- Correcciones de redacción.
- Mejoras de accesibilidad.
- Nuevas plantillas.
- Actualización de enlaces.
- Mejoras de rúbricas.
- Casos de uso contextualizados para Costa Rica.
- Reporte de errores técnicos.

## Criterios para aceptar cambios

Toda contribución debe:

1. Mantener el enfoque Human-in-the-Loop.
2. Evitar prometer resultados empresariales garantizados.
3. Respetar privacidad y protección de datos.
4. Usar lenguaje claro y accesible.
5. No introducir herramientas externas sin revisar privacidad, costos y sostenibilidad.
6. Mantener coherencia con el modelo RHEC y el modelo CIFRCE.

## Cómo reportar problemas

Abrir un issue con:

- Descripción del problema.
- Página o sección afectada.
- Captura si aplica.
- Propuesta de corrección.
```

---

## 23. LICENSE.md

No decidir licencia sin validación institucional. Crear archivo temporal:

```markdown
# Licencia

La licencia de este recurso está pendiente de definición institucional.

Mientras no se indique una licencia explícita, el contenido no debe ser reutilizado, modificado ni distribuido fuera de los términos autorizados por la Universidad de Costa Rica y las unidades responsables del proyecto.

Recomendación técnica para revisión institucional: evaluar una licencia Creative Commons compatible con recursos educativos abiertos, por ejemplo CC BY-NC-SA 4.0, si corresponde.
```

---

## 24. Estilos CSS sugeridos para nuevos componentes

Agregar al CSS existente:

```css
.course-section {
  scroll-margin-top: 6rem;
  margin-block: 3rem;
}

.info-grid,
.two-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.info-card,
.policy-card,
.credential-card,
.learning-objectives,
.rubric-box,
.privacy-warning,
.critical-note,
.ethics-box,
.financial-warning,
.formula-box,
.measurement-box,
.prompt-quality-box,
.automation-safety,
.transparency-template {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-block: 1rem;
  background: #fff;
}

.privacy-warning {
  border-left: 6px solid #8b0000;
}

.critical-note {
  border-left: 6px solid #005da4;
}

.learning-objectives {
  border-left: 6px solid #2e7d32;
}

.rubric-box {
  overflow-x: auto;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.16);
  vertical-align: top;
}

th {
  text-align: left;
}

.status-note {
  font-weight: 600;
}

.checklist {
  list-style: none;
  padding-left: 0;
}

.checklist li::before {
  content: "☐ ";
  font-weight: bold;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 25. Validaciones técnicas que debe ejecutar Antigravity

### 25.1. Validación funcional

- [ ] El sitio carga sin errores de consola.
- [ ] El menú abre y cierra correctamente.
- [ ] Los anchors del menú llevan a la sección correcta.
- [ ] El diagnóstico de entrada sigue funcionando.
- [ ] No se rompieron enlaces externos.
- [ ] Las nuevas secciones se ven bien en móvil y escritorio.
- [ ] Las tablas no desbordan en móvil.
- [ ] Los botones tienen estados de foco.

### 25.2. Validación pedagógica

- [ ] Cada módulo tiene objetivo observable.
- [ ] Cada semana tiene objetivo observable.
- [ ] Cada entregable tiene rúbrica.
- [ ] Cada actividad con clientes tiene advertencia de privacidad.
- [ ] Se eliminó lenguaje que sugiera delegar decisiones críticas a IA.
- [ ] Se sustituyeron instrucciones de chain-of-thought por salidas verificables.
- [ ] La sección de credenciales no promete emisión inmediata no aprobada.
- [ ] Biblioteca separa recursos oficiales, experimentales y externos.

### 25.3. Validación de accesibilidad

- [ ] Hay un solo `h1`.
- [ ] La jerarquía de encabezados no salta niveles de forma inconsistente.
- [ ] Hay enlace “Saltar al contenido principal”.
- [ ] El menú tiene `aria-label`.
- [ ] Botones de cerrar/abrir tienen nombre accesible.
- [ ] Imágenes informativas tienen alt descriptivo.
- [ ] Imágenes decorativas tienen `alt=""`.
- [ ] Se puede navegar con teclado.
- [ ] El foco es visible.
- [ ] El contraste texto/fondo es suficiente.
- [ ] Las tablas tienen encabezados y son responsivas.

### 25.4. Validación documental

- [ ] Existe README.md.
- [ ] Existe CHANGELOG.md.
- [ ] Existe CONTRIBUTING.md.
- [ ] Existe LICENSE.md provisional.
- [ ] Existe carpeta de plantillas.
- [ ] Existe carpeta de rúbricas.
- [ ] Existe carpeta de políticas.
- [ ] Los nuevos documentos están enlazados desde Biblioteca de Recursos.

---

## 26. Criterios de aceptación final

La tarea se considera completada cuando:

1. El sitio mantiene la identidad visual actual, pero mejora claridad, navegación y confianza.
2. Todas las semanas tienen objetivo, entregable, rúbrica y advertencia ética cuando aplica.
3. Ningún prompt solicita “chain-of-thought”, “pensar paso a paso” o variantes.
4. Las actividades con datos reales tienen protocolo de anonimización.
5. La sección de credenciales queda redactada como “en diseño / sujeta a validación institucional”.
6. La Biblioteca distingue recursos oficiales, experimentales y externos.
7. El sitio es navegable por teclado.
8. El sitio tiene documentación básica de proyecto abierto.
9. El contenido conserva tono costarricense y orientación a MiPYME.
10. El aprendizaje queda centrado en evidencia, acción práctica y criterio humano.

---

## 27. Checklist rápido para commit

Usar este checklist antes del commit final:

```markdown
## Checklist de commit

- [ ] Objetivos generales agregados.
- [ ] Objetivos por semana agregados.
- [ ] Matriz de alineación agregada.
- [ ] Rúbricas agregadas.
- [ ] Protocolo de privacidad agregado.
- [ ] Plantilla de consentimiento agregada.
- [ ] Política de uso de IA agregada.
- [ ] Prompts problemáticos corregidos.
- [ ] Credenciales ajustadas.
- [ ] Biblioteca reorganizada.
- [ ] Accesibilidad mejorada.
- [ ] README creado o actualizado.
- [ ] CHANGELOG creado.
- [ ] CONTRIBUTING creado.
- [ ] LICENSE provisional creado.
- [ ] Sitio probado en móvil.
- [ ] Sitio probado con teclado.
- [ ] Consola sin errores.
```

---

## 28. Mensaje sugerido de commit

```text
Refactor pedagógico, ético y accesible del curso IA para MiPYME

- Agrega objetivos de aprendizaje y matriz de alineación.
- Incorpora rúbricas por entregable y portafolio de evidencias.
- Refuerza privacidad, anonimización y consentimiento.
- Sustituye prompts de razonamiento paso a paso por salidas verificables.
- Ajusta credenciales a estado de validación institucional.
- Reorganiza biblioteca de recursos por gobernanza.
- Mejora accesibilidad, navegación semántica y documentación del proyecto.
```

---

## 29. Nota final para Antigravity

No debés interpretar esta tarea como un rediseño estético superficial. La prioridad es convertir el sitio en un recurso formativo abierto, más seguro, más evaluable y más defendible institucionalmente.

Conservá la esencia: aprendizaje aplicado, IA práctica, emprendimiento costarricense y criterio humano.  
Corregí lo necesario para que el sitio pueda resistir una revisión pedagógica, ética, técnica e institucional.
