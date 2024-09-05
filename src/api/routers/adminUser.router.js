const { createAdminUser, getAllUser, getOneUser, deleteUser, updateUser } = require('../controllers/adminUser.controller')

const router = require('express').Router()

router.post('/create',createAdminUser);
router.get('/list',getAllUser);
router.get('/show/:id',getOneUser);
router.patch('/edit/:id',updateUser);
router.delete('/delete/:id',deleteUser);
module.exports = router

