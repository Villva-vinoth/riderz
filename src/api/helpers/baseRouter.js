const router = require('express').Router()
const { authorization } = require('../middlewares/auth.js');
const authRouter = require('../routers/auth.routes.js')
const adminUserRouter = require('../routers/adminUser.router.js')
const roleRouter = require('../routers/role.router.js')
const permissionRotuer = require('../routers/permission.router.js')
router.use('/auth', authRouter);
router.use('/admin_users', authorization, adminUserRouter);
router.use('/roles', authorization, roleRouter);
router.use('/permissions', authorization, permissionRotuer);
module.exports = router