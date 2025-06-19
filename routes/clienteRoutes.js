const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { validarCliente } = require('../middlewares/validarCampos');
const verificarToken = require('../middlewares/auth');

router.post('/', verificarToken, validarCliente, clienteController.crearCliente);
router.get('/', verificarToken, clienteController.listarClientes);

module.exports = router;
