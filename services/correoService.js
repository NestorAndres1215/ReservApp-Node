const nodemailer = require('nodemailer');

// Configura tu correo (se recomienda Gmail con clave de aplicación)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atiroandres@gmail.com',       // ⚠️ Cambiar por tu correo real
    pass: '"oxqykftzymaycptf",'      // ⚠️ Usar contraseña de aplicación
  }
});

/**
 * Enviar correo de confirmación de reserva
 */
const enviarCorreoConfirmacion = async (emailCliente, datosReserva) => {
  const { fecha, hora, cantidadPersonas, comentario } = datosReserva;

  const mailOptions = {
    from: '"Reservas Restaurante" <tucorreo@gmail.com>',
    to: emailCliente,
    subject: '✅ Confirmación de tu Reservación',
    html: `
      <h2>¡Hola!</h2>
      <p>Tu reserva fue registrada con éxito.</p>
      <ul>
        <li><strong>Fecha:</strong> ${fecha}</li>
        <li><strong>Hora:</strong> ${hora}</li>
        <li><strong>Personas:</strong> ${cantidadPersonas}</li>
        ${comentario ? `<li><strong>Comentario:</strong> ${comentario}</li>` : ''}
      </ul>
      <p>¡Gracias por elegirnos!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Correo enviado al cliente:', emailCliente);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
  }
};

module.exports = {
  enviarCorreoConfirmacion
};
