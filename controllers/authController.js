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

  // 🔁 Redirigir según el rol
  if (usuario.rol === 'ADMIN') {
    res.redirect('/admin');
  } else if (usuario.rol === 'EMPLEADO') {
    res.redirect('/empleado');
  } else {
    res.status(403).send('Rol no autorizado');
  }
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


exports.registerEmpleado = async (req, res) => {
  console.log(req.body)
  const { nombre, email, password } = req.body;
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

  const hashed = await bcrypt.hash(password, 10);
  const rolNormalizado = 'EMPLEADO';
  const nuevo = new Usuario({ nombre, email, password: hashed, rol: rolNormalizado });

  await nuevo.save();

  res.redirect('/empleados')
};
exports.listarEmpleados = async (req, res) => {
  try {
    const empleados = await Usuario.find({ rol: 'EMPLEADO' });
    res.render('empleados', { empleados }); // ✅ Aquí sí se pasa correctamente
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener empleados');
  }
};




exports.editarEmpleado = async (req, res) => {

  try {
    console.log(req.params.nombre);
    const usuario = await Usuario.findOne({ nombre: req.params.nombre });
    console.log(usuario);
    if (!usuario || usuario.rol !== 'EMPLEADO') {
      return res.status(404).send('Empleado no encontrado');
    }

    res.render('formEmpleado', { empleado: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar el empleado');
  }
};
exports.eliminarEmpleado = async (req, res) => {
  try {
    await Usuario.findOneAndDelete({ nombre: req.params.nombre });
    res.status(200).json({ mensaje: 'Empleado eliminado correctamente' }); // ✅ responde con JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar empleado' }); // ✅ responde con JSON
  }
};