const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.get('/all', saleController.getAllSaleList);

module.exports = router;