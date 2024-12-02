/**
 * Rutas para gestionar los estados de resultados en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de los estados de resultados (`IncomeStatement`),
 * incluyendo la creación, obtención, actualización y eliminación de estados de resultados.
 * 
 * @module routes/incomeStatementRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createIncomeStatement,
    getIncomeStatement,
    getIncomeStatements,
    deleteIncomeStatement,
    updateIncomeStatement
} = require('../controllers/incomeStatement.controller');

/**
 * Ruta para obtener todos los estados de resultados y crear un nuevo estado de resultados.
 * 
 * - `GET /`: Obtiene una lista de todos los estados de resultados en el sistema.
 * - `POST /`: Crea un nuevo estado de resultados en el sistema.
 * 
 * @name GET /income-statements
 * @name POST /income-statements
 */
router.route('/')
    /**
     * Maneja la obtención de todos los estados de resultados.
     * 
     * @function
     * @name getIncomeStatements
     * @memberof module:routes/incomeStatementRoutes
     * @see module:controllers/incomeStatement.controller#getIncomeStatements
     */
    .get(getIncomeStatements)
    
    /**
     * Maneja la creación de un nuevo estado de resultados.
     * 
     * @function
     * @name createIncomeStatement
     * @memberof module:routes/incomeStatementRoutes
     * @see module:controllers/incomeStatement.controller#createIncomeStatement
     */
    .post(createIncomeStatement);

/**
 * Ruta para obtener, eliminar o actualizar un estado de resultados específico por su ID.
 * 
 * - `GET /:id`: Obtiene un estado de resultados por su identificador único (ID).
 * - `PUT /:id`: Actualiza un estado de resultados por su identificador único (ID).
 * - `DELETE /:id`: Elimina un estado de resultados por su identificador único (ID).
 * 
 * @name GET /income-statements/:id
 * @name PUT /income-statements/:id
 * @name DELETE /income-statements/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un estado de resultados específico por su ID.
     * 
     * @function
     * @name getIncomeStatement
     * @memberof module:routes/incomeStatementRoutes
     * @see module:controllers/incomeStatement.controller#getIncomeStatement
     */
    .get(getIncomeStatement)
    
    /**
     * Maneja la actualización de un estado de resultados específico por su ID.
     * 
     * @function
     * @name updateIncomeStatement
     * @memberof module:routes/incomeStatementRoutes
     * @see module:controllers/incomeStatement.controller#updateIncomeStatement
     */
    .put(updateIncomeStatement)
    
    /**
     * Maneja la eliminación de un estado de resultados específico por su ID.
     * 
     * @function
     * @name deleteIncomeStatement
     * @memberof module:routes/incomeStatementRoutes
     * @see module:controllers/incomeStatement.controller#deleteIncomeStatement
     */
    .delete(deleteIncomeStatement);

module.exports = router;
