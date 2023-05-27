const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const CatCtrl = require('../controllers/categories');

router.post('/', auth, multer, CatCtrl.createCategory);
router.put('/:id', auth, CatCtrl.modifyCategory);
router.delete('/:id', auth, CatCtrl.deleteCategory);
router.get('/:id', auth, CatCtrl.getOneCategory);
router.get('/', auth, CatCtrl.getAllCategories);

module.exports = router;

