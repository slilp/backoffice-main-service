const express = require('express');
const router = express.Router();
const logisticController = require('../controllers/logisticController');

router.post('/add', logisticController.insertLogistic);
router.get('/search/:index/:size', logisticController.searchLogisticTrans);
router.get('/info/:lid',logisticController.getLogisticInfo);
router.delete('/delete/:lid', logisticController.deleteLogisticTrans);
router.get('/count/:status', logisticController.countLogisticByStatus);
router.put('/update/:lid', logisticController.updateLogisticTrans);

module.exports = router;