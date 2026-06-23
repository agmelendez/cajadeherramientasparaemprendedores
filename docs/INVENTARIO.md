# Inventario Técnico - Caja de Herramientas de IA para MiPYMES

Este inventario técnico documenta el estado inicial del repositorio antes de iniciar la refactorización modular.

## 1. Árbol de Archivos de Entrada
* `index.html` (262 KB, 3516 líneas): Archivo principal que contiene la maquetación y la totalidad del currículo académico.
* `script.js` (33 KB, 775 líneas): Código JavaScript original que controla la navegación, el lightbox, el asistente virtual y el autodiagnóstico de 3 preguntas.
* `styles.css` (32 KB, 1853 líneas): Hoja de estilos original con tokens de marca de la UCR, estilos de rejilla y responsivos.
* `document-styles.css` (11 KB, 400 líneas): Estilos aplicados a documentos auxiliares (plantillas/rúbricas).
* `build_interactive_docs.py` (27 KB): Script que genera los HTML interactivos correspondientes a plantillas y rúbricas desde Markdown.
* `CHANGELOG.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `README.md`, `LICENSE.md`: Archivos de documentación del repositorio.

## 2. Directorios y Contenidos de Recursos
* `rubricas/`: Contiene rúbricas específicas en Markdown y HTML.
* `templates/`: Contiene plantillas interactivas en Markdown y HTML (como el Canvas Socrático y FODA).
* `politicas/`: Contiene documentos de políticas éticas e institucionales en Markdown y HTML.
* `logos/`: Logos corporativos e institucionales de la UCR y AUGE.
* `Infografias/`: Carpeta con infografías originales de apoyo didáctico.

## 3. Dependencias de Terceros (CDN)
* FontAwesome v6.4.0 (iconografía).
* Google Fonts (Roboto, Montserrat, Outfit).

## 4. Anclas Históricas Identificadas
* `#modulo0` -> Módulo 0 (Diagnóstico).
* `#toolkit1` -> Toolkit Pre-Operativo (Módulo 1).
* `#modulo1` -> Módulo I (Módulo 2).
* `#modulo2` -> Módulo II (Módulo 3).
* `#modulo3` -> Módulo III (Módulo 4).
* `#t1-s1` a `#t1-s4` -> Semanas del Toolkit 1.
* `#m1-s1` a `#m1-s4` -> Semanas del Módulo 1.
* `#m2-s5` a `#m2-s8` -> Semanas del Módulo 2.
* `#m3-s9` a `#m3-s12` -> Semanas del Módulo 3.
* `#portafolio-evidencias`, `#credenciales`, `#recursos`.
