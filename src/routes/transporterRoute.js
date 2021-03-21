const express = require('express');
const router = express.Router();
const transporterController = require('../controllers/transporterController');

router.get('/all', transporterController.getAllTransporterList);

module.exports = router;