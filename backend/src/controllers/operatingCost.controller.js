const OperatingCost = require('../models/OperatingCost');

const createOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = new OperatingCost(req.body);
        await operatingCost.save();
        res.status(201).json(operatingCost);
    } catch (err) {
        next(err);
    }
};

const getOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findById(req.params.id);
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.json(operatingCost);
    } catch (err) {
        next(err);
    }
};

const getOperatingCosts = async (req, res, next) => {
    try {
        const operatingCosts = await OperatingCost.find();
        res.json(operatingCosts);
    } catch (err) {
        next(err);
    }
};

const deleteOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findByIdAndDelete(req.params.id);
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateOperatingCost = async (req, res, next) => {
    try {
        const operatingCost = await OperatingCost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!operatingCost) {
            return res.status(404).json({ message: 'Operating Cost not found' });
        }
        res.json(operatingCost);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOperatingCost,
    getOperatingCost,
    getOperatingCosts,
    deleteOperatingCost,
    updateOperatingCost
};
