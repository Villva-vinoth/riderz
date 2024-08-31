const { login, createAdminUser } = require('../controllers/adminUser.controller');
const {  getAllRole, createRole } = require('../controllers/role.controller');
const { checkToken } = require('../middlewares/auth');

const router = require('express').Router()

router.post('/login',login);
router.post('/register',createAdminUser);
router.get('/role',getAllRole);
router.get('/check',checkToken)
router.post('/role',createRole)

module.exports = router