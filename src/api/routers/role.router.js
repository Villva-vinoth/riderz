const { createRole, getAllRole, getOneRole, deleteRole, updateRole } = require('../controllers/role.controller')

const router = require('express').Router()

router.post('/create', createRole);
router.get('/list', getAllRole);
router.get('/show/:id', getOneRole);
router.patch('/edit/:id',updateRole);
router.delete('/delete/:id',deleteRole);
module.exports = router

