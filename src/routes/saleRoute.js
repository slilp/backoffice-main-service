const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/add', saleController.insertSale);
router.get('/all', saleController.getAllSaleList);
router.delete('/delete/:sid', saleController.deleteSale);

module.exports = router;

