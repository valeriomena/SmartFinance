/**
 * Rutas para gestionar las ventas en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de ventas (`Sale`),
 * incluyendo la creación, obtención, actualización y eliminación de ventas.
 * 
 * @module routes/salesRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createSale,
    getSale,
    getSales,
    deleteSale,
    updateSale
} = require('../controllers/sales.controller');

/**
 * Middleware para verificar que el ID de negocio esté presente en la solicitud.
 */
const checkBusinessId = (req, res, next) => {
    if (!req.query.businessId) {
        return res.status(400).json({ message: 'Business ID is required' });
    }
    next();
};

/**
 * Ruta para obtener todas las ventas y crear una nueva venta.
 * 
 * - `GET /`: Obtiene una lista de todas las ventas en el sistema.
 * - `POST /`: Crea una nueva venta en el sistema.
 * 
 * @name GET /sales
 * @name POST /sales
 */
router.route('/')
    .get(checkBusinessId, getSales)  // Aplicar middleware para verificar el ID de negocio
    .post(checkBusinessId, createSale); // Aplicar middleware para verificar el ID de negocio

/**
 * Ruta para obtener, eliminar o actualizar una venta específica por su ID.
 * 
 * - `GET /:id`: Obtiene una venta específica por su identificador único (ID).
 * - `PUT /:id`: Actualiza una venta específica por su identificador único (ID).
 * - `DELETE /:id`: Elimina una venta específica por su identificador único (ID).
 * 
 * @name GET /sales/:id
 * @name PUT /sales/:id
 * @name DELETE /sales/:id
 */
router.route('/:id')
    .get(getSale)
    .put(updateSale)
    .delete(deleteSale);

module.exports = router;
