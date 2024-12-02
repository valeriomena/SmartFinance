/**
 * Módulo que define el esquema de "ProductionCost" (Costo de Producción) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los costos de producción de un producto o servicio,
 * incluyendo los costos de materia prima, mano de obra y el costo total de producción.
 * 
 * @module models/ProductionCost
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar los costos de producción de un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `businessId`: Un ObjectId que hace referencia al negocio relacionado con el costo de producción (requerido).
 * - `productServiceId`: Un ObjectId que hace referencia al producto o servicio relacionado con el costo de producción (requerido).
 * - `costo_materia_prima`: El costo asociado a la materia prima utilizada en la producción (requerido).
 * - `costo_mano_obra`: El costo asociado a la mano de obra utilizada en la producción (requerido).
 * - `costo_total`: El costo total de producción, calculado como la suma de los costos de materia prima y mano de obra (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} ProductionCost
 * @property {ObjectId} businessId - El identificador del negocio al que pertenece el costo de producción.
 * @property {ObjectId} productServiceId - El identificador del producto o servicio asociado al costo de producción.
 * @property {number} costo_materia_prima - El costo de la materia prima utilizada en la producción.
 * @property {number} costo_mano_obra - El costo de la mano de obra utilizada en la producción.
 * @property {number} costo_total - El costo total de la producción, sumando materia prima y mano de obra.
 * @property {Date} createdAt - La fecha en que se creó el costo de producción (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del costo de producción (automáticamente gestionado por Mongoose).
 */
const productionCostSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    productServiceId: { type: Schema.Types.ObjectId, ref: 'ProductService', required: true },
    costo_materia_prima: { type: Number, required: true },
    costo_mano_obra: { type: Number, required: true },
    costo_total: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para el costo de producción (ProductionCost).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "productioncosts" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<ProductionCost>}
 */
module.exports = model('ProductionCost', productionCostSchema);
