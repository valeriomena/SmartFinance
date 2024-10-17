/**
 * Rutas para gestionar los costos de producción en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de los costos de producción (`ProductionCost`),
 * incluyendo la creación, obtención, actualización y eliminación de costos de producción.
 * 
 * @module routes/productionCostRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createProductionCost,
    getProductionCost,
    getProductionCosts,
    deleteProductionCost,
    updateProductionCost
} = require('../controllers/productionCost.controller');

/**
 * Ruta para obtener todos los costos de producción y crear un nuevo costo de producción.
 * 
 * - `GET /`: Obtiene una lista de todos los costos de producción en el sistema.
 * - `POST /`: Crea un nuevo costo de producción en el sistema.
 * 
 * @name GET /production-costs
 * @name POST /production-costs
 */
router.route('/')
    /**
     * Maneja la obtención de todos los costos de producción.
     * 
     * @function
     * @name getProductionCosts
     * @memberof module:routes/productionCostRoutes
     * @see module:controllers/productionCost.controller#getProductionCosts
     */
    .get(getProductionCosts)
    
    /**
     * Maneja la creación de un nuevo costo de producción.
     * 
     * @function
     * @name createProductionCost
     * @memberof module:routes/productionCostRoutes
     * @see module:controllers/productionCost.controller#createProductionCost
     */
    .post(createProductionCost);

/**
 * Ruta para obtener, eliminar o actualizar un costo de producción específico por su ID.
 * 
 * - `GET /:id`: Obtiene un costo de producción por su identificador único (ID).
 * - `PUT /:id`: Actualiza un costo de producción por su identificador único (ID).
 * - `DELETE /:id`: Elimina un costo de producción por su identificador único (ID).
 * 
 * @name GET /production-costs/:id
 * @name PUT /production-costs/:id
 * @name DELETE /production-costs/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un costo de producción específico por su ID.
     * 
     * @function
     * @name getProductionCost
     * @memberof module:routes/productionCostRoutes
     * @see module:controllers/productionCost.controller#getProductionCost
     */
    .get(getProductionCost)
    
    /**
     * Maneja la actualización de un costo de producción específico por su ID.
     * 
     * @function
     * @name updateProductionCost
     * @memberof module:routes/productionCostRoutes
     * @see module:controllers/productionCost.controller#updateProductionCost
     */
    .put(updateProductionCost)
    
    /**
     * Maneja la eliminación de un costo de producción específico por su ID.
     * 
     * @function
     * @name deleteProductionCost
     * @memberof module:routes/productionCostRoutes
     * @see module:controllers/productionCost.controller#deleteProductionCost
     */
    .delete(deleteProductionCost);

module.exports = router;
