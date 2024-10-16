const User = require('../models/user');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const bcrypt = require('bcrypt'); // Requiere bcrypt si antes se utilizaba

// Crear usuario (registro)
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

// Login de usuario (comparando la contraseña con el hash de argon2)

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

// Obtener usuario por ID
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

// Obtener todos los usuarios
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// Eliminar usuario
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

// Actualizar usuario
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
