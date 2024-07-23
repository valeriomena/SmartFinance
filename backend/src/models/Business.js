const { Schema, model } = require('mongoose');

const businessSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }  // Asociación con el usuario que creó el negocio
}, { timestamps: true });

module.exports = model('Business', businessSchema);
