const FinancialIndicator = require('../models/FinancialIndicator');

const createFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = new FinancialIndicator(req.body);
        await financialIndicator.save();
        res.status(201).json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

const getFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findById(req.params.id);
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

const getFinancialIndicators = async (req, res, next) => {
    try {
        const financialIndicators = await FinancialIndicator.find();
        res.json(financialIndicators);
    } catch (err) {
        next(err);
    }
};

const deleteFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findByIdAndDelete(req.params.id);
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateFinancialIndicator = async (req, res, next) => {
    try {
        const financialIndicator = await FinancialIndicator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!financialIndicator) {
            return res.status(404).json({ message: 'Financial Indicator not found' });
        }
        res.json(financialIndicator);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createFinancialIndicator,
    getFinancialIndicator,
    getFinancialIndicators,
    deleteFinancialIndicator,
    updateFinancialIndicator
};
