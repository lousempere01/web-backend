const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const contactCtrl = require('../controllers/contact');

router.post('/', auth, multer, contactCtrl.createContact);

module.exports = router;

