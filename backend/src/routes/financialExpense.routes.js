/**
 * Rutas para gestionar los gastos financieros en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de los gastos financieros (`FinancialExpense`),
 * incluyendo la creación, obtención, actualización y eliminación de gastos financieros.
 * 
 * @module routes/financialExpenseRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createFinancialExpense,
    getFinancialExpense,
    getFinancialExpenses,
    deleteFinancialExpense,
    updateFinancialExpense
} = require('../controllers/financialExpense.controller');

/**
 * Ruta para obtener todos los gastos financieros y crear un nuevo gasto financiero.
 * 
 * - `GET /`: Obtiene una lista de todos los gastos financieros en el sistema.
 * - `POST /`: Crea un nuevo gasto financiero en el sistema.
 * 
 * @name GET /financial-expenses
 * @name POST /financial-expenses
 */
router.route('/')
    /**
     * Maneja la obtención de todos los gastos financieros.
     * 
     * @function
     * @name getFinancialExpenses
     * @memberof module:routes/financialExpenseRoutes
     * @see module:controllers/financialExpense.controller#getFinancialExpenses
     */
    .get(getFinancialExpenses)
    
    /**
     * Maneja la creación de un nuevo gasto financiero.
     * 
     * @function
     * @name createFinancialExpense
     * @memberof module:routes/financialExpenseRoutes
     * @see module:controllers/financialExpense.controller#createFinancialExpense
     */
    .post(createFinancialExpense);

/**
 * Ruta para obtener, eliminar o actualizar un gasto financiero específico por su ID.
 * 
 * - `GET /:id`: Obtiene un gasto financiero por su identificador único (ID).
 * - `PUT /:id`: Actualiza un gasto financiero por su identificador único (ID).
 * - `DELETE /:id`: Elimina un gasto financiero por su identificador único (ID).
 * 
 * @name GET /financial-expenses/:id
 * @name PUT /financial-expenses/:id
 * @name DELETE /financial-expenses/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un gasto financiero específico por su ID.
     * 
     * @function
     * @name getFinancialExpense
     * @memberof module:routes/financialExpenseRoutes
     * @see module:controllers/financialExpense.controller#getFinancialExpense
     */
    .get(getFinancialExpense)
    
    /**
     * Maneja la actualización de un gasto financiero específico por su ID.
     * 
     * @function
     * @name updateFinancialExpense
     * @memberof module:routes/financialExpenseRoutes
     * @see module:controllers/financialExpense.controller#updateFinancialExpense
     */
    .put(updateFinancialExpense)
    
    /**
     * Maneja la eliminación de un gasto financiero específico por su ID.
     * 
     * @function
     * @name deleteFinancialExpense
     * @memberof module:routes/financialExpenseRoutes
     * @see module:controllers/financialExpense.controller#deleteFinancialExpense
     */
    .delete(deleteFinancialExpense);

module.exports = router;
