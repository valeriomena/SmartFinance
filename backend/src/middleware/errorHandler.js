/**
 * Middleware para manejar errores en la aplicación.
 * 
 * Este middleware se encarga de capturar los errores que ocurren en las rutas o en otros 
 * middlewares de la aplicación, y enviar una respuesta con el código de estado adecuado 
 * y un mensaje de error. En el entorno de desarrollo, también se incluye el stack trace 
 * del error, mientras que en producción se muestra un mensaje genérico.
 * 
 * @middleware
 * @function errorHandler
 * @param {Error} err - El objeto de error que contiene la información sobre el error que ocurrió.
 * @param {Object} req - El objeto de solicitud (request) que contiene los datos de la solicitud del cliente.
 * @param {Object} res - El objeto de respuesta (response) que se utiliza para enviar la respuesta al cliente.
 * @param {Function} next - El middleware siguiente, aunque no se utiliza en este caso.
 * @returns {void} Envia una respuesta con el código de estado 500 (Error interno del servidor) y el mensaje de error.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

module.exports = errorHandler;
