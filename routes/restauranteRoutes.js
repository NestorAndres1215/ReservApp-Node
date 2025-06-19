const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');
const verificarToken = require('../middlewares/auth');

router.post('/', verificarToken, restauranteController.crearRestaurante);
router.get('/', verificarToken, restauranteController.listarRestaurantes);

module.exports = router;
