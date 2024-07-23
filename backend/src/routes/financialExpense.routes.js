const { Router } = require('express');
const router = Router();
const {
    createFinancialExpense,
    getFinancialExpense,
    getFinancialExpenses,
    deleteFinancialExpense,
    updateFinancialExpense
} = require('../controllers/financialExpense.controller');

router.route('/')
    .get(getFinancialExpenses)
    .post(createFinancialExpense);

router.route('/:id')
    .get(getFinancialExpense)
    .delete(deleteFinancialExpense)
    .put(updateFinancialExpense);

module.exports = router;
