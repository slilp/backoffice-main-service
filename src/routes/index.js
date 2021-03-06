const express = require('express');
const router = express.Router();
const customerRoute = require('./customerRoute');
const purchaseRoute = require('./purchaseRoute');
const invoiceRoute = require('./invoiceRoute');
const saleRoute = require('./saleRoute');
const logisticRoute = require('./logisticRoute');
const transporterRoute = require('./transporterRoute');
const imageRoute = require('./imagesRoute');

router.use('/customer', customerRoute);
router.use('/purchase', purchaseRoute);
router.use('/invoice', invoiceRoute);
router.use('/sale', saleRoute);
router.use('/logistic', logisticRoute);
router.use('/transporter', transporterRoute);
router.use('/image', imageRoute);

// multer.array('file')

module.exports = router;