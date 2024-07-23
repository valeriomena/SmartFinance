const { Router } = require('express');
const router = Router();
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/user.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;
