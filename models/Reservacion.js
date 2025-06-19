const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  restauranteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
  mesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa', required: true },
  fecha: { type: String, required: true },  // formato: "2025-06-21"
  hora: { type: String, required: true },   // formato: "19:00"
  cantidadPersonas: { type: Number, required: true },
  comentario: { type: String },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
});

module.exports = mongoose.model('Reservacion', reservacionSchema);
