const { Router } = require('express');
const router = Router();
const {
    createBusiness,
    getBusiness,
    getBusinesses,
    deleteBusiness,
    updateBusiness
} = require('../controllers/business.controller');

router.route('/')
    .get(getBusinesses)
    .post(createBusiness);

router.route('/:id')
    .get(getBusiness)
    .delete(deleteBusiness)
    .put(updateBusiness);

module.exports = router;
