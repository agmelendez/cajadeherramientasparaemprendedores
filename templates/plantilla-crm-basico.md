# Plantilla: Estructura de CRM Básico con Datos de Prueba

Esta plantilla sirve para diseñar la estructura de tu CRM (Customer Relationship Management) utilizando datos de prueba ficticios. Recuerda **nunca** ingresar datos personales reales de clientes en herramientas de IA abiertas.

---

## 1. Estructura de Columnas Sugerida

| ID de Cliente | Nombre de Contacto (Ficticio) | Empresa / Negocio (Ficticio) | Correo Electrónico (Prueba) | Estado del Lead | Valor Estimado (₡) | Notas de Seguimiento |
|---|---|---|---|---|---|---|
| CLI-001 | Cliente Ficticio 1 | Verdulería La Parcela | cliente1@ejemplo.com | Contactado | 15.000 | Interesado en cotizar cajas mixtas mensuales. |
| CLI-002 | Cliente Ficticio 2 | Taller Mecánico Ruiz | cliente2@ejemplo.com | Propuesta Enviada | 85.000 | Esperando respuesta de presupuesto enviado el 10/06. |
| CLI-003 | Cliente Ficticio 3 | Salón de Belleza Glamour | cliente3@ejemplo.com | Lead Nuevo | 0 | Asignar llamada de presentación. |

---

## 2. Definición de Estados del Pipeline (Embudo de Ventas)
Asigna un estado claro a cada contacto para saber qué acción tomar:

1.  **Lead Nuevo:** El contacto mostró interés inicial (ej. llenó formulario) pero no hemos hablado.
2.  **Contactado:** Primera conversación realizada para entender sus necesidades.
3.  **Propuesta Enviada:** Le cotizamos un producto o servicio específico.
4.  **Ganado:** Compra realizada de forma exitosa.
5.  **Perdido:** El cliente declinó la oferta o no respondió tras seguimiento.

---

## 3. Protocolo de Privacidad del CRM
Antes de mover estos datos a una herramienta real en producción:
*   **[ ] Consentimiento:** Asegúrate de que los clientes reales hayan autorizado el almacenamiento de sus datos.
*   **[ ] Seguridad:** Si utilizas hojas de cálculo de Google o Excel, activa la autenticación de dos factores en tu cuenta.
*   **[ ] Cero IA abierta:** Nunca subas bases de datos reales completas a chats de IA gratuitos para análisis sin anonimizar los nombres e identificaciones primero.
