const Reservacion = require('../models/Reservacion');
const Cliente = require('../models/Cliente');
const Mesa = require('../models/Mesa');
const Restaurante = require('../models/Restaurante');
const { enviarCorreoConfirmacion } = require('../services/correoService');

exports.crearReservacion = async (req, res) => {
  const { clienteId, mesaId, restauranteId, fecha, hora, cantidadPersonas, comentario } = req.body;

  const reservacion = new Reservacion({
    clienteId,
    mesaId,
    restauranteId,
    fecha,
    hora,
    cantidadPersonas,
    comentario
  });

  await reservacion.save();

  // Buscar cliente para obtener su email
  const cliente = await Cliente.findById(clienteId);
  if (cliente && cliente.email) {
    await enviarCorreoConfirmacion(cliente.email, { fecha, hora, cantidadPersonas, comentario });
  }

  res.status(201).json({ msg: 'Reservación creada', reservacion });
};

exports.listarReservaciones = async (req, res) => {
  const reservas = await Reservacion.find()
    .populate('clienteId mesaId restauranteId');
  res.json(reservas);
};
