const { Router } = require('express');
const router = Router();
const {
    createSale,
    getSale,
    getSales,
    deleteSale,
    updateSale
} = require('../controllers/sales.controller');

router.route('/')
    .get(getSales)
    .post(createSale);

router.route('/:id')
    .get(getSale)
    .delete(deleteSale)
    .put(updateSale);

module.exports = router;
