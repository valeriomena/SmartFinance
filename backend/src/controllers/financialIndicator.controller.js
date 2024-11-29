const FinancialIndicator = require('../models/FinancialIndicator');

/**
 * Crea un nuevo indicador financiero.
 * 
 * @async
 * @function createFinancialIndicator
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el indicador financiero creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el indicador financiero.
 */
const createFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = new FinancialIndicator(req.body);
        await financialIndicator.save();
        res.status(201).json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un indicador financiero específico por su ID.
 * 
 * @async
 * @function getFinancialIndicator
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el indicador financiero encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el indicador financiero.
 */
const getFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findById(req.params.id);
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los indicadores financieros.
 * 
 * @async
 * @function getFinancialIndicators
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con todos los indicadores financieros.
 * @throws {Error} Si ocurre un error al obtener los indicadores financieros.
 */
const getFinancialIndicators = async (req, res, next) => {
    try {
        const financialIndicators = await FinancialIndicator.find();
        res.json(financialIndicators);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un indicador financiero específico por su ID.
 * 
 * @async
 * @function deleteFinancialIndicator
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el indicador financiero no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el indicador financiero.
 */
const deleteFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findByIdAndDelete(req.params.id);
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un indicador financiero específico por su ID.
 * 
 * @async
 * @function updateFinancialIndicator
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el indicador financiero actualizado o mensaje de error si el indicador financiero no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el indicador financiero.
 */
const updateFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createFinancialIndicator,
    getFinancialIndicator,
    getFinancialIndicators,
    deleteFinancialIndicator,
    updateFinancialIndicator
};
