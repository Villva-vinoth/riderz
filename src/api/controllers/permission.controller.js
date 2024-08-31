const { createPermission, getAllPermission, getOnePermission, getAllPermissionByRole } = require('../services/permission.service')

module.exports = {
    createPermission: async (req, res) => {
        const data = req.body
        createPermission(data, (err, result) => {
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
    getAllPermission: async (req, res) => {
        getAllPermission((err, result) => {
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
    getOnePermission: async (req, res) => {
        const data = req.params;
        getOnePermission(data, (err, result) => {
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
    getAllPermissionByRole: async (req, res) => {
        const data = req.params;
        getAllPermissionByRole(data, (err, result) => {
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

}