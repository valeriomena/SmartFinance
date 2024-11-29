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

        // Asignamos el usuario logueado al negocio
        const business = new Business({
            ...req.body,
            createdBy: req.user.id // Asegura que el negocio se asocie al usuario logueado
        });
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

        // Verifica que el negocio pertenece al usuario logueado
        if (!business || business.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied to this business' });
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
        console.log("Solicitando todos los negocios"); // Imprime que se está solicitando la lista de todos los negocios
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
    try {
 
        const businesses = await Business.find({ createdBy: req.user.id });
        if (!businesses.length) {
            return res.status(404).json({ message: 'No businesses found for this user.' });
        }

        res.json(businesses);
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

        const business = await Business.findById(req.params.id);

        // Verifica si el negocio pertenece al usuario logueado
        if (!business || business.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied to delete this business' });
        }

        await Business.findByIdAndDelete(req.params.id);
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
        console.log("Solicitando actualización del negocio con ID:", req.params.id); // Imprime el ID del negocio a actualizar
        console.log("Datos de la actualización:", req.body); // Imprime los datos que se intentan actualizar
        console.log("Usuario logueado (ID):", req.user.id); // Imprime el ID del usuario logueado

        const business = await Business.findById(req.params.id);

        // Verifica si el negocio pertenece al usuario logueado
        if (!business || business.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied to update this business' });
        }

        // Si el negocio es del usuario, se actualiza
        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedBusiness);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createBusiness,
    getBusiness,
    getBusinesses,
    getBusinessesByUserId,
    deleteBusiness,
    updateBusiness
};
