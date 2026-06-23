# Casos de Prueba del Clasificador de Autodiagnóstico

Este documento detalla los 5 casos de prueba sintéticos utilizados para validar las reglas de clasificación del autodiagnóstico del programa **Caja de Herramientas de IA para MiPYMEs**.

Las dimensiones evaluadas son:
- **CD**: Competencia Digital
- **AIA**: Adopción de Inteligencia Artificial
- **AT**: Acceso Tecnológico
- **CUB**: Contexto de Uso de Negocio
- **CME**: Contexto de Madurez y Esfuerzo

---

## Detalle de los Casos de Prueba

### Caso 1: Cero Tech
- **Descripción**: Emprendedor con nulo conocimiento digital y tecnológico. Proyecto en fase de idea preliminar.
- **Respuestas Clave**:
  - `q01`-`q08` (Likert 0-4): Todos 0 (Competencias mínimas).
  - `q16` (Madurez): 0 (Solo una idea).
  - `q20` (Urgencia): 1 (Validar idea/mercado).
- **Resultados Esperados**:
  - **Puntajes**: CD: 0%, AIA: 0%, AT: 25%, CME: 0%
  - **Senda de Acompañamiento**: `guiada` (Nivelación básica requerida)
  - **Módulo Inicial**: `m1`
  - **Estado**: ✅ OK

### Caso 2: Idea Nueva
- **Descripción**: Profesional digitalmente competente que quiere lanzar una nueva idea de negocio.
- **Respuestas Clave**:
  - `q01`-`q04` (CD): Alto (3, 3, 3, 3).
  - `q05`-`q08` (AIA): Medio (2, 2, 2, 2).
  - `q16` (Madurez): 0 (Solo una idea).
  - `q20` (Urgencia): 1 (Validar idea/mercado).
- **Resultados Esperados**:
  - **Puntajes**: CD: 75%, AIA: 50%, AT: 75%, CME: 19%
  - **Senda de Acompañamiento**: `acelerada`
  - **Módulo Inicial**: `m1`
  - **Estado**: ✅ OK

### Caso 3: Negocio Activo
- **Descripción**: Negocio tradicional en marcha que necesita orden operativo y financiero.
- **Respuestas Clave**:
  - `q01`-`q04` (CD): Alto (3, 3, 3, 3).
  - `q05`-`q08` (AIA): Medio (2, 2, 3, 2).
  - `q16` (Madurez): 3 (Operando con clientes).
  - `q19` (Registro financiero): 1 (Bajo o nulo).
  - `q20` (Urgencia): 2 (Diagnosticar empresa y ordenar números).
- **Resultados Esperados**:
  - **Puntajes**: CD: 75%, AIA: 56%, AT: 75%, CME: 62%
  - **Senda de Acompañamiento**: `acelerada`
  - **Módulo Inicial**: `m2`
  - **Estado**: ✅ OK

### Caso 4: Tareas Repetitivas
- **Descripción**: Negocio con bases digitales y procesos manuales lentos que busca automatizar tareas repetitivas.
- **Respuestas Clave**:
  - `q01`-`q04` (CD): Alto (3, 3, 3, 3).
  - `q05`-`q08` (AIA): Medio-Alto (3, 2, 3, 2).
  - `q13` (Procesos repetitivos): 4 (Extremadamente repetitivos).
  - `q20` (Urgencia): 3 (Automatizar procesos y ahorrar tiempo).
- **Resultados Esperados**:
  - **Puntajes**: CD: 75%, AIA: 62%, AT: 75%, CME: 75%
  - **Senda de Acompañamiento**: `acelerada`
  - **Módulo Inicial**: `m3`
  - **Estado**: ✅ OK

### Caso 5: Avanzado
- **Descripción**: Negocio maduro con alta competencia digital que busca potenciar sus ventas mediante marketing con IA y análisis de datos comerciales.
- **Respuestas Clave**:
  - `q01`-`q08` (Competencias): Máximas (4, 4, 4, 4, 4, 3, 3, 3).
  - `q13` (Procesos repetitivos): 3.
  - `q14` (Interés en marketing): 4.
  - `q16` (Madurez): 4 (Empresa formal con equipo).
  - `q20` (Urgencia): 4 (Aumentar ventas y decidir con datos).
- **Resultados Esperados**:
  - **Puntajes**: CD: 100%, AIA: 81%, AT: 100%, CME: 100%
  - **Senda de Acompañamiento**: `profunda`
  - **Módulo Inicial**: `m4`
  - **Estado**: ✅ OK

---

## Verificación de Integridad

El clasificador determinista está implementado en [clasificador.js](file:///Users/agustingomez/Downloads/0%20CajaPymes%20Estudiante/assets/js/clasificador.js) y se valida periódicamente contra el script automatizado [test_classifier.py](file:///Users/agustingomez/.gemini/antigravity/brain/73ce62a3-4fcc-4d54-ad1c-40bad09267ba/scratch/test_classifier.py).

Última corrida de prueba: **Pasaron todos los casos de forma exitosa (100% OK).**
