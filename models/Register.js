const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
      ID: {
        type: String,
        required: true
      },
      excluir: {
        type: Boolean,
        required: false
      },
      fechacreacion: {
        type: String,
        required: false
      },
      capturista: {
        type: String,
        required: false
      },
      userid: {
        type: String,
        required: false
      },
      fechadinamica: {
        type: String,
        required: false
      },
      fecharango: {
        type: String,
        required: false
      },
      Enviado: {
        type: String,
        required: false
      },
      mesrango: {
        type: String,
        required: false,
      },
      aniorango: {
        type: String,
        required: false,
      },
      nombremesrango: {
        type: String,
        required: false,
      },
      Quincena: {
        type: String,
        required: false,
      },
      QuincenaNum: {
        type: String,
        required: false,
      },
      rangofinal: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      Secretaria: {
        type: String,
        required: false
      },
      Subsecretaria: {
        type: String,
        required: false
      },
      Direcciongeneral: {
        type: String,
        required: false
      },
      Direccion: {
        type: String,
        required: false
      },
      SubDireccion: {
        type: String,
        required: false
      },
      JUD: {
        type: String,
        required: false,
      },
      Tipo: {
        type: String,
        required: false
      },
      Actividad: {
        type: String,
        required: false
      },
      Rubro: {
        type: String,
        required: false
      },
      Subrubro: {
        type: String,
        required: false
      },
      observaciones: {
        type: String,
        required: false
      },
      TemasTratados: {
        type: String,
        required: false
      },
      Acuerdos: {
        type: String,
        required: false
      },
      foliosasociados: {
        type: String,
        required: false
      },
      grupovulnerable: {
        type: String,
        required: false
      },
      otrasareas: {
        type: String,
        required: false
      },
      actividadusec: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadalcoholimetro: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadmultiplicadores: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaddse: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaderum: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadbva: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadcvm: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadddh: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaddsb: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadsct: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadddsi: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaddgcse: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaddgicot: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaducs: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadsopaft: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadsdicp: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadccsjcdmx: {
        type: Array,
        required: false,
        default: undefined
      },
      actividadcdhcdmx: {
        type: Array,
        required: false,
        default: undefined
      },
      actividaddgpd: {
        type: Array,
        required: false,
        default: undefined
      }, 
      Solicitudes: {
        type: Number,
        required: false
      },
      institucion: {
        type: String,
        required: false
      },
      Calle: {
        type: String,
        required: false
      },
      Numero: {
        type: String,
        required: false
      },
      turno: {
        type: String,
        required: false
      },
      Alcaldia: {
        type: String,
        required: false
      },
      Colonia: {
        type: String,
        required: false
      },
      Cuadrante: {
        type: String,
        required: false
      },
      sector: {
        type: String,
        required: false
      },
      coordx: {
        type: Number,
        required: false
      },
      coordy: {
        type: Number,
        required: false
      },
      Contacto: {
        type: String,
        required: false
      },
      Cargo: {
        type: String,
        required: false
      },
      Email: {
        type: String,
        required: false
      },
      Telefono: {
        type: String,
        required: false
      },
      asistentesmujeres: {
        type: Number,
        required: false
      },
      asistenteshombres: {
        type: Number,
        required: false
      },
      Asistentes: {
        type: Number,
        required: false
      },
      asistentes014: {
        type: Number,
        required: false
      },
      asistentes1518: {
        type: Number,
        required: false
      },
      asistentes1965: {
        type: Number,
        required: false
      },
      asistentes65mas: {
        type: Number,
        required: false
      },
      imgtotal: {
        type: Number,
        required: false
      },
      img1: {
        type: String,
        required: false
      },
      img2: {
        type: String,
        required: false
      },
      Etapa: {
        type: Number,
        required: false
      },
      descclas: {
        type: String,
        required: false
      },
      nomclas: {
        type: String,
        required: false
      },
      uniclas: {
        type: String,
        required: false
      },
      areaclas: {
        type: String,
        required: false
      },
      temaclas: {
        type: String,
        required: false
      },
      clasificado: {
        type: Boolean,
        required: false
      },
      clasificadonombre: {
        type: String,
        required: false
      },
      Send: {
        type: Boolean,
        required: false
      },
      historial: {
        type: String,
        required: false
      },
      estadogeneral: {
        type: String,
        required: false
      },
      emailcancela: {
        type: String,
        required: false
      },
      validasub: {
        type: Boolean,
        required: false
      },
      validasubnombre: {
        type: String,
        required: false
      },   
      idpersona1: {
        type: String,
        required: false
      },
      nombrepersona1: {
        type: String,
        required: false
      },
      datospersona1: {
        type: String,
        required: false
      },
      idpersona2: {
        type: String,
        required: false
      },
      nombrepersona2: {
        type: String,
        required: false
      },
      datospersona2: {
        type: String,
        required: false
      },
      idpersona3: {
        type: String,
        required: false
      },
      nombrepersona3: {
        type: String,
        required: false
      },
      datospersona3: {
        type: String,
        required: false
      },
      idpersona4: {
        type: String,
        required: false
      },
      nombrepersona4: {
        type: String,
        required: false
      },
      datospersona4: {
        type: String,
        required: false
      },
      idpersona5: {
        type: String,
        required: false
      },
      nombrepersona5: {
        type: String,
        required: false
      },
      datospersona5: {
        type: String,
        required: false
      },
      idpersona6: {
        type: String,
        required: false
      },
      nombrepersona6: {
        type: String,
        required: false
      },
      datospersona6: {
        type: String,
        required: false
      },
      idpersona7: {
        type: String,
        required: false
      },
      nombrepersona7: {
        type: String,
        required: false
      },
      datospersona7: {
        type: String,
        required: false
      },
      idpersona8: {
        type: String,
        required: false
      },
      nombrepersona8: {
        type: String,
        required: false
      },
      datospersona8: {
        type: String,
        required: false
      },
      Nivel: {
        type: Number,
        required: false
      },
      catalogogeneral: {
        type: String,
        required: false
      },
      publicodirigido: {
        type: String,
        required: false
      },
      programa1: {
        type: String,
        required: false
      },
      programa2: {
        type: String,
        required: false
      },
      programa3: {
        type: String,
        required: false
      },
      estrategia: {
        type: String,
        required: false
      },

      matricula: {
        type: Number,
        required: false
      },
      claveCCT: {
        type: String,
        required: false
      },
      sectoreducativo: {
        type: String,
        required: false
      }  
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;