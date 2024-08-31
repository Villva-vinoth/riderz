const { createAdminUser, getAllUser, getOneUser } = require('../controllers/adminUser.controller')

const router = require('express').Router()

router.post('/create',createAdminUser);
router.get('/list',getAllUser);
router.get('/show/:id',getOneUser);

module.exports = router

