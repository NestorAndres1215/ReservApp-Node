const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const JWT_SECRET = 'una_clave_secreta_bien_larga';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).send('Usuario no encontrado');

  const validPassword = await bcrypt.compare(password, usuario.password);
  if (!validPassword) return res.status(400).send('Contraseña incorrecta');

  const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'una_clave_secreta_bien_larga');
  res.cookie('token', token, { httpOnly: true });

  res.redirect('/home');
};

exports.register = async (req, res) => {
  console.log(req.body)
  const { nombre, email, password, rol } = req.body;
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

  const hashed = await bcrypt.hash(password, 10);
  const rolNormalizado = rol.toUpperCase();
  const nuevo = new Usuario({ nombre, email, password: hashed, rol: rolNormalizado });

  await nuevo.save();

  res.redirect('/login')
};
