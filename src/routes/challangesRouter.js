// * Third party imports
const express = require('express');
const router = express.Router();
const multer = require('multer');

// * Controller imports
const { createChallenge } = require('../controllers/challengesConroller');



// * Configure Multer
const upload = multer();

router.post('/',  upload.single('image'), createChallenge);

module.exports = router;