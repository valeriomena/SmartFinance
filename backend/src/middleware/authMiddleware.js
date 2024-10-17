const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar un token JWT.
 * 
 * Este middleware verifica si el token JWT proporcionado en el encabezado de la solicitud
 * es válido y no ha expirado. Si el token es válido, se agrega la información del usuario 
 * al objeto `req.user`, lo que permite su acceso en los controladores posteriores.
 * Si el token no es válido o está ausente, se envía una respuesta de error con el código 
 * de estado correspondiente.
 * 
 * @middleware
 * @function authenticateToken
 * @param {Object} req - El objeto de solicitud (request), que contiene el encabezado `Authorization` con el token JWT.
 * @param {Object} res - El objeto de respuesta (response), que se utiliza para enviar una respuesta de error si el token es inválido o está ausente.
 * @param {Function} next - El middleware que pasa el control al siguiente middleware o función de controlador si el token es válido.
 * @returns {void} Si el token es válido, el control se pasa al siguiente middleware o controlador. Si no, se envía un mensaje de error con el código de estado correspondiente.
 * @throws {Error} Si el token es inválido, está ausente o ha expirado, se devuelve un error con el código de estado adecuado:
 * - **401** si el encabezado de autorización o el token están ausentes.
 * - **403** si el token es inválido o ha expirado.
 */
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
