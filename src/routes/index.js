const express = require('express');
const router = express.Router();
const customerRoute = require('./customerRoute');
const purchaseRoute = require('./purchaseRoute');
const invoiceRoute = require('./invoiceRoute');

router.use('/customer',customerRoute);
router.use('/purchase',purchaseRoute);
router.use('/invoice',invoiceRoute);

module.exports = router;