const { Router } = require('express');
const router = Router();
const {
    createFinancialIndicator,
    getFinancialIndicator,
    getFinancialIndicators,
    deleteFinancialIndicator,
    updateFinancialIndicator
} = require('../controllers/financialIndicator.controller');

router.route('/')
    .get(getFinancialIndicators)
    .post(createFinancialIndicator);

router.route('/:id')
    .get(getFinancialIndicator)
    .delete(deleteFinancialIndicator)
    .put(updateFinancialIndicator);

module.exports = router;
