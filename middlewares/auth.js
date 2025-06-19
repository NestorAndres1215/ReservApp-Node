const jwt = require('jsonwebtoken');

const JWT_SECRET = 'una_clave_secreta_bien_larga';

const verificarToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: 'Acceso denegado. No hay token.' });

  try {
    const decodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = verificarToken;
