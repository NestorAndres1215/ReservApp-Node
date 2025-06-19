# 🍽️ ReservApp Node

**ReservApp** es un sistema completo de **reservación de mesas** para restaurantes, desarrollado en **Node.js**, con autenticación JWT, motor de vistas EJS y base de datos MongoDB.

---

## 🚀 Características

- Registro e inicio de sesión de usuarios con rol (`ADMIN`, `EMPLEADO`)
- Autenticación con JWT y cookies seguras
- Panel de usuario protegido (requiere login)
- CRUD de:
  - 🧍 Clientes
  - 🏨 Restaurantes
  - 🍽️ Mesas
  - 🗓️ Reservaciones
- Vistas renderizadas con EJS
- Validaciones con `express-validator`
- Envío de correo de confirmación al reservar (próximamente)

---

## 🛠️ Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express-validator](https://express-validator.github.io/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [nodemailer](https://nodemailer.com/) (opcional)
