const { authentication } = require('../middlewares/auth.js')
const { createAdminUser, getAllUser, getOneUser, getOneUsername } = require('../services/adminUser.service.js')
const bcrypt = require('bcrypt')
module.exports = {
    createAdminUser: async (req, res) => {
        const data = req.body
        createAdminUser(data, (err, result) => {
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
    getAllUser: async (req, res) => {
        getAllUser((err, result) => {
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
    getOneUser: async (req, res) => {
        const data = req.params;
        getOneUser(data, (err, result) => {
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
    login: async (req, res) => {
        const body = req.body;
        getOneUsername(body, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            const checkPassword = await bcrypt.compare(body.password, result.password);
            if (checkPassword) {
                const token = await authentication(result.user_id);
                return res.status(200).json({
                    success: true,
                    user_name: result.user_name,
                    user_id: result.user_id,
                    full_name: result.full_name,
                    role: result.role,
                    token: token
                })
            }

            return res.status(401).json({
                success: true,
                message: 'password is Invalid'
            })
        })
    }
}