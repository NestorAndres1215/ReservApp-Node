const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  capacidad: { type: Number, required: true },
  ubicacion: { type: String },
  estado: { type: String, enum: ['disponible', 'reservada'], default: 'disponible' },
  restauranteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true }
});

module.exports = mongoose.model('Mesa', mesaSchema);
