const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Verifica si el encabezado de autorización está presente
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    // Dividir el encabezado para extraer el token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Verificar si el error es por expiración del token
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            }
            // Otros errores relacionados con el token
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Si el token es válido, guarda la información del usuario en la solicitud
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
