const User = require('../models/user');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const bcrypt = require('bcrypt'); // Requiere bcrypt si antes se utilizaba

/**
 * Crea un nuevo usuario (registro).
 * 
 * @async
 * @function createUser
 * @param {Object} req - El objeto de solicitud (request), que contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el usuario creado y el código de estado 201.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el usuario creado y el código de estado 201.
 * @throws {Error} Si ocurre un error al guardar el usuario.
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role, phone } = req.body;
        const user = new User({
            name,
            email,
            password,  // Pasa la contraseña tal como está (sin hash)
            role,
            phone
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

/**
 * Permite al usuario iniciar sesión, comparando la contraseña con el hash almacenado (bcrypt o argon2).
 * 
 * @async
 * @function loginUser
 * @param {Object} req - El objeto de solicitud (request), que contiene las credenciales (email y password) en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará el token JWT y los datos del usuario si las credenciales son correctas.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el token JWT, ID de usuario y rol si las credenciales son correctas.
 * @throws {Error} Si ocurre un error al verificar las credenciales o al generar el token.
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let isMatch = false;
        // Verifica si el hash almacenado es de bcrypt (inicia con "$2b$")
        if (user.password.startsWith('$2b$')) {
            console.log('Usando bcrypt para verificar la contraseña');
            isMatch = await bcrypt.compare(password, user.password); // Verificar usando bcrypt
        } else {
            console.log('Usando argon2 para verificar la contraseña');
            isMatch = await argon2.verify(user.password, password); // Verificar usando argon2
        }

        console.log('¿Coinciden las contraseñas?:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generar token JWT si las credenciales son correctas
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user._id, role: user.role });
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un usuario específico por su ID.
 * 
 * @async
 * @function getUser
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del usuario como parámetro en la URL.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el usuario encontrado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el usuario encontrado o un mensaje de error si no se encuentra.
 * @throws {Error} Si ocurre un error al buscar el usuario.
 */
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene todos los usuarios.
 * 
 * @async
 * @function getUsers
 * @param {Object} req - El objeto de solicitud (request).
 * @param {Object} res - El objeto de respuesta (response), que enviará una lista de todos los usuarios.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Array} Respuesta con una lista de todos los usuarios.
 * @throws {Error} Si ocurre un error al obtener los usuarios.
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

/**
 * Elimina un usuario específico por su ID.
 * 
 * @async
 * @function deleteUser
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del usuario a eliminar.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el código de estado 204 si la eliminación es exitosa.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {void} Respuesta con código de estado 204 si la eliminación es exitosa, o un mensaje de error si el usuario no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/**
 * Actualiza un usuario específico por su ID.
 * 
 * @async
 * @function updateUser
 * @param {Object} req - El objeto de solicitud (request), que contiene el ID del usuario y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta (response), que enviará una respuesta con el usuario actualizado o un mensaje de error si no se encuentra.
 * @param {Function} next - El middleware para pasar el control al siguiente manejador en caso de error.
 * @returns {Object} Respuesta con el usuario actualizado o mensaje de error si el usuario no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el usuario.
 */
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
};
