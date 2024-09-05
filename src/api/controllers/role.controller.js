const { createRole, getAllRole, getOneRole, updateRole, deleteRole } = require('../services/role.service.js')

module.exports = {
    createRole: async (req, res) => {
        const data = req.body
        createRole(data, (err, result) => {
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
    getAllRole: async (req, res) => {
        getAllRole((err, result) => {
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
    getOneRole: async (req, res) => {
        const data = req.params;
        getOneRole(data, (err, result) => {
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
    updateRole: async (req, res) => {
        const data = { ...req.body, id: req.params.id }
        updateRole(data, (err, result) => {
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
    deleteRole: async (req, res) => {
        const data = req.params
        deleteRole(data, (err, result) => {
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