const { Router } = require('express');
const router = Router();
const {
    createProductionCost,
    getProductionCost,
    getProductionCosts,
    deleteProductionCost,
    updateProductionCost
} = require('../controllers/productionCost.controller');

router.route('/')
    .get(getProductionCosts)
    .post(createProductionCost);

router.route('/:id')
    .get(getProductionCost)
    .delete(deleteProductionCost)
    .put(updateProductionCost);

module.exports = router;
