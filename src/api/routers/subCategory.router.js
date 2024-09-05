const { createSubCategory, getAllSubCategory, getOneSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategory.controller');

const router = require('express').Router()

router.post('/create',createSubCategory);
router.get('/list',getAllSubCategory);
router.get('/show/:id',getOneSubCategory);
router.patch('/edit/:id',updateSubCategory);
router.delete('/delete/:id',deleteSubCategory);
module.exports = router

