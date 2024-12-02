const ProductionCost = require('../models/ProductionCost');

/**
 * Crea un nuevo costo de producción.
 * 
 * @async
 * @function createProductionCost
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos del nuevo costo de producción en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo de producción creado.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo de producción creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el costo de producción.
 */
const createProductionCost = async (req, res, next) => {
    try {
        const productionCost = new ProductionCost(req.body);
        await productionCost.save();
        res.status(201).json(productionCost);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un costo de producción específico por su ID.
 * 
 * @async
 * @function getProductionCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo de producción como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo de producción encontrado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo de producción encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el costo de producción.
 */
const getProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findById(req.params.id);
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.json(productionCost);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los costos de producción.
 * 
 * @async
 * @function getProductionCosts
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con todos los costos de producción.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todos los costos de producción.
 * @throws {Error} Si ocurre un error al obtener los costos de producción.
 */
const getProductionCosts = async (req, res, next) => {
    try {
        const productionCosts = await ProductionCost.find();
        res.json(productionCosts);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un costo de producción específico por su ID.
 * 
 * @async
 * @function deleteProductionCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo de producción a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el costo de producción no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el costo de producción.
 */
const deleteProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findByIdAndDelete(req.params.id);
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un costo de producción específico por su ID.
 * 
 * @async
 * @function updateProductionCost
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del costo de producción y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el costo de producción actualizado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el costo de producción actualizado o mensaje de error si el costo de producción no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el costo de producción.
 */
const updateProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.json(productionCost);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProductionCost,
    getProductionCost,
    getProductionCosts,
    deleteProductionCost,
    updateProductionCost
};
