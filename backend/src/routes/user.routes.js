const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/authenticateToken'); // Importamos los middlewares
const router = Router();
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
} = require('../controllers/user.controller');

// Rutas públicas (registro y login)
router.route('/')
    .post(createUser); // Cualquier usuario puede registrarse

router.post('/login', loginUser); // Ruta de inicio de sesión

// Rutas protegidas por autenticación
router.route('/')
    .get(authenticateToken, authorizeRoles(['admin']), getUsers); // Solo un administrador puede listar usuarios

router.route('/:id')
    .get(authenticateToken, getUser) // Un usuario autenticado puede ver su perfil (u otros usuarios si tienes lógica de permisos)
    .delete(authenticateToken, authorizeRoles(['admin']), deleteUser) // Solo un administrador puede eliminar usuarios
    .put(authenticateToken, updateUser); // Un usuario autenticado puede actualizar su perfil (o necesitas lógica para permitir solo a admins)

module.exports = router;
