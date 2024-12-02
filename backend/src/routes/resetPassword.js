const { Router } = require('express');
const { resetPassword } = require('../controllers/forgotPassword.controller');

const router = Router();

router.post('/reset-password/:token', resetPassword);

module.exports = router;
