/**
 * Módulo que define el esquema de "Business" (Negocio) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos de negocios, incluyendo el nombre, 
 * la descripción y la referencia al usuario que creó el negocio. Además, se incluyen las 
 * marcas de tiempo (timestamps) para registrar la fecha de creación y actualización del negocio.
 * 
 * @module models/Business
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar un negocio en la base de datos.
 * 
 * Este esquema contiene los campos:
 * - `name`: El nombre del negocio (requerido).
 * - `description`: Una breve descripción del negocio (opcional).
 * - `createdBy`: Un ObjectId que hace referencia al usuario que creó el negocio (requerido).
 * 
 * Se utiliza `timestamps` para agregar automáticamente los campos `createdAt` y `updatedAt` 
 * a los documentos de negocios.
 * 
 * @typedef {Object} Business
 * @property {string} name - El nombre del negocio.
 * @property {string} [description] - Una descripción opcional del negocio.
 * @property {ObjectId} createdBy - El identificador del usuario que creó el negocio.
 * @property {Date} createdAt - La fecha en que se creó el negocio (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del negocio (automáticamente gestionado por Mongoose).
 */
const businessSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }  // Asociación con el usuario que creó el negocio
}, { timestamps: true });

/**
 * Modelo para el negocio (Business).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "businesses" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<Business>}
 */
module.exports = model('Business', businessSchema);
