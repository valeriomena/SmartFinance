// index.js
require('dotenv').config();
const app = require('./app'); // Requiere app porque es el que tiene la configuración
require('./database'); // Conexión a la base de datos

// Esta lógica es para ejecutar el servidor
async function main() { 
    const PORT = app.get('port');
    await app.listen(PORT);
    console.log(`El servidor se está ejecutando en el puerto: ${PORT}`);
}

main();
