# Caja de Herramientas de Inteligencia Artificial para la MiPYME

![Banner UCR](logos/ucr.png)

Este repositorio contiene el sitio web oficial de la **Caja de Herramientas de Inteligencia Artificial para la MiPYME**, una iniciativa institucional de la **Universidad de Costa Rica (UCR)** liderada por el **Centro de Investigación en Observación y Difusión Digital (CIOdD)** y la **Dirección de Promoción de la Vinculación para el Desarrollo (DIPROVID)**, en colaboración activa con el **Programa AUGE (UCR)**.

El objetivo de esta herramienta es guiar a micro, pequeños y medianos empresarios en la adopción práctica, ética y progresiva de la Inteligencia Artificial como un acelerador de negocios, bajo la filosofía de **"Proceso primero, herramienta después"**.

🌐 **Enlace del Sitio en Producción:** [https://agmelendez.github.io/cajaherramientaspymes/](https://agmelendez.github.io/cajaherramientaspymes/)

---

## 📌 Estructura del Programa

La plataforma está estructurada de forma modular interactiva para guiar al emprendedor según su nivel de madurez:

1.  **Módulo 0: Diagnóstico de Entrada:**
    Un cuestionario interactivo de 3 ejes (madurez del negocio, tipo de necesidad de herramientas, experiencia previa con IA) que calcula y recomienda una ruta personalizada de aprendizaje.
2.  **Toolkit 1: Pre-Operativo (Nivel Gratuito — 4 Semanas):**
    Enfocado en la validación de ideas de negocio, análisis de tendencias con IA, perfilado de clientes y definición del Canvas de modelo de negocio básico. Al completarlo, los usuarios obtienen una **Insignia Digital** (microcredencial).
3.  **Módulo I: Diagnóstico de IA (Semanas 1 a 4):**
    Configuración inicial de entornos de IA, metodologías estructuradas de prompt engineering (**Modelo CIFRCE**), análisis FODA dinámico y diseño de Planes de Acción.
4.  **Módulo II: Automatización (Semanas 5 a 8):**
    Introducción al No-code, implementación de asistentes virtuales institucionales (chatbots), integración de CRM y cálculo del Retorno de Inversión (ROI).
5.  **Módulo III: Comercialización (Semanas 9 a 12):**
    Desarrollo de identidad visual, creación de contenidos audiovisuales y avatares con IA, análisis de viabilidad técnica y estructuración de campañas bajo el modelo AIDA.
6.  **Biblioteca de Recursos:**
    Acceso centralizado a guías maestras, tutoriales y plantillas recomendadas.

---

## 🛠️ Tecnologías y Arquitectura del Sitio

El sitio está construido siguiendo principios de diseño ligero, rápido y altamente accesible:
*   **HTML5 Semántico:** Estructuración robusta del contenido.
*   **Vanilla CSS3:** Hojas de estilo personalizadas con la paleta de colores oficial de la UCR (Azul UCR `#003366`, Azul Medio `#1A5276`, Azul Claro `#2E86C1`).
*   **Vanilla JavaScript:** Lógica interactiva nativa para navegación, filtrado de secciones, lightbox de infografías y el enrutador del diagnóstico de entrada. **Sin frameworks ni dependencias de construcción (build steps).**

---

## 🔒 Estándares de Ciberseguridad y Optimización

Como parte de una auditoría de seguridad integral a nivel de código frontend, se han integrado los siguientes componentes:

*   **Política de Seguridad del Contenido (CSP):** Bloqueo de inyecciones de código (XSS) mediante una etiqueta meta CSP (`script-src 'self'`). Toda lógica interactiva está confinada en archivos estáticos locales.
*   **Subresource Integrity (SRI) y CORS:** El CDN externo de iconos (FontAwesome) está protegido con firmas hash criptográficas (`integrity` y `crossorigin`) para evitar la carga de scripts manipulados.
*   **Protección contra Clickjacking:** Bloqueo de enmarcado malicioso mediante lógica frame-busting en el navegador.
*   **Referrer-Policy:** Configurado en `strict-origin-when-cross-origin` para proteger la privacidad de los datos de navegación y evitar fugas de información hacia enlaces salientes.
*   **Seguridad de Enlaces (Reverse Tabnabbing):** Todos los enlaces con `target="_blank"` implementan `rel="noopener noreferrer"`.
*   **Optimización SEO & Social Cards:** Configuración de etiquetas Meta Description, etiquetas Canonical y protocolo Open Graph / Twitter Cards para indexación limpia y generación automática de vistas previas profesionales en redes sociales.

---

## 📂 Organización de Archivos

```
/
├── index.html              # Página y contenidos principales interactivos
├── script.js               # Lógica interactiva, navegación y diagnóstico
├── styles.css              # Sistema de diseño, adaptabilidad móvil y estilos
├── Infografias/            # PNGs de las infografías del programa por semana
├── logos/                  # Logos oficiales protegidos (UCR, CIOdD, DIPROVID)
├── README.md               # Documentación general (este archivo)
└── CLAUDE.md               # Guía de desarrollo y restricciones técnicas
```

---

## 🚀 Instrucciones de Despliegue en GitHub Pages

Para publicar o actualizar el sitio utilizando **GitHub Pages**:

1.  **Subir los archivos:** Asegúrate de realizar el commit y push de todos los archivos del directorio raíz a la rama principal (`main`) de tu repositorio en GitHub.
2.  **Configurar GitHub Pages:**
    *   Ve a la pestaña de **Settings** (Configuración) de tu repositorio en GitHub.
    *   En el menú de navegación izquierdo, selecciona **Pages** (Páginas).
    *   Bajo la sección **Build and deployment**, selecciona la fuente: `Deploy from a branch`.
    *   En la rama, selecciona `main` y la carpeta `/ (root)`.
    *   Haz clic en **Save** (Guardar).
3.  **Verificación:** GitHub generará un flujo de trabajo automatizado (GitHub Actions) y en unos segundos tu sitio estará en línea en la dirección asignada.

---

## 📄 Licencia y Derechos de Autor

© Universidad de Costa Rica - Centro de Investigación en Observación y Difusión Digital (CIOdD) / Dirección de Promoción de la Vinculación para el Desarrollo (DIPROVID). Todos los derechos reservados.
