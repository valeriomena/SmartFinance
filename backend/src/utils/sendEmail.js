const nodemailer = require('nodemailer');

/**
 * Envía un correo electrónico utilizando nodemailer.
 *
 * @param {Object} options - Parámetros del correo.
 * @param {string} options.to - Dirección de correo del destinatario.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} options.text - Texto plano del cuerpo del correo.
 * @param {string} [options.html] - (Opcional) Contenido HTML del cuerpo del correo.
 */
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        // Configurar el transporte para Hotmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true para el puerto 465, false para otros puertos
            auth: {
                user: process.env.EMAIL_USER, // Tu correo de Hotmail
                pass: process.env.EMAIL_PASS, // Contraseña o contraseña de aplicación
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        // Opciones del correo
        const mailOptions = {
            from: `"SmartFinance" <${process.env.EMAIL_USER}>`, // Remitente
            to,
            subject,
            text,
            html, // Puedes enviar contenido HTML si lo prefieres
        };

        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
};

module.exports = sendEmail;
