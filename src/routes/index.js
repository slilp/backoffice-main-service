const express = require('express');
const router = express.Router();
const customerRoute = require('./customerRoute');
const purchaseRoute = require('./purchaseRoute');
const invoiceRoute = require('./invoiceRoute');
const saleRoute = require('./saleRoute');
const logisticRoute = require('./logisticRoute');
const transporterRoute = require('./transporterRoute');
const { multer } = require('../middleware/melter');
const {Storage} = require('@google-cloud/storage');
const jsonkey = require('../../pfar-thai-3bb4464378ea.json');
const {format} = require('util');
const gc = new Storage({
  credentials: jsonkey
});

const bucket = gc.bucket("pfar-thai");


router.use('/customer', customerRoute);
router.use('/purchase', purchaseRoute);
router.use('/invoice', invoiceRoute);
router.use('/sale', saleRoute);
router.use('/logistic', logisticRoute);
router.use('/transporter', transporterRoute);

router.post('/upload', multer.array('file'), (req, res, next) => {

    if (!req.files || req.files.length == 0) {
      res.status(400).send('No file uploaded.');
      return;
    }
  
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.files[0].originalname);
    const blobStream = blob.createWriteStream();
  
    blobStream.on('error', err => {
      next(err);
    });
  
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${'pfar-thai'}/${blob.name}`
      );
      res.status(200).send(publicUrl);
    });
  
    blobStream.end(req.files[0].buffer);
});

module.exports = router;