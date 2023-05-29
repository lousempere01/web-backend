const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const contactCtrl = require("../controllers/contact");

router.post("/", contactCtrl.createContact);

module.exports = router;
