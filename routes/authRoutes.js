const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarLogin } = require('../middlewares/validarCampos');
const verificarToken = require('../middlewares/auth'); // <-- esta línea era la que faltaba

router.post('/login', validarLogin, authController.login);
router.post('/register', authController.register);
router.post('/register-empleado', authController.registerEmpleado);
router.get('/empleados', authController.listarEmpleados);
router.get('/empleados/:nombre/editar', authController.editarEmpleado);
router.delete('/empleados/:nombre', authController.eliminarEmpleado);
router.get('/home', verificarToken, (req, res) => {
  res.render('home', { usuario: req.usuario });
});
router.get('/admin', (req, res) => {
  res.render('admin');
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
router.get('/empleados', (req, res) => {
  res.render('empleados');
});
router.get('/empleados/nuevo', verificarToken, (req, res) => {
  res.render('formEmpleado', { empleado: null }); // ✅ Esto evita el error
});



module.exports = router;
