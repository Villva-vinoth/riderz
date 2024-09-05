const { createVehicleCategory, getAllVehicleCategory, getOneVehicleCategory, deleteVehicleCategory, updateVehicleCategory } = require('../services/vehicleCategory.service.js')
module.exports = {
    createVehicleCategory: async (req, res) => {
        const data = req.body
        createVehicleCategory(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    sucess: false,
                    message: err.message
                })
            }
            return res.status(201).json({
                success: true,
                message: "Created Successfully !"
            })
        })
    },
    getAllVehicleCategory: async (req, res) => {
        getAllVehicleCategory((err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        })
    },
    getOneVehicleCategory: async (req, res) => {
        const data = req.params;
        getOneVehicleCategory(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        })
    },
   
    updateVehicleCategory: async (req, res) => {
        const data = { ...req.body, id: req.params.id }
        updateVehicleCategory(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: true,
                message: result
            })
        })
    },
    deleteVehicleCategory: async (req, res) => {
        const data = req.params
        deleteVehicleCategory(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        })
    }
}