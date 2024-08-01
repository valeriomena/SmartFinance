const { Router } = require('express');
const router = Router();
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
} = require('../controllers/user.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

// Ruta de inicio de sesión
router.post('/login', loginUser);

module.exports = router;
