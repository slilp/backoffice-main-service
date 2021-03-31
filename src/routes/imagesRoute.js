const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

router.post('/add', imagesController.insertImages);
router.get('/info', imagesController.getImages);
router.delete('/delete/:imd', imagesController.deleteImage);

module.exports = router;