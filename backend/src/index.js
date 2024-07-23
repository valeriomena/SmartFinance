require('dotenv').config()

const app = require('./app')//Requiere app porque es el que tiene la configuracion
require('./database')
//esta logica es par ejecutar el servidor
async function main() { 
    await app.listen(app.get('port'))
    console.log('el servidor se esta ejecutando en el puerto: ', app.get('port'));
}
main();
//configuracion del servidor