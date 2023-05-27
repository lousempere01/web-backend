const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sessionsCtrl = require("../controllers/sessions");

router.post("/", auth, multer, sessionsCtrl.createSession);
router.put("/:id", auth, sessionsCtrl.modifySession);
router.delete("/:id", auth, sessionsCtrl.deleteSession);
router.get("/:id", auth, sessionsCtrl.getOneSession);

module.exports = router;
