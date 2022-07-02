const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  numeroEmpleadoPlaca: {
    type: String,
    required: false
  },
  phonenumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  secretaria: {
    type: String,
    required: false
  },
  subsecretaria: {
    type: String,
    required: false
  },
  direcciongeneral: {
    type: String,
    required: false
  },
  direccion: {
    type: String,
    required: false
  },
  subdireccion: {
    type: String,
    required: false
  },
  jud: {
    type: String,
    required: false
  },
  mirror: {
    type: Boolean,
    required: false
  },
  espejo: {
    type: String,
    required: false
  },
  Nivel: {
    type: String,
    required: false
  },
  main: {
    type: String,
    required: false
  },
  ROL: {
    type: String,
    required: false
  },
  baseURL: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: false
  },
  activo: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('user', UserSchema);