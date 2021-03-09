const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/add', purchaseController.insertNewPurchase);
router.get('/search/:index/:size', purchaseController.searchPurchaseTrans);
router.put('/update/:pid', purchaseController.updatePurchaseTrans);
router.delete('/delete/:pid', purchaseController.deletePurchaseTrans);

module.exports = router;