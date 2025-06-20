const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Rutas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const reservacionRoutes = require('./routes/reservacionRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');

const app = express();
const engine = require('ejs-mate');
app.engine('ejs', engine); // usa ejs-mate
// Conexión a MongoDB
connectDB();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// Middlewares
app.use(express.json());
app.use(cookieParser());
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// Ruta de prueba

app.use(express.json()); // Para peticiones JSON
app.use(express.urlencoded({ extended: true })); // Para formularios tipo x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Usar rutas
app.use('/', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservaciones', reservacionRoutes);
app.use('/mesas', mesaRoutes);
app.use('/restaurantes', restauranteRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
