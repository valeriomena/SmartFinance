/**
 * Rutas para gestionar los indicadores financieros en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de los indicadores financieros (`FinancialIndicator`),
 * incluyendo la creación, obtención, actualización y eliminación de indicadores financieros.
 * 
 * @module routes/financialIndicatorRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createFinancialIndicator,
    getFinancialIndicator,
    getFinancialIndicators,
    deleteFinancialIndicator,
    updateFinancialIndicator
} = require('../controllers/financialIndicator.controller');

/**
 * Ruta para obtener todos los indicadores financieros y crear un nuevo indicador financiero.
 * 
 * - `GET /`: Obtiene una lista de todos los indicadores financieros en el sistema.
 * - `POST /`: Crea un nuevo indicador financiero en el sistema.
 * 
 * @name GET /financial-indicators
 * @name POST /financial-indicators
 */
router.route('/')
    /**
     * Maneja la obtención de todos los indicadores financieros.
     * 
     * @function
     * @name getFinancialIndicators
     * @memberof module:routes/financialIndicatorRoutes
     * @see module:controllers/financialIndicator.controller#getFinancialIndicators
     */
    .get(getFinancialIndicators)
    
    /**
     * Maneja la creación de un nuevo indicador financiero.
     * 
     * @function
     * @name createFinancialIndicator
     * @memberof module:routes/financialIndicatorRoutes
     * @see module:controllers/financialIndicator.controller#createFinancialIndicator
     */
    .post(createFinancialIndicator);

/**
 * Ruta para obtener, eliminar o actualizar un indicador financiero específico por su ID.
 * 
 * - `GET /:id`: Obtiene un indicador financiero por su identificador único (ID).
 * - `PUT /:id`: Actualiza un indicador financiero por su identificador único (ID).
 * - `DELETE /:id`: Elimina un indicador financiero por su identificador único (ID).
 * 
 * @name GET /financial-indicators/:id
 * @name PUT /financial-indicators/:id
 * @name DELETE /financial-indicators/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un indicador financiero específico por su ID.
     * 
     * @function
     * @name getFinancialIndicator
     * @memberof module:routes/financialIndicatorRoutes
     * @see module:controllers/financialIndicator.controller#getFinancialIndicator
     */
    .get(getFinancialIndicator)
    
    /**
     * Maneja la actualización de un indicador financiero específico por su ID.
     * 
     * @function
     * @name updateFinancialIndicator
     * @memberof module:routes/financialIndicatorRoutes
     * @see module:controllers/financialIndicator.controller#updateFinancialIndicator
     */
    .put(updateFinancialIndicator)
    
    /**
     * Maneja la eliminación de un indicador financiero específico por su ID.
     * 
     * @function
     * @name deleteFinancialIndicator
     * @memberof module:routes/financialIndicatorRoutes
     * @see module:controllers/financialIndicator.controller#deleteFinancialIndicator
     */
    .delete(deleteFinancialIndicator);

module.exports = router;
