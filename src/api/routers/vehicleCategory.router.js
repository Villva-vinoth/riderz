const { createVehicleCategory, getAllVehicleCategory, getOneVehicleCategory, updateVehicleCategory, deleteVehicleCategory } = require('../controllers/vehicleCategory.controller');

const router = require('express').Router()

router.post('/create',createVehicleCategory);
router.get('/list',getAllVehicleCategory);
router.get('/show/:id',getOneVehicleCategory);
router.patch('/edit/:id',updateVehicleCategory);
router.delete('/delete/:id',deleteVehicleCategory);
module.exports = router

