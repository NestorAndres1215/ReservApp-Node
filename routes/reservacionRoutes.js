const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/reservacionController');
const { validarReservacion } = require('../middlewares/validarCampos');
const verificarToken = require('../middlewares/auth');

router.post('/', verificarToken, validarReservacion, reservacionController.crearReservacion);
router.get('/', verificarToken, reservacionController.listarReservaciones);

module.exports = router;
