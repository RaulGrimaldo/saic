const mongoose = require('mongoose');

const ConsecutiveSchema = new mongoose.Schema({
  jud:{
    type: String,
    required: false
  },
  consecutivo: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('consecutive', ConsecutiveSchema);