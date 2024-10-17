/**
 * Módulo que define el esquema de "FinancialExpense" (Gasto Financiero) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los gastos financieros de un negocio,
 * incluyendo el tipo de gasto financiero, el monto y la referencia al negocio correspondiente.
 * Además, se incluyen las marcas de tiempo (timestamps) para registrar la fecha de creación y actualización 
 * del gasto financiero.
 * 
 * @module models/FinancialExpense
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar un gasto financiero en la base de datos.
 * 
 * Este esquema contiene los campos:
 * - `businessId`: Un ObjectId que hace referencia al negocio asociado con el gasto financiero (requerido).
 * - `tipo_gasto_financiero`: El tipo o categoría del gasto financiero (requerido).
 * - `monto`: El monto del gasto financiero (requerido).
 * 
 * Se utiliza `timestamps` para agregar automáticamente los campos `createdAt` y `updatedAt` 
 * a los documentos de gastos financieros.
 * 
 * @typedef {Object} FinancialExpense
 * @property {ObjectId} businessId - El identificador del negocio al que pertenece el gasto financiero.
 * @property {string} tipo_gasto_financiero - El tipo de gasto financiero (ejemplo: "Intereses", "Comisiones", etc.).
 * @property {number} monto - El monto asociado al gasto financiero.
 * @property {Date} createdAt - La fecha en que se creó el gasto financiero (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del gasto financiero (automáticamente gestionado por Mongoose).
 */
const financialExpenseSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    tipo_gasto_financiero: { type: String, required: true },
    monto: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para el gasto financiero (FinancialExpense).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "financialexpenses" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<FinancialExpense>}
 */
module.exports = model('FinancialExpense', financialExpenseSchema);
