/**
 * Rutas para gestionar los servicios y productos en el sistema.
 * 
 * Este archivo define las rutas relacionadas con la gestión de productos/servicios (`ProductService`),
 * incluyendo la creación, obtención, actualización y eliminación de productos/servicios.
 * 
 * @module routes/productServiceRoutes
 */

const { Router } = require('express');
const router = Router();
const {
    createProductService,
    getProductService,
    getProductServices,
    deleteProductService,
    updateProductService
} = require('../controllers/productService.controller');

/**
 * Ruta para obtener todos los productos/servicios y crear un nuevo producto/servicio.
 * 
 * - `GET /`: Obtiene una lista de todos los productos/servicios en el sistema.
 * - `POST /`: Crea un nuevo producto/servicio en el sistema.
 * 
 * @name GET /product-services
 * @name POST /product-services
 */
router.route('/')
    /**
     * Maneja la obtención de todos los productos/servicios.
     * 
     * @function
     * @name getProductServices
     * @memberof module:routes/productServiceRoutes
     * @see module:controllers/productService.controller#getProductServices
     */
    .get(getProductServices)
    
    /**
     * Maneja la creación de un nuevo producto/servicio.
     * 
     * @function
     * @name createProductService
     * @memberof module:routes/productServiceRoutes
     * @see module:controllers/productService.controller#createProductService
     */
    .post(createProductService);

/**
 * Ruta para obtener, eliminar o actualizar un producto/servicio específico por su ID.
 * 
 * - `GET /:id`: Obtiene un producto/servicio por su identificador único (ID).
 * - `PUT /:id`: Actualiza un producto/servicio por su identificador único (ID).
 * - `DELETE /:id`: Elimina un producto/servicio por su identificador único (ID).
 * 
 * @name GET /product-services/:id
 * @name PUT /product-services/:id
 * @name DELETE /product-services/:id
 */
router.route('/:id')
    /**
     * Maneja la obtención de un producto/servicio específico por su ID.
     * 
     * @function
     * @name getProductService
     * @memberof module:routes/productServiceRoutes
     * @see module:controllers/productService.controller#getProductService
     */
    .get(getProductService)
    
    /**
     * Maneja la actualización de un producto/servicio específico por su ID.
     * 
     * @function
     * @name updateProductService
     * @memberof module:routes/productServiceRoutes
     * @see module:controllers/productService.controller#updateProductService
     */
    .put(updateProductService)
    
    /**
     * Maneja la eliminación de un producto/servicio específico por su ID.
     * 
     * @function
     * @name deleteProductService
     * @memberof module:routes/productServiceRoutes
     * @see module:controllers/productService.controller#deleteProductService
     */
    .delete(deleteProductService);

module.exports = router;
