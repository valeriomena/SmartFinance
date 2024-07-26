const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    phone: {
        number: { type: String, required: true },
        country_code: { type: String, required: true }
    },
    whatsapp_country_code: { type: String, required: true }
}, { timestamps: true });

module.exports = model('User', userSchema);
