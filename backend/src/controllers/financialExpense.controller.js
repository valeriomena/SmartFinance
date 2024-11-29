const FinancialExpense = require('../models/FinancialExpense');

/**
 * Crea un nuevo gasto financiero.
 * 
 * @async
 * @function createFinancialExpense
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el gasto financiero creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el gasto financiero.
 */
const createFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = new FinancialExpense(req.body);
        await financialExpense.save();
        res.status(201).json(financialExpense);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un gasto financiero específico por su ID.
 * 
 * @async
 * @function getFinancialExpense
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el gasto financiero encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el gasto financiero.
 */
const getFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findById(req.params.id);
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.json(financialExpense);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los gastos financieros.
 * 
 * @async
 * @function getFinancialExpenses
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con todos los gastos financieros.
 * @throws {Error} Si ocurre un error al obtener los gastos financieros.
 */
const getFinancialExpenses = async (req, res, next) => {
    try {
        const financialExpenses = await FinancialExpense.find();
        res.json(financialExpenses);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un gasto financiero específico por su ID.
 * 
 * @async
 * @function deleteFinancialExpense
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el gasto financiero no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el gasto financiero.
 */
const deleteFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findByIdAndDelete(req.params.id);
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un gasto financiero específico por su ID.
 * 
 * @async
 * @function updateFinancialExpense
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el gasto financiero actualizado o mensaje de error si el gasto financiero no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el gasto financiero.
 */
const updateFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.json(financialExpense);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createFinancialExpense,
    getFinancialExpense,
    getFinancialExpenses,
    deleteFinancialExpense,
    updateFinancialExpense
};
