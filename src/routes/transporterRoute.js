const express = require('express');
const router = express.Router();
const transporterController = require('../controllers/transporterController');

router.post('/add', transporterController.insertTransporter);
router.get('/all', transporterController.getAllTransporterList);
router.delete('/delete/:tid', transporterController.deleteTransporter);

module.exports = router;