const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarLogin } = require('../middlewares/validarCampos');
const verificarToken = require('../middlewares/auth'); // <-- esta línea era la que faltaba

router.post('/login', validarLogin, authController.login);
router.post('/register', authController.register);

router.get('/home', verificarToken, (req, res) => {
  res.render('home', { usuario: req.usuario });
});


router.get('/register', (req, res) => {
  res.render('register');
});
// Mostrar login
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
