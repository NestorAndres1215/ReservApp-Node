const Mesa = require('../models/Mesa');

exports.crearMesa = async (req, res) => {
  const { numero, capacidad, ubicacion, restauranteId } = req.body;

  const nuevaMesa = new Mesa({
    numero,
    capacidad,
    ubicacion,
    restauranteId
  });

  await nuevaMesa.save();
  res.status(201).json({ msg: 'Mesa creada', mesa: nuevaMesa });
};

exports.listarMesas = async (req, res) => {
  const mesas = await Mesa.find().populate('restauranteId');
  res.json(mesas);
};
