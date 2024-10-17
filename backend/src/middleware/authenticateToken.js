const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar el token JWT.
 * 
 * Este middleware verifica si el token JWT proporcionado en el encabezado de la solicitud
 * es válido y no ha expirado. Si el token es válido, se almacena la información del usuario
 * en el objeto `req.user` para su uso posterior en los controladores.
 * Si el token no es válido o está ausente, se responde con un error.
 * 
 * @middleware
 * @function authenticateToken
 * @param {Object} req - El objeto de solicitud (request), que contiene el encabezado `Authorization` con el token JWT.
 * @param {Object} res - El objeto de respuesta (response), que se utiliza para enviar una respuesta de error si el token es inválido o está ausente.
 * @param {Function} next - El middleware que pasa el control al siguiente middleware o función de controlador si el token es válido.
 * @returns {void} Si el token es válido, el control se pasa al siguiente middleware o controlador. Si no, se envía un mensaje de error con el código de estado correspondiente.
 * @throws {Error} Si el token es inválido, está ausente o ha expirado, se devuelve un error con el código de estado adecuado.
 */
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

/**
 * Middleware para autorizar roles específicos.
 * 
 * Este middleware verifica si el rol del usuario (almacenado en `req.user.role`) tiene acceso
 * a la ruta solicitada, comparándolo con los roles permitidos que se pasan como parámetro.
 * Si el rol del usuario no está en la lista de roles permitidos, se devuelve un error de acceso denegado.
 * 
 * @middleware
 * @function authorizeRoles
 * @param {Array<string>} roles - Una lista de roles autorizados para acceder a la ruta.
 * @returns {Function} Función middleware que verifica si el rol del usuario está en la lista de roles permitidos.
 * @param {Object} req - El objeto de solicitud (request), que contiene la información del usuario autenticado en `req.user`.
 * @param {Object} res - El objeto de respuesta (response), que se utiliza para enviar una respuesta de error si el rol no está autorizado.
 * @param {Function} next - El middleware que pasa el control al siguiente middleware o función de controlador si el rol es autorizado.
 * @returns {void} Si el rol está autorizado, el control se pasa al siguiente middleware o controlador. Si no, se envía un mensaje de error con el código de estado 403.
 * @throws {Error} Si el rol del usuario no está autorizado, se devuelve un error con el código de estado 403.
 */
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
