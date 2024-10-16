const env = require("dotenv");
env.config(); // Cargar las variables de entorno
const mongoose = require('mongoose');

// Configuración de la cadena de conexión
const URI = process.env.URI_CONEXION 
    ? process.env.URI_CONEXION // MongoDB Atlas
    : 'mongodb://localhost/dbtest'; // Base de datos local para desarrollo

// Opciones de configuración para la conexión (sin useNewUrlParser y useUnifiedTopology)
const options = {
    maxPoolSize: 10, // Número máximo de conexiones simultáneas
    retryWrites: true, // Reintenta escrituras fallidas automáticamente
    connectTimeoutMS: 10000, // Tiempo de espera para conectar (10 segundos)
};

// Conectar a la base de datos
const connection = mongoose.connect(URI, options);

// Gestión de eventos de conexión y errores
mongoose.connection.on('connected', () => {
  console.log('Conectado a la base de datos con éxito');
});

mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a la base de datos:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de la base de datos. Intentando reconectar...');
});

// Intentar reconectar si hay desconexión
mongoose.connection.on('reconnected', () => {
  console.log('Reconexión exitosa a la base de datos');
});

connection.then(() => {
  console.log('La conexión a la base de datos se ha establecido correctamente');
}).catch(error => {
  console.error('Error al conectar con la base de datos:', error);
});

module.exports = connection;
