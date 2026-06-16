# Guía de contribución

¡Gracias por tu interés en contribuir a la **Caja de Herramientas de IA para la MiPYME**! Este es un proyecto de acción social y educativa enfocado en apoyar al sector productivo costarricense en su adopción tecnológica responsable.

## Tipos de contribución aceptadas

Aceptamos y agradecemos contribuciones en las siguientes áreas:
- **Mejoras didácticas:** Ajustes de redacción, lenguaje simplificado o ejemplos prácticos contextualizados a microempresas.
- **Accesibilidad web (A11y):** Reportes y parches para alinear el sitio estático indexado a las pautas WCAG 2.2 AA.
- **Plantillas y herramientas:** Nuevas estructuras descargables en formato abierto para acelerar los entregables de los módulos.
- **Enlaces de recursos:** Reporte de enlaces rotos, guías complementarias o tutoriales oficiales adicionales.
- **Casos de éxito y validación:** Ejemplos reales de aplicación para ilustrar el portafolio de evidencias.

## Criterios para aceptar cambios

Para mantener la integridad y la calidad del programa, toda propuesta de cambio debe cumplir con:

1. **Enfoque Human-in-the-Loop:** La IA se presenta siempre como asistente o copiloto del proceso, nunca como un tomador de decisiones estratégico autónomo.
2. **Privacidad por defecto:** Ninguna actividad debe sugerir o forzar el ingreso de datos personales identificables, secretos industriales o credenciales reales en sistemas de IA públicos.
3. **Cero promesas de resultados:** Se debe evitar el lenguaje que sugiera que el uso de IA garantiza ganancias, ventas automáticas o éxito empresarial inmediato.
4. **Coherencia metodológica:** Los cambios deben alinearse y respetar el ciclo didáctico RHEC (Reto, Hacer, Entender, Compartir) y el modelo de prompting CIFRCE.
5. **Simplicidad de dependencias:** El front-end interactivo debe mantenerse puramente estático (Vanilla HTML, CSS y JS sin compiladores de framework ni dependencias pesadas en producción).

## Cómo contribuir

1. **Reportar un problema:** Si encontrás un error técnico, de accesibilidad o conceptual, abrí un *Issue* en el repositorio describiendo la sección afectada y tu sugerencia de corrección.
2. **Enviar mejoras (Pull Requests):**
   - Hacé un *Fork* del repositorio.
   - Creá una rama descriptiva para tu cambio (ej: `fix/accesibilidad-menu` o `add/plantilla-costos`).
   - Realizá tus cambios asegurando no alterar los identificadores de routing (`#modulo1`, `#m2-s5`, etc.) para evitar romper el script `script.js`.
   - Enviá el *Pull Request* para que sea revisado y validado por la coordinación académica.
