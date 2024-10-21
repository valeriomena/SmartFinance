const Business = require('../models/Business');

/**
 * Crea un nuevo negocio.
 * 
 * @async
 * @function createBusiness
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el negocio creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el negocio.
 */
const createBusiness = async (req, res, next) => {
    try {
        const business = new Business(req.body);
        await business.save();
        res.status(201).json(business);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un negocio específico por su ID.
 * 
 * @async
 * @function getBusiness
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el negocio encontrado o mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el negocio.
 */
const getBusiness = async (req, res, next) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.json(business);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los negocios.
 * 
 * @async
 * @function getBusinesses
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con todos los negocios.
 * @throws {Error} Si ocurre un error al obtener los negocios.
 */
const getBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los negocios creados por un usuario específico.
 * 
 * @async
 * @function getBusinessesByUserId
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con los negocios encontrados o mensaje de error si no se encuentran.
 * @throws {Error} Si ocurre un error al buscar los negocios.
 */
const getBusinessesByUserId = async (req, res, next) => {
    const { userId } = req.params; // Obtenemos el userId de los parámetros

    try {
        const businesses = await Business.find({ createdBy: userId }); // Busca negocios por createdBy
        res.json(businesses); // Devuelve la lista de negocios
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un negocio específico por su ID.
 * 
 * @async
 * @function deleteBusiness
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el negocio no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el negocio.
 */
const deleteBusiness = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un negocio específico por su ID.
 * 
 * @async
 * @function updateBusiness
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response).
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el negocio actualizado o mensaje de error si el negocio no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el negocio.
 */
const updateBusiness = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.json(business);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createBusiness,
    getBusiness,
    getBusinesses,
    getBusinessesByUserId, // Exporta el nuevo método
    deleteBusiness,
    updateBusiness
};
