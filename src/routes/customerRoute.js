const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/add', customerController.insertCustomer);
router.get('/search/:index/:size', customerController.searchCustomer);
router.put('/update/:cid', customerController.updateCustomer);
router.delete('/delete/:cid', customerController.deleteCustomer);

module.exports = router;