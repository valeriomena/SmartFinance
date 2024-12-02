/**
 * Rutas para la gestión de usuarios en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la creación, autenticación,
 * y administración de usuarios, incluyendo registro, inicio de sesión y gestión de perfiles.
 * Las rutas están protegidas por autenticación y autorización basada en roles.
 * 
 * @module routes/userRoutes
 */

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

/**
 * Rutas públicas para el registro de usuarios y el inicio de sesión.
 * 
 * - `POST /users`: Permite a cualquier usuario registrarse en el sistema.
 * - `POST /users/login`: Permite a un usuario autenticarse en el sistema.
 * 
 * @name POST /users
 * @name POST /users/login
 */
router.route('/')
    /**
     * Permite a cualquier usuario registrarse en el sistema.
     * 
     * @function
     * @name createUser
     * @memberof module:routes/userRoutes
     * @see module:controllers/user.controller#createUser
     */
    .post(createUser);

router.post('/login', loginUser); // Ruta de inicio de sesión

/**
 * Rutas protegidas que requieren autenticación y autorización por roles.
 * 
 * - `GET /users`: Permite a los administradores ver todos los usuarios.
 * - `GET /users/:id`: Permite a los usuarios autenticados ver su perfil (u otros usuarios si se permiten).
 * - `DELETE /users/:id`: Permite a los administradores eliminar un usuario.
 * - `PUT /users/:id`: Permite a los usuarios autenticados actualizar su perfil.
 * 
 * @name GET /users
 * @name GET /users/:id
 * @name DELETE /users/:id
 * @name PUT /users/:id
 */
router.route('/')
    /**
     * Permite a los administradores obtener la lista de todos los usuarios.
     * 
     * @function
     * @name getUsers
     * @memberof module:routes/userRoutes
     * @see module:controllers/user.controller#getUsers
     */
    .get(authenticateToken, authorizeRoles(['admin']), getUsers);

router.route('/:id')
    /**
     * Permite a los usuarios autenticados ver su perfil o el de otros si se permite.
     * 
     * @function
     * @name getUser
     * @memberof module:routes/userRoutes
     * @see module:controllers/user.controller#getUser
     */
    .get(authenticateToken, getUser)
    
    /**
     * Permite a los administradores eliminar un usuario específico.
     * 
     * @function
     * @name deleteUser
     * @memberof module:routes/userRoutes
     * @see module:controllers/user.controller#deleteUser
     */
    .delete(authenticateToken, authorizeRoles(['admin']), deleteUser)
    
    /**
     * Permite a los usuarios autenticados actualizar su perfil.
     * 
     * @function
     * @name updateUser
     * @memberof module:routes/userRoutes
     * @see module:controllers/user.controller#updateUser
     */
    .put(authenticateToken, updateUser);

module.exports = router;
