const { validationResult } = require('express-validator');

// Middleware para mostrar errores de validación
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Validaciones para login
const { check } = require('express-validator');

const validarLogin = [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
];

// Validaciones para cliente
const validarCliente = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
  check('email', 'El email no es válido').isEmail(),
  validarCampos
];

// Validaciones para reservación
const validarReservacion = [
  check('clienteId', 'clienteId es obligatorio').not().isEmpty(),
  check('mesaId', 'mesaId es obligatorio').not().isEmpty(),
  check('restauranteId', 'restauranteId es obligatorio').not().isEmpty(),
  check('fecha', 'fecha es obligatoria').not().isEmpty(),
  check('hora', 'hora es obligatoria').not().isEmpty(),
  check('cantidadPersonas', 'cantidadPersonas debe ser un número').isNumeric(),
  validarCampos
];

module.exports = {
  validarCampos,
  validarLogin,
  validarCliente,
  validarReservacion
};
