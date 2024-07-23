const ProductService = require('../models/ProductService');

const createProductService = async (req, res, next) => {
    try {
        const productService = new ProductService(req.body);
        await productService.save();
        res.status(201).json(productService);
    } catch (err) {
        next(err);
    }
};

const getProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findById(req.params.id);
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.json(productService);
    } catch (err) {
        next(err);
    }
};

const getProductServices = async (req, res, next) => {
    try {
        const productServices = await ProductService.find();
        res.json(productServices);
    } catch (err) {
        next(err);
    }
};

const deleteProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findByIdAndDelete(req.params.id);
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

const updateProductService = async (req, res, next) => {
    try {
        const productService = await ProductService.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!productService) {
            return res.status(404).json({ message: 'Product/Service not found' });
        }
        res.json(productService);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProductService,
    getProductService,
    getProductServices,
    deleteProductService,
    updateProductService
};
