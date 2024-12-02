const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/forgotPassword.controller');

const router = express.Router();

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña usando el token recibido por correo
router.post('/reset-password/:token', resetPassword);

module.exports = router;
