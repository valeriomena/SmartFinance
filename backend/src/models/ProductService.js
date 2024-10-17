/**
 * Módulo que define el esquema de "ProductService" (Producto/Servicio) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con productos o servicios ofrecidos por un negocio,
 * incluyendo el nombre, descripción, precio y la asociación con el negocio correspondiente.
 * 
 * @module models/ProductService
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar productos o servicios de un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `name`: El nombre del producto o servicio (requerido).
 * - `description`: Una breve descripción del producto o servicio (opcional).
 * - `price`: El precio del producto o servicio (requerido).
 * - `businessId`: Un ObjectId que hace referencia al negocio que ofrece el producto o servicio (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} ProductService
 * @property {string} name - El nombre del producto o servicio.
 * @property {string} [description] - La descripción del producto o servicio.
 * @property {number} price - El precio del producto o servicio.
 * @property {ObjectId} businessId - El identificador del negocio que ofrece el producto o servicio.
 * @property {Date} createdAt - La fecha en que se creó el producto o servicio (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del producto o servicio (automáticamente gestionado por Mongoose).
 */
const productServiceSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true }
}, { timestamps: true });

/**
 * Modelo para productos o servicios (ProductService).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "productservices" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<ProductService>}
 */
module.exports = model('ProductService', productServiceSchema);
