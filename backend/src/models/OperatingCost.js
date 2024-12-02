/**
 * Módulo que define el esquema de "OperatingCost" (Costo Operativo) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los costos operativos de un negocio,
 * incluyendo el tipo de gasto y el monto asociado.
 * 
 * @module models/OperatingCost
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar los costos operativos de un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `businessId`: Un ObjectId que hace referencia al negocio relacionado con el costo operativo (requerido).
 * - `tipo_gasto`: El tipo de gasto operativo (por ejemplo: 'sueldo', 'alquiler', etc.) (requerido).
 * - `monto`: El monto del gasto operativo en el periodo (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} OperatingCost
 * @property {ObjectId} businessId - El identificador del negocio al que pertenece el costo operativo.
 * @property {string} tipo_gasto - El tipo de gasto operativo (ej. 'sueldo', 'alquiler', etc.).
 * @property {number} monto - El monto del costo operativo.
 * @property {Date} createdAt - La fecha en que se creó el costo operativo (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del costo operativo (automáticamente gestionado por Mongoose).
 */
const operatingCostSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    tipo_gasto: { type: String, required: true },
    monto: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para el costo operativo (OperatingCost).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "operatingcosts" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<OperatingCost>}
 */
module.exports = model('OperatingCost', operatingCostSchema);
