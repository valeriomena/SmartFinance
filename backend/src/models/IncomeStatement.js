/**
 * Módulo que define el esquema de "IncomeStatement" (Estado de Resultados) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los estados de resultados de un negocio,
 * incluyendo datos clave como ingresos, costos, gastos operativos, gastos financieros, beneficio bruto y beneficio neto.
 * 
 * @module models/IncomeStatement
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar un estado de resultados de un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `businessId`: Un ObjectId que hace referencia al negocio relacionado con el estado de resultados (requerido).
 * - `periodo`: El periodo contable de los resultados (por ejemplo: '2023-Q1', '2023-Q2', etc.).
 * - `ingresos`: Los ingresos obtenidos en el periodo (requerido).
 * - `costos`: Los costos asociados en el periodo (requerido).
 * - `gastos_operativos`: Los gastos operativos incurridos en el periodo (requerido).
 * - `gastos_financieros`: Los gastos financieros incurridos en el periodo (requerido).
 * - `beneficio_bruto`: El beneficio bruto calculado como `ingresos - costos` (requerido).
 * - `beneficio_neto`: El beneficio neto calculado después de deducir todos los costos y gastos (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} IncomeStatement
 * @property {ObjectId} businessId - El identificador del negocio al que pertenece el estado de resultados.
 * @property {string} periodo - El periodo contable del estado de resultados (ej. '2023-Q1').
 * @property {number} ingresos - Los ingresos obtenidos en el periodo.
 * @property {number} costos - Los costos asociados al negocio durante el periodo.
 * @property {number} gastos_operativos - Los gastos operativos durante el periodo.
 * @property {number} gastos_financieros - Los gastos financieros durante el periodo.
 * @property {number} beneficio_bruto - El beneficio bruto calculado.
 * @property {number} beneficio_neto - El beneficio neto calculado.
 * @property {Date} createdAt - La fecha en que se creó el estado de resultados (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del estado de resultados (automáticamente gestionado por Mongoose).
 */
const incomeStatementSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    periodo: { type: String, required: true }, // Por ejemplo: '2023-Q1'
    ingresos: { type: Number, required: true },
    costos: { type: Number, required: true },
    gastos_operativos: { type: Number, required: true },
    gastos_financieros: { type: Number, required: true },
    beneficio_bruto: { type: Number, required: true },
    beneficio_neto: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para el estado de resultados (IncomeStatement).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "incomestatements" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<IncomeStatement>}
 */
module.exports = model('IncomeStatement', incomeStatementSchema);
