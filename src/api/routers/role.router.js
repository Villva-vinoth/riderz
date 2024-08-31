const { createRole, getAllRole, getOneRole } = require('../controllers/role.controller')

const router = require('express').Router()

router.post('/create', createRole);
router.get('/list', getAllRole);
router.get('/show/:id', getOneRole);

module.exports = router

