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
 * Ruta para obtener todas las ventas y crear una nueva venta.
 * 
 * - `GET /`: Obtiene una lista de todas las ventas en el sistema.
 * - `POST /`: Crea una nueva venta en el sistema.
 * 
 * @name GET /sales
 * @name POST /sales
 */
router.route('/')
    /**
     * Maneja la obtención de todas las ventas.
     * 
     * @function
     * @name getSales
     * @memberof module:routes/salesRoutes
     * @see module:controllers/sales.controller#getSales
     */
    .get(getSales)
    
    /**
     * Maneja la creación de una nueva venta.
     * 
     * @function
     * @name createSale
     * @memberof module:routes/salesRoutes
     * @see module:controllers/sales.controller#createSale
     */
    .post(createSale);

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
    /**
     * Maneja la obtención de una venta específica por su ID.
     * 
     * @function
     * @name getSale
     * @memberof module:routes/salesRoutes
     * @see module:controllers/sales.controller#getSale
     */
    .get(getSale)
    
    /**
     * Maneja la actualización de una venta específica por su ID.
     * 
     * @function
     * @name updateSale
     * @memberof module:routes/salesRoutes
     * @see module:controllers/sales.controller#updateSale
     */
    .put(updateSale)
    
    /**
     * Maneja la eliminación de una venta específica por su ID.
     * 
     * @function
     * @name deleteSale
     * @memberof module:routes/salesRoutes
     * @see module:controllers/sales.controller#deleteSale
     */
    .delete(deleteSale);

module.exports = router;
