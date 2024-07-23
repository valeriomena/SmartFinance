const { Schema, model } = require('mongoose');

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

module.exports = model('FinancialIndicator', financialIndicatorSchema);
