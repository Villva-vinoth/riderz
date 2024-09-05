const { createSubCategory, getAllSubCategory, getOneSubCategory, deleteSubCategory, updateSubCategory } = require('../services/subCategory.service.js')
module.exports = {
    createSubCategory: async (req, res) => {
        const data = req.body
        createSubCategory(data, (err, result) => {
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
    getAllSubCategory: async (req, res) => {
        getAllSubCategory((err, result) => {
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
    getOneSubCategory: async (req, res) => {
        const data = req.params;
        getOneSubCategory(data, (err, result) => {
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
   
    updateSubCategory: async (req, res) => {
        const data = { ...req.body, id: req.params.id }
        updateSubCategory(data, (err, result) => {
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
    deleteSubCategory: async (req, res) => {
        const data = req.params
        deleteSubCategory(data, (err, result) => {
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