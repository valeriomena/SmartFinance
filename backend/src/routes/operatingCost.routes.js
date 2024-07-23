const { Router } = require('express');
const router = Router();
const {
    createOperatingCost,
    getOperatingCost,
    getOperatingCosts,
    deleteOperatingCost,
    updateOperatingCost
} = require('../controllers/operatingCost.controller');

router.route('/')
    .get(getOperatingCosts)
    .post(createOperatingCost);

router.route('/:id')
    .get(getOperatingCost)
    .delete(deleteOperatingCost)
    .put(updateOperatingCost);

module.exports = router;
