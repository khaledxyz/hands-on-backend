// * Third party imports
const express = require('express');
const router = express.Router();
const multer = require('multer');

// * Controller imports
const { createProduct } = require('../controllers/productsController');



// * Configure Multer
const upload = multer();

router.post('/',  upload.single('image'), createProduct);

module.exports = router;