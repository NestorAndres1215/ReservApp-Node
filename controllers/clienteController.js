const Cliente = require('../models/Cliente');

exports.crearCliente = async (req, res) => {
  const { nombre, telefono, email } = req.body;
  const nuevo = new Cliente({ nombre, telefono, email });
  await nuevo.save();
  res.status(201).json({ msg: 'Cliente creado', cliente: nuevo });
};

exports.listarClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

