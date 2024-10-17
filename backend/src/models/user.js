/**
 * Módulo que define el esquema de "User" (Usuario) en la base de datos utilizando Mongoose.
 * 
 * Este esquema describe la estructura de los documentos relacionados con los usuarios del sistema,
 * incluyendo la información personal del usuario, su rol, y la gestión de la contraseña.
 * 
 * @module models/User
 */

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Esquema para representar los usuarios en la base de datos.
 * 
 * Este esquema contiene los siguientes campos:
 * - `name`: El nombre del usuario (requerido).
 * - `email`: El correo electrónico del usuario (requerido, único, debe seguir un formato de email válido).
 * - `password`: La contraseña del usuario (requerido), será almacenada de forma segura utilizando hash.
 * - `role`: El rol del usuario, que puede ser "admin" o "user" (requerido).
 * - `phone`: Un objeto que contiene la información del número de teléfono, con el código de país y el número (ambos requeridos).
 * - `whatsapp_country_code`: El código de país de WhatsApp, que es opcional.
 * 
 * Además, se incluyen marcas de tiempo (timestamps) para registrar la fecha de creación y la última actualización del documento.
 * 
 * @typedef {Object} User
 * @property {string} name - El nombre del usuario.
 * @property {string} email - El correo electrónico del usuario (debe ser único).
 * @property {string} password - La contraseña del usuario (será hashada antes de ser almacenada).
 * @property {('admin'|'user')} role - El rol del usuario (puede ser "admin" o "user").
 * @property {Object} phone - Información del teléfono del usuario.
 * @property {string} phone.number - El número de teléfono del usuario.
 * @property {string} phone.country_code - El código de país del número de teléfono.
 * @property {string} [whatsapp_country_code] - El código de país para WhatsApp (opcional).
 * @property {Date} createdAt - La fecha en que se creó el documento (automáticamente gestionado por Mongoose).
 * @property {Date} updatedAt - La fecha de la última actualización del documento (automáticamente gestionado por Mongoose).
 */
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

/**
 * Pre-hook para hash de contraseñas antes de guardar el usuario en la base de datos.
 * 
 * Este middleware se ejecuta antes de guardar un nuevo usuario. Si la contraseña del usuario ha sido modificada,
 * se genera un salt y la contraseña se hashará antes de ser almacenada.
 * 
 * @function
 * @param {Function} next - La función que permite pasar al siguiente middleware.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Método para comparar la contraseña ingresada por el usuario con la almacenada en la base de datos.
 * 
 * Este método compara la contraseña proporcionada por el usuario con la contraseña almacenada (que está hashada).
 * 
 * @function
 * @param {string} candidatePassword - La contraseña que el usuario ingresa durante el login.
 * @returns {Promise<boolean>} - Devuelve una promesa que se resuelve con `true` si las contraseñas coinciden,
 *                                o `false` si no coinciden.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Modelo para los usuarios (User).
 * 
 * Este modelo proporciona una interfaz para interactuar con los documentos de la colección "users" 
 * en la base de datos de MongoDB.
 * 
 * @type {Model<User>}
 */
module.exports = model('User', userSchema);
