const { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

const router = require('express').Router()

router.post('/create',createCategory);
router.get('/list',getAllCategory);
router.get('/show/:id',getOneCategory);
router.patch('/edit/:id',updateCategory);
router.delete('/delete/:id',deleteCategory);
module.exports = router

