const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'El email ingresado no es válido']
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    phone: {
        number: { type: String, required: true },
        country_code: { type: String, required: true }
    },
    whatsapp_country_code: { type: String, required: false }
}, { timestamps: true });

// Pre-hook para hash de contraseñas antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
