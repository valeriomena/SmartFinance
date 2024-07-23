const FinancialExpense = require('../models/FinancialExpense');

const createFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = new FinancialExpense(req.body);
        await financialExpense.save();
        res.status(201).json(financialExpense);
    } catch (err) {
        next(err);
    }
};

const getFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findById(req.params.id);
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.json(financialExpense);
    } catch (err) {
        next(err);
    }
};

const getFinancialExpenses = async (req, res, next) => {
    try {
        const financialExpenses = await FinancialExpense.find();
        res.json(financialExpenses);
    } catch (err) {
        next(err);
    }
};

const deleteFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findByIdAndDelete(req.params.id);
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateFinancialExpense = async (req, res, next) => {
    try {
        const financialExpense = await FinancialExpense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!financialExpense) {
            return res.status(404).json({ message: 'Financial Expense not found' });
        }
        res.json(financialExpense);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createFinancialExpense,
    getFinancialExpense,
    getFinancialExpenses,
    deleteFinancialExpense,
    updateFinancialExpense
};
