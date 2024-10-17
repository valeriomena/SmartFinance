const Sale = require('../models/Sale');

/**
 * Crea una nueva venta.
 * 
 * @async
 * @function createSale
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos de la venta a crear en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con la venta creada y el código de estado 201.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con la venta creada y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar la venta.
 */
const createSale = async (req, res, next) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene una venta específica por su ID.
 * 
 * @async
 * @function getSale
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID de la venta como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con la venta encontrada o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con la venta encontrada o un mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar la venta.
 */
const getSale = async (req, res, next) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todas las ventas.
 * 
 * @async
 * @function getSales
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con una lista de todas las ventas.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todas las ventas.
 * @throws {Error} Si ocurre un error al obtener las ventas.
 */
const getSales = async (req, res, next) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina una venta específica por su ID.
 * 
 * @async
 * @function deleteSale
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID de la venta a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si la venta no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar la venta.
 */
const deleteSale = async (req, res, next) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza una venta específica por su ID.
 * 
 * @async
 * @function updateSale
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID de la venta y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con la venta actualizada o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con la venta actualizada o mensaje de error si la venta no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar la venta.
 */
const updateSale = async (req, res, next) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createSale,
    getSale,
    getSales,
    deleteSale,
    updateSale
};
