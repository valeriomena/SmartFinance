const { Schema, model } = require('mongoose');

const saleSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    productServiceId: { type: Schema.Types.ObjectId, ref: 'ProductService', required: true },
    fecha: { type: Date, required: true },
    precio_venta: { type: Number, required: true },
    cantidad_vendida: { type: Number, required: true },
    ingreso_total: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('Sale', saleSchema);
