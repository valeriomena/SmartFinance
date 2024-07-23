const ProductionCost = require('../models/ProductionCost');

const createProductionCost = async (req, res, next) => {
    try {
        const productionCost = new ProductionCost(req.body);
        await productionCost.save();
        res.status(201).json(productionCost);
    } catch (err) {
        next(err);
    }
};

const getProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findById(req.params.id);
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.json(productionCost);
    } catch (err) {
        next(err);
    }
};

const getProductionCosts = async (req, res, next) => {
    try {
        const productionCosts = await ProductionCost.find();
        res.json(productionCosts);
    } catch (err) {
        next(err);
    }
};

const deleteProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findByIdAndDelete(req.params.id);
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateProductionCost = async (req, res, next) => {
    try {
        const productionCost = await ProductionCost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!productionCost) {
            return res.status(404).json({ message: 'Production Cost not found' });
        }
        res.json(productionCost);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProductionCost,
    getProductionCost,
    getProductionCosts,
    deleteProductionCost,
    updateProductionCost
};
