const { Schema, model } = require('mongoose');

const operatingCostSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    tipo_gasto: { type: String, required: true },
    monto: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('OperatingCost', operatingCostSchema);
