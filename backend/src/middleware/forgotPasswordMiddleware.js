const { Router } = require('express');
const { forgotPassword } = require('../controllers/user.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/authenticateToken');
const { body, validationResult } = require('express-validator');  // Para validación
const router = Router();

// Middleware de validación para el formulario de olvido de contraseña
const validateForgotPassword = [
  body('email').isEmail().withMessage('Por favor, ingresa un correo electrónico válido'),
  body('email').not().isEmpty().withMessage('El correo electrónico es obligatorio'),
];

// Ruta para olvidar la contraseña con validación
router.post('/forgot-password', validateForgotPassword, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, forgotPassword);

module.exports = router;
