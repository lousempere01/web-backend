const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const pagesCtrl = require("../controllers/pages");

router.post("/", multer, pagesCtrl.createPage);
router.put("/:id", auth, pagesCtrl.modifyPage);
router.delete("/:id", auth, pagesCtrl.deletePage);
router.get("/:id", auth, pagesCtrl.getOnePage);
router.get("/", auth, pagesCtrl.getAllPages);

module.exports = router;
