const { Router } = require('express')
const router = Router()
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} = require('../controller/user.controller')

router.route('/')//sin parametro se utilizan estas rutas
    .get(getUsers)
    .post(createUser)

router.route('/:id')//con parametros utilizamos estas rutas: ID se pasa por la url para poder hacer el tratamiento de datos
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router;//para poder utilizar el archivo en otra parte del proyecto
