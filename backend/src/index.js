/**
 * Archivo principal que inicializa y ejecuta el servidor de la aplicación.
 * 
 * Este archivo se encarga de cargar las variables de entorno, establecer la conexión
 * a la base de datos, y ejecutar el servidor en el puerto especificado.
 * 
 * @module index
 */

require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const app = require('./app'); // Importa la configuración de la aplicación (rutas, middlewares, etc.)
require('./database'); // Establece la conexión a la base de datos

/**
 * Función principal que ejecuta el servidor.
 * 
 * - Obtiene el puerto de la configuración de la aplicación (definido en `app.js`).
 * - Inicia el servidor escuchando en ese puerto.
 * - Imprime un mensaje en la consola cuando el servidor está en ejecución.
 * 
 * @async
 * @function main
 * @returns {Promise<void>} Promesa que se resuelve cuando el servidor se ha iniciado correctamente.
 */
async function main() { 
    const PORT = app.get('port'); // Obtiene el puerto desde la configuración de la aplicación
    await app.listen(PORT); // Inicia el servidor en el puerto especificado
    console.log(`El servidor se está ejecutando en el puerto: ${PORT}`); // Imprime un mensaje en la consola
}

main(); // Ejecuta la función principal
