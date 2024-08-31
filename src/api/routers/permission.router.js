const { createPermission, getAllPermission, getOnePermission, getAllPermissionByRole } = require('../controllers/permission.controller')

const router = require('express').Router()

router.post('/create', createPermission);
router.get('/list', getAllPermission);
router.get('/show/:id', getOnePermission);
router.get('/showRole/:id', getAllPermissionByRole);


module.exports = router

