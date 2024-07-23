const { Schema, model } = require('mongoose');

const productionCostSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    productServiceId: { type: Schema.Types.ObjectId, ref: 'ProductService', required: true },
    costo_materia_prima: { type: Number, required: true },
    costo_mano_obra: { type: Number, required: true },
    costo_total: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('ProductionCost', productionCostSchema);
