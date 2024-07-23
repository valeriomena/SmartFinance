const { Router } = require('express');
const router = Router();
const {
    createIncomeStatement,
    getIncomeStatement,
    getIncomeStatements,
    deleteIncomeStatement,
    updateIncomeStatement
} = require('../controllers/incomeStatement.controller');

router.route('/')
    .get(getIncomeStatements)
    .post(createIncomeStatement);

router.route('/:id')
    .get(getIncomeStatement)
    .delete(deleteIncomeStatement)
    .put(updateIncomeStatement);

module.exports = router;
