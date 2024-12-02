/**
 * Módulo que define el esquema de "FinancialIndicator" (Indicador Financiero) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los indicadores financieros de un negocio,
 * incluyendo datos clave como el beneficio bruto, beneficio neto, márgenes de beneficio, punto de equilibrio, 
 * rotación de inventarios y ratio de liquidez, entre otros.
 * 
 * @module models/FinancialIndicator
 */

const { Schema, model } = require('mongoose');

/**
 * Esquema para representar un indicador financiero de un negocio en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `businessId`: Un ObjectId que hace referencia al negocio relacionado con el indicador financiero (requerido).
 * - `fecha`: La fecha en la que se calcula el indicador financiero (requerida).
 * - `beneficio_bruto`: El beneficio bruto calculado en el periodo (requerido).
 * - `beneficio_neto`: El beneficio neto calculado en el periodo (requerido).
 * - `margen_beneficio_bruto`: El margen de beneficio bruto calculado (requerido).
 * - `margen_beneficio_neto`: El margen de beneficio neto calculado (requerido).
 * - `punto_equilibrio`: El punto de equilibrio, es decir, el volumen de ventas necesario para no tener pérdidas (requerido).
 * - `rotacion_inventario`: La rotación de inventarios, que mide la eficiencia en la gestión del inventario (requerido).
 * - `ratio_liquidez`: El ratio de liquidez, que mide la capacidad de pago a corto plazo de la empresa (requerido).
 * 
 * Se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} FinancialIndicator
 * @property {ObjectId} businessId - El identificador del negocio al que pertenece el indicador financiero.
 * @property {Date} fecha - La fecha del indicador financiero, cuando se calcularon los datos.
 * @property {number} beneficio_bruto - El beneficio bruto calculado en el periodo.
 * @property {number} beneficio_neto - El beneficio neto calculado en el periodo.
 * @property {number} margen_beneficio_bruto - El margen de beneficio bruto calculado.
 * @property {number} margen_beneficio_neto - El margen de beneficio neto calculado.
 * @property {number} punto_equilibrio - El punto de equilibrio calculado.
 * @property {number} rotacion_inventario - La rotación de inventarios calculada.
 * @property {number} ratio_liquidez - El ratio de liquidez calculado.
 * @property {Date} createdAt - La fecha en que se creó el indicador financiero (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del indicador financiero (automáticamente gestionado por Mongoose).
 */
const financialIndicatorSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    fecha: { type: Date, required: true },
    beneficio_bruto: { type: Number, required: true },
    beneficio_neto: { type: Number, required: true },
    margen_beneficio_bruto: { type: Number, required: true },
    margen_beneficio_neto: { type: Number, required: true },
    punto_equilibrio: { type: Number, required: true },
    rotacion_inventario: { type: Number, required: true },
    ratio_liquidez: { type: Number, required: true }
}, { timestamps: true });

/**
 * Modelo para el indicador financiero (FinancialIndicator).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "financialindicators" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<FinancialIndicator>}
 */
module.exports = model('FinancialIndicator', financialIndicatorSchema);
