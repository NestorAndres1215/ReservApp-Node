const Restaurante = require('../models/Restaurante');

exports.crearRestaurante = async (req, res) => {
  const { nombre, direccion, telefono, email } = req.body;

  const nuevoRestaurante = new Restaurante({
    nombre,
    direccion,
    telefono,
    email
  });

  await nuevoRestaurante.save();
  res.status(201).json({ msg: 'Restaurante creado', restaurante: nuevoRestaurante });
};

exports.listarRestaurantes = async (req, res) => {
  const restaurantes = await Restaurante.find();
  res.json(restaurantes);
};
