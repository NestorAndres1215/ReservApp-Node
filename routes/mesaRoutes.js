const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');
const verificarToken = require('../middlewares/auth');

router.post('/', verificarToken, mesaController.crearMesa);
router.get('/', verificarToken, mesaController.listarMesas);

module.exports = router;
