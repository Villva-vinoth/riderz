const { createPermission, getAllPermission, getOnePermission, getAllPermissionByRole, updatePermission, deletePermission } = require('../controllers/permission.controller')

const router = require('express').Router()

router.post('/create', createPermission);
router.get('/list', getAllPermission);
router.get('/show/:id', getOnePermission);
router.get('/showRole/:id', getAllPermissionByRole);
router.patch('/edit/:id',updatePermission);
router.delete('/delete/:id',deletePermission);


module.exports = router

