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
    getBusinesses,
    deleteBusiness,
    updateBusiness
} = require('../controllers/business.controller');

/**
 * Ruta para obtener todos los negocios y crear un nuevo negocio.
 * 
 * - `GET /`: Obtiene una lista de todos los negocios en el sistema.
 * - `POST /`: Crea un nuevo negocio en el sistema.
 * 
 * @name GET /business
 * @name POST /business
 */
router.route('/')
    /**
     * Maneja la obtención de todos los negocios.
     * 
     * @function
     * @name getBusinesses
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#getBusinesses
     */
    .get(getBusinesses)
    
    /**
     * Maneja la creación de un nuevo negocio.
     * 
     * @function
     * @name createBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#createBusiness
     */
    .post(createBusiness);

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
    .get(getBusiness)
    
    /**
     * Maneja la actualización de un negocio específico por su ID.
     * 
     * @function
     * @name updateBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#updateBusiness
     */
    .put(updateBusiness)
    
    /**
     * Maneja la eliminación de un negocio específico por su ID.
     * 
     * @function
     * @name deleteBusiness
     * @memberof module:routes/businessRoutes
     * @see module:controllers/business.controller#deleteBusiness
     */
    .delete(deleteBusiness);

module.exports = router;
