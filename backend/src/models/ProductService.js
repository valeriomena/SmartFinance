const { Schema, model } = require('mongoose');

const productServiceSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true }
}, { timestamps: true });

module.exports = model('ProductService', productServiceSchema);
