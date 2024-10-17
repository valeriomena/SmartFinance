const ProductService = require('../models/ProductService');

/**
 * Crea un nuevo producto o servicio.
 * 
 * @async
 * @function createProductService
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos del nuevo producto/servicio en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el producto/servicio creado.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el producto/servicio creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el producto/servicio.
 */
const createProductService = async (req, res, next) => {
    try {
        const productService = new ProductService(req.body);
        await productService.save();
        res.status(201).json(productService);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un producto o servicio específico por su ID.
 * 
 * @async
 * @function getProductService
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del producto/servicio como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el producto/servicio encontrado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el producto/servicio encontrado o un mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el producto/servicio.
 */
const getProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findById(req.params.id);
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.json(productService);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los productos y servicios.
 * 
 * @async
 * @function getProductServices
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con todos los productos y servicios.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todos los productos y servicios.
 * @throws {Error} Si ocurre un error al obtener los productos/servicios.
 */
const getProductServices = async (req, res, next) => {
    try {
        const productServices = await ProductService.find();
        res.json(productServices);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un producto o servicio específico por su ID.
 * 
 * @async
 * @function deleteProductService
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del producto/servicio a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el producto/servicio no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el producto/servicio.
 */
const deleteProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findByIdAndDelete(req.params.id);
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un producto o servicio específico por su ID.
 * 
 * @async
 * @function updateProductService
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del producto/servicio y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el producto/servicio actualizado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el producto/servicio actualizado o mensaje de error si el producto/servicio no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el producto/servicio.
 */
const updateProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.json(productService);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProductService,
    getProductService,
    getProductServices,
    deleteProductService,
    updateProductService
};
