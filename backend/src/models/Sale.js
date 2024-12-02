/**
 * Módulo que define el esquema de "Sale" (Venta) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con las ventas realizadas por un negocio,
 * incluyendo la información sobre el producto o servicio vendido, la cantidad, el precio y el ingreso total.
 * 
 * @module models/Sale
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar las ventas realizadas por un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `businessId`: El identificador del negocio que realiza la venta (requerido).
 * - `productServiceId`: El identificador del producto o servicio vendido (requerido).
 * - `fecha`: La fecha en que se realizó la venta (requerido).
 * - `precio_venta`: El precio por unidad del producto o servicio vendido (requerido).
 * - `cantidad_vendida`: La cantidad de unidades del producto o servicio vendidas (requerido).
 * - `ingreso_total`: El ingreso total generado por la venta (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} Sale
 * @property {ObjectId} businessId - El identificador del negocio que realiza la venta.
 * @property {ObjectId} productServiceId - El identificador del producto o servicio vendido.
 * @property {Date} fecha - La fecha de la venta.
 * @property {number} precio_venta - El precio de venta por unidad del producto o servicio.
 * @property {number} cantidad_vendida - La cantidad de unidades vendidas.
 * @property {number} ingreso_total - El ingreso total generado por la venta (precio de venta * cantidad vendida).
 * @property {Date} createdAt - La fecha en que se creó el documento (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del documento (automáticamente gestionado por Mongoose).
 */
const saleSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    productServiceId: { type: Schema.Types.ObjectId, ref: 'ProductService', required: true },
    fecha: { type: Date, required: true },
    precio_venta: { type: Number, required: true },
    cantidad_vendida: { type: Number, required: true },
    ingreso_total: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para las ventas (Sale).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "sales" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<Sale>}
 */
module.exports = model('Sale', saleSchema);
