const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');
const { multer } = require('../middleware/melter');

router.post('/add' , multer.single('file')  , imagesController.insertImages);
router.get('/info', imagesController.getImages);
router.delete('/delete/:imd', imagesController.deleteImage);

module.exports = router;