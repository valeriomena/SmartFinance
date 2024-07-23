const Sale = require('../models/Sale');

const createSale = async (req, res, next) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        next(err);
    }
};

const getSale = async (req, res, next) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (err) {
        next(err);
    }
};

const getSales = async (req, res, next) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        next(err);
    }
};

const deleteSale = async (req, res, next) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateSale = async (req, res, next) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createSale,
    getSale,
    getSales,
    deleteSale,
    updateSale
};
