/**
 * Módulo para gestionar la conexión a la base de datos MongoDB.
 * 
 * Este archivo configura y establece la conexión con MongoDB, ya sea a través de
 * MongoDB Atlas (si se especifica una URI en las variables de entorno) o una base de datos local
 * para desarrollo. También maneja eventos de conexión, errores y reconexiones automáticas.
 * 
 * @module database
 */

const env = require("dotenv");
env.config(); // Cargar las variables de entorno desde el archivo .env
const mongoose = require('mongoose');

/**
 * Cadena de conexión a la base de datos.
 * 
 * Se obtiene de la variable de entorno `URI_CONEXION`. Si no se encuentra la URI, se utiliza una base de datos local para desarrollo (`mongodb://localhost/dbtest`).
 * 
 * @constant {string} URI
 */
const URI = process.env.URI_CONEXION 
    ? process.env.URI_CONEXION // MongoDB Atlas
    : 'mongodb://localhost/dbtest'; // Base de datos local para desarrollo

/**
 * Opciones de configuración para la conexión a MongoDB.
 * 
 * - `maxPoolSize`: Establece el número máximo de conexiones simultáneas al pool de conexiones.
 * - `retryWrites`: Indica si las escrituras fallidas se deben reintentar automáticamente.
 * - `connectTimeoutMS`: Tiempo en milisegundos para esperar una conexión antes de que falle.
 * 
 * @constant {Object} options
 */
const options = {
    maxPoolSize: 10, // Número máximo de conexiones simultáneas
    retryWrites: true, // Reintenta escrituras fallidas automáticamente
    connectTimeoutMS: 10000, // Tiempo de espera para conectar (10 segundos)
};

/**
 * Establece la conexión a la base de datos MongoDB utilizando las opciones definidas.
 * 
 * @function
 * @returns {Promise} Promesa que se resuelve si la conexión es exitosa, o se rechaza en caso de error.
 */
const connection = mongoose.connect(URI, options);

// Eventos de la conexión con MongoDB

/**
 * Evento que se dispara cuando la conexión con MongoDB se ha establecido con éxito.
 * 
 * Este evento imprime un mensaje en la consola indicando que la conexión ha sido exitosa.
 */
mongoose.connection.on('connected', () => {
  console.log('Conectado a la base de datos con éxito');
});

/**
 * Evento que se dispara cuando ocurre un error en la conexión con MongoDB.
 * 
 * Este evento imprime el error en la consola.
 * 
 * @param {Error} error - El error que ocurrió durante la conexión.
 */
mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a la base de datos:', error);
});

/**
 * Evento que se dispara cuando la conexión con MongoDB se ha desconectado.
 * 
 * Este evento imprime un mensaje en la consola indicando que la base de datos se ha desconectado
 * e intenta reconectar automáticamente.
 */
mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de la base de datos. Intentando reconectar...');
});

/**
 * Evento que se dispara cuando se ha reconectado con éxito a MongoDB.
 * 
 * Este evento imprime un mensaje en la consola indicando que la reconexión ha sido exitosa.
 */
mongoose.connection.on('reconnected', () => {
  console.log('Reconexión exitosa a la base de datos');
});

/**
 * Promesa que maneja la conexión inicial a la base de datos.
 * 
 * Si la conexión es exitosa, imprime un mensaje en la consola. Si falla, muestra el error.
 */
connection.then(() => {
  console.log('La conexión a la base de datos se ha establecido correctamente');
}).catch(error => {
  console.error('Error al conectar con la base de datos:', error);
});

module.exports = connection;
