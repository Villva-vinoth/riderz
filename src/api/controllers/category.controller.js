const { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../services/category.service.js')
module.exports = {
    createCategory: async (req, res) => {
        const data = req.body
        createCategory(data, (err, result) => {
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
    getAllCategory: async (req, res) => {
        getAllCategory((err, result) => {
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
    getOneCategory: async (req, res) => {
        const data = req.params;
        getOneCategory(data, (err, result) => {
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
   
    updateCategory: async (req, res) => {
        const data = { ...req.body, id: req.params.id }
        updateCategory(data, (err, result) => {
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
    deleteCategory: async (req, res) => {
        const data = req.params
        deleteCategory(data, (err, result) => {
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