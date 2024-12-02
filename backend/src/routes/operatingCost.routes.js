/**
 * Rutas para gestionar los costos operativos en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de los costos operativos (`OperatingCost`),
 * incluyendo la creación, obtención, actualización y eliminación de costos operativos.
 * 
 * @module routes/operatingCostRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createOperatingCost,
    getOperatingCost,
    getOperatingCosts,
    deleteOperatingCost,
    updateOperatingCost
} = require('../controllers/operatingCost.controller');

/**
 * Ruta para obtener todos los costos operativos y crear un nuevo costo operativo.
 * 
 * - `GET /`: Obtiene una lista de todos los costos operativos en el sistema.
 * - `POST /`: Crea un nuevo costo operativo en el sistema.
 * 
 * @name GET /operating-costs
 * @name POST /operating-costs
 */
router.route('/')
    /**
     * Maneja la obtención de todos los costos operativos.
     * 
     * @function
     * @name getOperatingCosts
     * @memberof module:routes/operatingCostRoutes
     * @see module:controllers/operatingCost.controller#getOperatingCosts
     */
    .get(getOperatingCosts)
    
    /**
     * Maneja la creación de un nuevo costo operativo.
     * 
     * @function
     * @name createOperatingCost
     * @memberof module:routes/operatingCostRoutes
     * @see module:controllers/operatingCost.controller#createOperatingCost
     */
    .post(createOperatingCost);

/**
 * Ruta para obtener, eliminar o actualizar un costo operativo específico por su ID.
 * 
 * - `GET /:id`: Obtiene un costo operativo por su identificador único (ID).
 * - `PUT /:id`: Actualiza un costo operativo por su identificador único (ID).
 * - `DELETE /:id`: Elimina un costo operativo por su identificador único (ID).
 * 
 * @name GET /operating-costs/:id
 * @name PUT /operating-costs/:id
 * @name DELETE /operating-costs/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un costo operativo específico por su ID.
     * 
     * @function
     * @name getOperatingCost
     * @memberof module:routes/operatingCostRoutes
     * @see module:controllers/operatingCost.controller#getOperatingCost
     */
    .get(getOperatingCost)
    
    /**
     * Maneja la actualización de un costo operativo específico por su ID.
     * 
     * @function
     * @name updateOperatingCost
     * @memberof module:routes/operatingCostRoutes
     * @see module:controllers/operatingCost.controller#updateOperatingCost
     */
    .put(updateOperatingCost)
    
    /**
     * Maneja la eliminación de un costo operativo específico por su ID.
     * 
     * @function
     * @name deleteOperatingCost
     * @memberof module:routes/operatingCostRoutes
     * @see module:controllers/operatingCost.controller#deleteOperatingCost
     */
    .delete(deleteOperatingCost);

module.exports = router;
