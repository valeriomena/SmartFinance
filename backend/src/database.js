const env = require("dotenv");
env.config(); // debe ir en este orden
const mongoose = require('mongoose');

// cadena de conexion
const URI = process.env.URI_CONEXION //esta variable de entorno es fundamental para el despliegue
    ? process.env.URI_CONEXION // MongoDB Atlas se pone la cadena de conexion en esta variable en el .env
    : 'mongodb://localhost/dbtest';
const connection = mongoose.connect(URI);

connection.then(() => {
  console.log('La base de datos ha sido conectada ');
}).catch(error => {
  console.error('Error al conectar con la base de datos:', error);
});

module.exports = connection;

