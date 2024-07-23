const IncomeStatement = require('../models/IncomeStatement');

const createIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = new IncomeStatement(req.body);
        await incomeStatement.save();
        res.status(201).json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

const getIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findById(req.params.id);
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

const getIncomeStatements = async (req, res, next) => {
    try {
        const incomeStatements = await IncomeStatement.find();
        res.json(incomeStatements);
    } catch (err) {
        next(err);
    }
};

const deleteIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findByIdAndDelete(req.params.id);
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateIncomeStatement = async (req, res, next) => {
    try {
        const incomeStatement = await IncomeStatement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!incomeStatement) {
            return res.status(404).json({ message: 'Income Statement not found' });
        }
        res.json(incomeStatement);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createIncomeStatement,
    getIncomeStatement,
    getIncomeStatements,
    deleteIncomeStatement,
    updateIncomeStatement
};
