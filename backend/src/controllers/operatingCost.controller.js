const OperatingCost = require('../models/OperatingCost');

/**
 * Crea un nuevo costo operativo.
 * 
 * @async
 * @function createOperatingCost
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos del nuevo costo operativo en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo operativo creado.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo operativo creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el costo operativo.
 */
const createOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = new OperatingCost(req.body);
        await operatingCost.save();
        res.status(201).json(operatingCost);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un costo operativo específico por su ID.
 * 
 * @async
 * @function getOperatingCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo operativo como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo operativo encontrado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo operativo encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el costo operativo.
 */
const getOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findById(req.params.id);
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.json(operatingCost);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los costos operativos.
 * 
 * @async
 * @function getOperatingCosts
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con todos los costos operativos.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todos los costos operativos.
 * @throws {Error} Si ocurre un error al obtener los costos operativos.
 */
const getOperatingCosts = async (req, res, next) => {
    try {
        const operatingCosts = await OperatingCost.find();
        res.json(operatingCosts);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un costo operativo específico por su ID.
 * 
 * @async
 * @function deleteOperatingCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo operativo a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el costo operativo no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el costo operativo.
 */
const deleteOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findByIdAndDelete(req.params.id);
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un costo operativo específico por su ID.
 * 
 * @async
 * @function updateOperatingCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo operativo y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo operativo actualizado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo operativo actualizado o mensaje de error si el costo operativo no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el costo operativo.
 */
const updateOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.json(operatingCost);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOperatingCost,
    getOperatingCost,
    getOperatingCosts,
    deleteOperatingCost,
    updateOperatingCost
};
