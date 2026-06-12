# Instrucciones de Trabajo: Claude Code → `cajaherramientaspymes`
**Repositorio:** `agmelendez/cajaherramientaspymes` · GitHub Pages  
**Versión:** 1.0 — Junio 2025  
**Autor:** CIOdD-UCR / Observatorio del Desarrollo

---

## 0. Antes de empezar — Configuración única

### 0.1 Instalar Claude Code

```bash
# macOS / Linux (método oficial actual)
curl -fsSL https://code.claude.ai/install.sh | sh

# Verificar instalación
claude --version
```

> ⚠️ La instalación vía `npm install -g @anthropic-ai/claude-code` está **obsoleta**. Usa el instalador oficial de arriba.

### 0.2 Clonar el repositorio

```bash
git clone https://github.com/agmelendez/cajaherramientaspymes.git
cd cajaherramientaspymes
```

### 0.3 Iniciar Claude Code en el repositorio

```bash
claude
```

Claude Code lee automáticamente el archivo `CLAUDE.md` en la raíz del proyecto (si existe) como memoria persistente del proyecto. Si no existe, créalo con el comando de la sección 1.

---

## 1. Crear el archivo `CLAUDE.md` (memoria del proyecto)

Este archivo es la "ficha técnica" que Claude Code lee al inicio de cada sesión. **Créalo una sola vez** y actualízalo cuando cambie algo importante.

Crea el archivo `CLAUDE.md` en la raíz del repositorio con el siguiente contenido:

```markdown
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
- [ ] Módulo 0: diagnóstico de entrada (formulario Google Forms)
- [ ] Normalización terminológica en todo el HTML
- [ ] Texto introductorio por módulo (100–150 palabras)
- [ ] Lista de chequeo al final de cada módulo
- [ ] Toolkit 1: 4 nuevas semanas (T1-S1 a T1-S4)
- [ ] Migrar vínculos de GPTs a cuentas institucionales cuando estén listos
- [ ] Actualizar atribución de asistentes virtuales (quitar referencias UNED donde no corresponda)
```

---

## 2. Flujo de trabajo estándar (cada sesión)

### Paso 1 — Abrir sesión y orientar a Claude Code

```bash
cd cajaherramientaspymes
claude
```

Al iniciar, Claude Code cargará el `CLAUDE.md`. Luego, en el prompt interactivo:

```
> Lee el CLAUDE.md y el index.html completo. Cuando hayas terminado, 
  dime el estado actual del sitio: cuántas semanas hay por módulo, 
  qué terminología usa actualmente y qué vínculos de recursos están 
  apuntando a cuentas personales vs institucionales.
```

### Paso 2 — Dar la instrucción específica de cambio

Ejemplo para normalización terminológica:

```
> En index.html, reemplaza todas las ocurrencias de "modelo metodológico" 
  y "modelo" cuando se refieran al programa completo, por "Programa". 
  Usa la tabla de terminología del CLAUDE.md como guía. 
  Muéstrame los cambios propuestos (diff) antes de aplicarlos.
```

### Paso 3 — Revisar el diff antes de confirmar

Claude Code siempre te mostrará los cambios propuestos. **Nunca confirmes sin revisar.** Puedes decir:

```
> Muéstrame solo el diff de los cambios terminológicos antes de escribir al archivo.
```

### Paso 4 — Aplicar y hacer commit

```
> Aplica los cambios. Luego haz un git commit con el mensaje:
  "fix: normalización terminológica según Plan de Mejoras v1.0"
  No hagas push todavía.
```

### Paso 5 — Verificar y publicar

```bash
# Revisar el commit antes del push
git log --oneline -5
git diff HEAD~1

# Si todo está bien
git push origin main
```

GitHub Pages actualizará el sitio en ~1-2 minutos.

---

## 3. Instrucciones por tarea del plan de mejoras

### TAREA A — Normalización terminológica

```
> Abre index.html. Aplica la siguiente normalización terminológica en 
  todo el archivo, sin alterar el HTML estructural ni los atributos:

  1. "modelo metodológico" → "Programa" (con mayúscula)
  2. "modelo 70/30" → mantener (es la metodología, no el programa)
  3. "Modelo de Aprendizaje" → mantener como subtítulo de sección
  4. "Nuestra Metodología" → mantener
  5. Cualquier texto que diga "este modelo" refiriéndose al programa 
     completo → "este Programa"

  Muéstrame un diff antes de escribir.
```

---

### TAREA B — Agregar texto introductorio por módulo

```
> En index.html, ubica la sección del Módulo I (Diagnóstico Empresarial 
  con IA). Inmediatamente después del <h3> del módulo y antes del 
  bloque de la Semana 1, inserta un párrafo con la clase "modulo-intro":

  <p class="modulo-intro">
    Este módulo te equipa con las herramientas conceptuales y prácticas 
    para diagnosticar tu negocio con apoyo de IA generativa. En cuatro 
    semanas, pasarás de la configuración básica de las plataformas hasta 
    producir un plan de acción estratégico fundamentado en datos. 
    Enfoque: análisis, no automatización.
  </p>

  Haz lo mismo para el Módulo II con este texto:
  <p class="modulo-intro">
    La automatización tiene sentido solo cuando ya sabes qué proceso 
    quieres optimizar. Este módulo te enseña a construir flujos 
    automáticos sin programar, integrar un CRM básico y calcular el 
    retorno real de cada herramienta implementada.
  </p>

  Y para el Módulo III:
  <p class="modulo-intro">
    La visibilidad digital diferencia a los negocios que subsisten de 
    los que crecen. Aquí usarás IA para construir tu identidad visual, 
    producir contenido audiovisual profesional y lanzar tu primera 
    campaña integral con el framework AIDA.
  </p>

  Agrega también al CSS (en el <style> del head) la siguiente regla:
  .modulo-intro {
    font-size: 0.97rem;
    color: #555;
    line-height: 1.7;
    margin: 0.5rem 0 1.2rem 0;
    padding: 0.8rem 1rem;
    border-left: 3px solid #2E86C1;
    background: #f0f7ff;
    border-radius: 0 6px 6px 0;
  }
```

---

### TAREA C — Agregar lista de chequeo al final de cada módulo

```
> Al final del Módulo I (antes del cierre de su <section>), inserta 
  el siguiente bloque HTML de lista de chequeo:

  <div class="checklist-modulo">
    <h4>✅ Lista de chequeo — Módulo I</h4>
    <table>
      <thead>
        <tr>
          <th>Componente</th>
          <th>Herramienta</th>
          <th>Entregable</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Primer contacto con IA</td><td>ChatGPT, Claude, Gemini</td><td>Cuenta configurada</td></tr>
        <tr><td>Ingeniería de prompts</td><td>Modelo CIFRCE</td><td>5 prompts propios</td></tr>
        <tr><td>Diagnóstico FODA</td><td>ChatGPT (modo socrático)</td><td>FODA dinámico</td></tr>
        <tr><td>Plan de acción</td><td>IA generativa</td><td>Informe de diagnóstico</td></tr>
      </tbody>
    </table>
    <p class="checklist-next">▶ Siguiente: <a href="#modulo2">Módulo II — Automatización</a></p>
  </div>

  Agrega al CSS:
  .checklist-modulo {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem 1.2rem;
    margin-top: 1.5rem;
  }
  .checklist-modulo h4 { color: #003366; margin-bottom: 0.8rem; }
  .checklist-modulo table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .checklist-modulo th { background: #003366; color: white; padding: 6px 10px; text-align: left; }
  .checklist-modulo td { border-bottom: 1px solid #eee; padding: 5px 10px; }
  .checklist-next { margin-top: 0.8rem; font-size: 0.9rem; color: #555; }

  Genera las tablas equivalentes para Módulo II y III con los componentes 
  correspondientes de cada semana.
```

---

### TAREA D — Agregar Módulo 0 (diagnóstico de entrada)

```
> En index.html, antes de la sección del Módulo I, inserta una nueva 
  sección con id="modulo0". Usa esta estructura:

  <section id="modulo0" class="seccion-modulo modulo0">
    <div class="modulo-header modulo0-header">
      <span class="modulo-icono">🧭</span>
      <h2>Módulo 0: Diagnóstico de Entrada</h2>
      <p class="modulo-subtitulo">¿Por dónde empiezo? Encuentra tu ruta personalizada.</p>
    </div>
    <p class="modulo-intro">
      Antes de explorar las herramientas, este diagnóstico te ayuda a 
      identificar en qué etapa se encuentra tu emprendimiento y qué 
      módulos son más relevantes para ti ahora mismo. No es un examen: 
      es una brújula.
    </p>
    <div class="diagnostico-cta">
      <p><strong>¿Tu emprendimiento tiene ventas activas?</strong></p>
      <div class="rutas">
        <div class="ruta-card ruta-idea">
          <h3>🌱 Estoy en etapa de idea o validación</h3>
          <p>Comienza por el <strong>Toolkit 1</strong> (pre-operativo): validación de mercado, análisis de tendencias y encuestas de demanda.</p>
          <a href="#toolkit1" class="btn-ruta">Ir al Toolkit 1 →</a>
        </div>
        <div class="ruta-card ruta-operativo">
          <h3>🏢 Ya tengo un negocio en marcha</h3>
          <p>Empieza por el <strong>Módulo I</strong> de Diagnóstico Empresarial con IA para analizar y optimizar tu operación actual.</p>
          <a href="#modulo1" class="btn-ruta">Ir al Módulo I →</a>
        </div>
      </div>
      <p class="diagnostico-link">
        ¿Quieres un diagnóstico más preciso? 
        <a href="[ENLACE_GOOGLE_FORMS]" target="_blank" rel="noopener">
          Completa el diagnóstico completo (5 min) →
        </a>
      </p>
    </div>
  </section>

  Reemplaza [ENLACE_GOOGLE_FORMS] con el texto literal "[ENLACE_GOOGLE_FORMS]" 
  por ahora — lo actualizaré después con el enlace real.

  Agrega al CSS las siguientes reglas para este módulo:
  .modulo0-header { background: linear-gradient(135deg, #1A5276, #2E86C1); }
  .rutas { display: flex; gap: 1.2rem; margin: 1rem 0; flex-wrap: wrap; }
  .ruta-card { flex: 1; min-width: 220px; border-radius: 8px; padding: 1rem; }
  .ruta-idea { background: #eaf4ea; border-left: 4px solid #1E8449; }
  .ruta-operativo { background: #eaf0fb; border-left: 4px solid #1A5276; }
  .ruta-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
  .btn-ruta { display: inline-block; margin-top: 0.8rem; padding: 6px 14px; 
              background: #003366; color: white; border-radius: 4px; 
              text-decoration: none; font-size: 0.9rem; }
  .btn-ruta:hover { background: #1A5276; }
  .diagnostico-link { font-size: 0.9rem; color: #555; margin-top: 0.8rem; }
```

---

### TAREA E — Agregar Toolkit 1 (módulo pre-operativo)

```
> En index.html, después del Módulo 0 y antes del Módulo I, inserta 
  una nueva sección con id="toolkit1" siguiendo exactamente la misma 
  estructura visual que los módulos existentes pero con las semanas T1-S1 
  a T1-S4. El contenido de cada semana es:

  T1-S1: "Validación de idea y tendencias de mercado"
  - Temas: Google Trends, Exploding Topics, señales de demanda
  - Recursos: [por definir — dejar placeholder con comentario HTML]
  - Entregable: Análisis de tendencias del sector

  T1-S2: "Análisis de mercado y perfil de cliente"  
  - Temas: Segmentación, Buyer Persona, mapa de empatía con IA
  - Recursos: [por definir]
  - Entregable: Buyer Persona + mapa de empatía

  T1-S3: "Diseño y análisis de encuesta de validación primaria"
  - Temas: Encuestas con Google Forms, análisis con IA generativa
  - Recursos: [por definir]
  - Entregable: Informe de validación primaria

  T1-S4: "Estructura básica de modelo de negocio"
  - Temas: Business Model Canvas con IA como consultor socrático
  - Recursos: [por definir]
  - Entregable: Business Model Canvas preliminar

  En el header del Toolkit 1 usa el color de fondo: 
  background: linear-gradient(135deg, #1E8449, #27AE60);
  
  Agrega una nota institucional al final del Toolkit 1:
  <p class="nota-institucional">
    ⚠️ El Toolkit 1 está en desarrollo activo. 
    Los recursos estarán disponibles a partir de agosto 2025. 
    Proyecto conjunto: Auge – Observatorio del Desarrollo (CIOdD-UCR).
  </p>
```

---

### TAREA F — Actualizar atribución de asistentes virtuales

```
> En la sección "Asistentes para PYMEs (GPTs Especializados)" del 
  index.html, realiza los siguientes cambios:

  1. Cambia el título de la subsección de:
     "Asistentes para PYMEs (GPTs Especializados)"
     a:
     "Asistentes Virtuales Institucionales"

  2. Agrega inmediatamente después del título este párrafo:
     <p class="asistentes-nota">
       Los siguientes asistentes son recursos de apoyo del Programa. 
       Algunos se encuentran en proceso de migración a cuentas 
       institucionales UCR/Auge. Ante dudas sobre el respaldo 
       institucional de cada recurso, consulte a DIPROVID.
     </p>

  3. Para cada enlace de asistente que apunte a chatgpt.com/g/g-**** 
     (cuentas personales), agrega el atributo data-estado="migracion-pendiente"
     y una etiqueta visual:
     <span class="badge-migracion">⚠️ Migración pendiente</span>

  4. Agrega al CSS:
     .asistentes-nota { font-size: 0.88rem; color: #666; 
                        background: #fff8e1; border-left: 3px solid #D4AC0D;
                        padding: 0.6rem 1rem; margin-bottom: 1rem; 
                        border-radius: 0 4px 4px 0; }
     .badge-migracion { font-size: 0.75rem; background: #fff3cd; 
                        color: #856404; padding: 2px 6px; 
                        border-radius: 3px; margin-left: 6px; }

  Muéstrame el diff antes de aplicar.
```

---

### TAREA G — Actualizar pie de página institucional

```
> En el footer de index.html, actualiza el copyright para que diga:

  © 2025 Universidad de Costa Rica | CIOdD – DIPROVID | 
  Colaboración: Programa Auge (UCR)
  Proyecto de Acción Social ED-3698

  Mantén los enlaces existentes a Web CIOdD, DIPROVID y UCR.
  Agrega un enlace nuevo: 
  <a href="https://auge.ucr.ac.cr" target="_blank" rel="noopener">Web Auge</a>
```

---

## 4. Comandos de git para trabajar de forma segura

### Ver estado antes de cambios

```bash
git status
git diff index.html
```

### Trabajar en rama separada (recomendado para cambios grandes)

```bash
# Crear rama para el plan de mejoras
git checkout -b mejoras/plan-v1

# ... hacer cambios con Claude Code ...

# Cuando esté listo, fusionar a main
git checkout main
git merge mejoras/plan-v1
git push origin main
```

### Deshacer cambios si algo sale mal

```bash
# Deshacer cambios no confirmados (antes del commit)
git checkout -- index.html

# Deshacer el último commit (mantiene los archivos modificados)
git reset HEAD~1

# Volver a un commit anterior específico (destruye cambios — úsalo con cuidado)
git reset --hard <hash-del-commit>
```

### Ver historial de cambios

```bash
git log --oneline --graph -20
```

---

## 5. Verificación local antes del push

GitHub Pages sirve el sitio directamente desde los archivos HTML. Para previsualizar localmente:

```bash
# Opción 1 — Python (viene instalado en macOS/Linux)
python3 -m http.server 8000
# Abrir http://localhost:8000

# Opción 2 — Node.js
npx serve .
# Abrir la URL que indique
```

---

## 6. Mensajes de commit estándar para este proyecto

Usar el formato `tipo: descripción breve`:

| Tipo | Cuándo usarlo |
|------|--------------|
| `feat:` | Nueva sección, nuevo módulo, nuevo recurso |
| `fix:` | Corrección de texto, enlace roto, error tipográfico |
| `style:` | Cambios de CSS, colores, tipografía |
| `content:` | Actualización de contenido en módulos existentes |
| `refactor:` | Reorganización de HTML sin cambio de contenido visible |
| `docs:` | Actualización de CLAUDE.md u otros archivos de documentación |

Ejemplos:
```
feat: agregar Módulo 0 de diagnóstico de entrada
feat: agregar Toolkit 1 semanas T1-S1 a T1-S4
fix: normalización terminológica según Plan de Mejoras v1.0
content: agregar textos introductorios Módulos I, II y III
style: agregar estilos para listas de chequeo por módulo
fix: actualizar atribución asistentes virtuales institucionales
```

---

## 7. Checklist de revisión antes de publicar

Antes de cada `git push origin main`, verificar:

- [ ] El HTML es válido (sin etiquetas sin cerrar)
- [ ] Todos los enlaces a recursos externos funcionan
- [ ] Las imágenes de infografías cargan correctamente
- [ ] El sitio se ve bien en móvil (Inspector → modo responsive)
- [ ] No hay referencias a `[ENLACE_GOOGLE_FORMS]` sin reemplazar
- [ ] No hay referencias a `[por definir]` visibles en el sitio público
- [ ] El footer dice `© 2025 UCR` (no una fecha anterior)
- [ ] La terminología usa los términos de la tabla del `CLAUDE.md`

---

*Documento generado por el Observatorio del Desarrollo (CIOdD-UCR) — Plan de Mejoras Caja de Herramientas IA MiPYME v1.0*
