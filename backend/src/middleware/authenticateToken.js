// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica si el encabezado Authorization está presente y tiene el formato correcto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    // Extraer el token después de "Bearer"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Si el token es válido, se almacena la información del usuario en la solicitud
        req.user = user;
        next();
    });
};

// Middleware para autorizar roles específicos
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        // Si el rol del usuario no está autorizado, devolver un error
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. Role '${req.user.role}' is not authorized to access this resource.` 
            });
        }
        next(); // Si el rol está autorizado, proceder
    };
};

module.exports = { authenticateToken, authorizeRoles };
