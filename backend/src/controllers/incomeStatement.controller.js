const IncomeStatement = require('../models/IncomeStatement');

/**
 * Crea un nuevo estado de resultados.
 * 
 * @async
 * @function createIncomeStatement
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos del nuevo estado de resultados en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el estado de resultados creado.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el estado de resultados creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el estado de resultados.
 */
const createIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = new IncomeStatement(req.body);
        await incomeStatement.save();
        res.status(201).json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un estado de resultados específico por su ID.
 * 
 * @async
 * @function getIncomeStatement
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del estado de resultados como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el estado de resultados encontrado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el estado de resultados encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el estado de resultados.
 */
const getIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findById(req.params.id);
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los estados de resultados.
 * 
 * @async
 * @function getIncomeStatements
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con todos los estados de resultados.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todos los estados de resultados.
 * @throws {Error} Si ocurre un error al obtener los estados de resultados.
 */
const getIncomeStatements = async (req, res, next) => {
    try {
        const incomeStatements = await IncomeStatement.find();
        res.json(incomeStatements);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un estado de resultados específico por su ID.
 * 
 * @async
 * @function deleteIncomeStatement
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del estado de resultados a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el estado de resultados no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el estado de resultados.
 */
const deleteIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findByIdAndDelete(req.params.id);
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un estado de resultados específico por su ID.
 * 
 * @async
 * @function updateIncomeStatement
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del estado de resultados y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el estado de resultados actualizado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el estado de resultados actualizado o mensaje de error si el estado de resultados no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el estado de resultados.
 */
const updateIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createIncomeStatement,
    getIncomeStatement,
    getIncomeStatements,
    deleteIncomeStatement,
    updateIncomeStatement
};
