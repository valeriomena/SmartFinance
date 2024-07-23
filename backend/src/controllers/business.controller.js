const Business = require('../models/Business');

const createBusiness = async (req, res, next) => {
    try {
        const business = new Business(req.body);
        await business.save();
        res.status(201).json(business);
    } catch (err) {
        next(err);
    }
};

const getBusiness = async (req, res, next) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.json(business);
    } catch (err) {
        next(err);
    }
};

const getBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        next(err);
    }
};

const deleteBusiness = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateBusiness = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.json(business);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createBusiness,
    getBusiness,
    getBusinesses,
    deleteBusiness,
    updateBusiness
};
