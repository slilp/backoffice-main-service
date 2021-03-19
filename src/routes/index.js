const express = require('express');
const router = express.Router();
const customerRoute = require('./customerRoute');
const purchaseRoute = require('./purchaseRoute');
const invoiceRoute = require('./invoiceRoute');
const saleRoute = require('./saleRoute');

router.use('/customer',customerRoute);
router.use('/purchase',purchaseRoute);
router.use('/invoice',invoiceRoute);
router.use('/sale',saleRoute);

module.exports = router;