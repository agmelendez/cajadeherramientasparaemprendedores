// --- ESTADO.JS ---

const ESTADO_KEY = "cajaIA.estado.v3";

const Estado = {
  datos: null,

  init() {
    this.datos = this.cargarEstado();
  },

  getInitialState() {
    return {
      schemaVersion: 3,
      instaladoEn: new Date().toISOString(),
      actualizadoEn: new Date().toISOString(),
      perfil: "acelerada", // default
      diagnostico: {
        versionInstrumento: "2.2.0",
        completado: false,
        fechaInicio: null,
        fechaCompletado: null,
        respuestas: {},
        puntajes: {
          CD: null,
          AIA: null,
          AT: null,
          CUB: null,
          CME: null
        },
        resultado: {
          senda: null,
          nivelacionRequerida: false,
          moduloInicial: null,
          modulosRecomendados: [],
          modulosNoPrioritarios: [],
          testOutSugerido: [],
          ayudasActivas: [],
          confianzaClasificacion: null,
          justificacion: [],
          primerPaso: null
        }
      },
      progreso: {
        unidades: {}, // { "unit-id": { estado: "vista"|"completada", vistoEn: ISO, completadoEn: ISO } }
        semanas: {},  // { "semana-id": { estado: "en-curso"|"completada", porcentaje: 0, ultimaUnidad: "unit-id", autoevaluacion: {} } }
        modulos: {}   // { "modulo-id": { estado: "en-curso"|"completado", porcentaje: 0 } }
      },
      evidencias: {}, // { "unit-id": { url: "", nota: "", archivoLocalName: "", fecha: ISO } }
      competencias: {
        "cuentas-basicas": false,
        "seguridad-2fa": false,
        "uso-chatbot-basico": false,
        "prompting-basico": false,
        "no-code-basico": false,
        "datos-basicos": false
      },
      ultimaRuta: "#/inicio",
      insignias: [],
      preferencias: {
        glosarioSiempreVisible: false,
        modoAltoContraste: false,
        tamanoTexto: "normal"
      }
    };
  },

  cargarEstado() {
    try {
      const saved = localStorage.getItem(ESTADO_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic migration check
        if (parsed.schemaVersion === 3) {
          return parsed;
        } else {
          return this.migrarEstado(parsed);
        }
      }
    } catch (e) {
      console.error("No se pudo leer localStorage:", e);
    }
    return this.getInitialState();
  },

  guardar() {
    this.datos.actualizadoEn = new Date().toISOString();
    try {
      localStorage.setItem(ESTADO_KEY, JSON.stringify(this.datos));
    } catch (e) {
      console.error("No se pudo escribir en localStorage:", e);
    }
  },

  migrarEstado(anterior) {
    console.log("Migrando estado anterior a v3...");
    const nuevo = this.getInitialState();
    
    // Copy what is compatible
    if (anterior) {
      if (anterior.perfil) nuevo.perfil = anterior.perfil;
      if (anterior.diagnostico && anterior.diagnostico.respuestas) {
        nuevo.diagnostico.respuestas = { ...nuevo.diagnostico.respuestas, ...anterior.diagnostico.respuestas };
      }
      if (anterior.progreso) {
        nuevo.progreso = { ...nuevo.progreso, ...anterior.progreso };
      }
      if (anterior.evidencias) {
        nuevo.evidencias = { ...nuevo.evidencias, ...anterior.evidencias };
      }
      if (anterior.preferencias) {
        nuevo.preferencias = { ...nuevo.preferencias, ...anterior.preferencias };
      }
    }
    
    return nuevo;
  },

  guardarRespuesta(preguntaId, valor) {
    if (!this.datos.diagnostico.fechaInicio) {
      this.datos.diagnostico.fechaInicio = new Date().toISOString();
    }
    this.datos.diagnostico.respuestas[preguntaId] = valor;
    this.guardar();
  },

  marcarUnidadVista(unidadId) {
    if (!this.datos.progreso.unidades[unidadId]) {
      this.datos.progreso.unidades[unidadId] = {
        estado: "vista",
        vistoEn: new Date().toISOString(),
        completadoEn: null
      };
      this.guardar();
    }
  },

  marcarUnidadCompletada(unidadId) {
    const unidad = this.datos.progreso.unidades[unidadId] || { estado: "vista", vistoEn: new Date().toISOString() };
    unidad.estado = "completada";
    unidad.completadoEn = new Date().toISOString();
    this.datos.progreso.unidades[unidadId] = unidad;
    this.guardar();
  },

  guardarEvidencia(unidadId, url, nota, archivoName = "") {
    this.datos.evidencias[unidadId] = {
      url: url,
      nota: nota,
      archivoLocalName: archivoName,
      fecha: new Date().toISOString()
    };
    this.marcarUnidadCompletada(unidadId);
    this.guardar();
  },

  guardarAutoevaluacion(semanaId, evaluacion) {
    const sem = this.datos.progreso.semanas[semanaId] || { estado: "en-curso", porcentaje: 0 };
    sem.autoevaluacion = evaluacion;
    sem.estado = "completada";
    sem.completadaEn = new Date().toISOString();
    sem.porcentaje = 100;
    this.datos.progreso.semanas[semanaId] = sem;
    this.guardar();
  },

  resetearProgreso() {
    this.datos = this.getInitialState();
    this.guardar();
  },

  exportarJSON() {
    return JSON.stringify(this.datos, null, 2);
  },

  importarJSON(str) {
    try {
      const parsed = JSON.parse(str);
      if (parsed && parsed.schemaVersion) {
        this.datos = parsed;
        this.guardar();
        return true;
      }
    } catch (e) {
      console.error("JSON inválido para importar:", e);
    }
    return false;
  }
};
