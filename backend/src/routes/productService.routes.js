const { Router } = require('express');
const router = Router();
const {
    createProductService,
    getProductService,
    getProductServices,
    deleteProductService,
    updateProductService
} = require('../controllers/productService.controller');

router.route('/')
    .get(getProductServices)
    .post(createProductService);

router.route('/:id')
    .get(getProductService)
    .delete(deleteProductService)
    .put(updateProductService);

module.exports = router;
