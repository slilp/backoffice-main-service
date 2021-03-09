const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/add', invoiceController.insertInvoice);
router.get('/search/:index/:size', invoiceController.searchInvoiceTrans);
router.put('/update/:inv', invoiceController.updateInvoiceTrans);
router.delete('/delete/:inv', invoiceController.deleteInvoiceTrans);

module.exports = router;