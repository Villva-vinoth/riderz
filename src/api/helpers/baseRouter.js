const router = require('express').Router()
const { authorization } = require('../middlewares/auth.js');
const authRouter = require('../routers/auth.routes.js')
const adminUserRouter = require('../routers/adminUser.router.js')
const roleRouter = require('../routers/role.router.js')
const permissionRotuer = require('../routers/permission.router.js')
const categoriesRouter = require('../routers/category.router.js')
const subCategoriesRouter = require('../routers/subCategory.router.js')
const vehicleCategoriesRouter = require('../routers/vehicleCategory.router.js')
const imageRouter = require('../routers/image.router.js')

router.use('/auth', authRouter);
router.use('/admin_users', authorization, adminUserRouter);
router.use('/roles', authorization, roleRouter);
router.use('/permissions', authorization, permissionRotuer);
router.use('/categories', authorization, categoriesRouter);
router.use('/sub_categories', authorization, subCategoriesRouter);
router.use('/vehicle_categories', authorization, vehicleCategoriesRouter);
router.use('/image',imageRouter);


module.exports = router