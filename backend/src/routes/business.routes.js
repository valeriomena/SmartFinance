/**
 * Rutas para gestionar los negocios en el sistema.
 *
 * Este archivo define las rutas relacionadas con la gestión de los negocios (`Business`),
 * incluyendo la creación, obtención, actualización y eliminación de negocios.
 *
 * @module routes/businessRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createBusiness,
    getBusiness,
    deleteBusiness,
    updateBusiness,
    getBusinessesByUserId, // Se incluye la función específica para obtener negocios por usuario
} = require('../controllers/business.controller');

/**
 * Ruta para obtener todos los negocios creados por el usuario logueado y crear un nuevo negocio.
 *
 * - `GET /`: Obtiene una lista de todos los negocios creados por el usuario logueado.
 * - `POST /`: Crea un nuevo negocio en el sistema.
 *
 * @name GET /business
 * @name POST /business
 */
router.route('/')
    /**
     * Maneja la obtención de todos los negocios creados por el usuario logueado.
     *
     * @function
     * @name getBusinessesByUserId
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#getBusinessesByUserId
     */
    .get(getBusinessesByUserId) // Ahora se usa getBusinessesByUserId para filtrar negocios por usuario

    /**
     * Maneja la creación de un nuevo negocio.
     *
     * @function
     * @name createBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#createBusiness
     */
    .post(createBusiness); // Crea un nuevo negocio y lo asocia al usuario logueado

/**
 * Ruta para obtener, eliminar o actualizar un negocio específico por su ID.
 *
 * - `GET /:id`: Obtiene un negocio por su identificador único (ID).
 * - `PUT /:id`: Actualiza un negocio por su identificador único (ID).
 * - `DELETE /:id`: Elimina un negocio por su identificador único (ID).
 *
 * @name GET /business/:id
 * @name PUT /business/:id
 * @name DELETE /business/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un negocio específico por su ID.
     *
     * @function
     * @name getBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#getBusiness
     */
    .get(getBusiness) // Obtiene un negocio por su ID y verifica si pertenece al usuario logueado

    /**
     * Maneja la actualización de un negocio específico por su ID.
     *
     * @function
     * @name updateBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#updateBusiness
     */
    .put(updateBusiness) // Actualiza el negocio solo si pertenece al usuario logueado

    /**
     * Maneja la eliminación de un negocio específico por su ID.
     *
     * @function
     * @name deleteBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#deleteBusiness
     */
    .delete(deleteBusiness); // Elimina el negocio solo si pertenece al usuario logueado

module.exports = router;
