const AdminUserModel = require('../../db/models/adminUser.model.js')
const RoleModel = require('../../db/models/roles.model.js')

module.exports = {
    createAdminUser: async (data, callback) => {
        try {
            const existingUser = await AdminUserModel.findOne({
                where: {
                    user_name: data.user_name
                }
            })
            // console.log(existingUser)
            if (existingUser) {
                throw new Error('Username is already register !')
            }
            const adminUser = await AdminUserModel.create(data)
            return callback(null, adminUser)
        } catch (error) {
           return callback(error)
        }
    },
    getAllUser: async (callback) => {
        try {
            const users = await AdminUserModel.findAll({
                where:{
                    status:'true',
                },
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'password','status']
                },
                include:{
                    model:RoleModel,
                    as:'roles',
                    attributes:['role_name']
                }
            })
            return callback(null, users)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneUser: async (data, callback) => {
        try {

            const getUser = await AdminUserModel.findOne({
                where: {
                    user_id: data.id,
                    status:'true'
                },
                attributes: { 
                    exclude: ['password', 'updated_at', 'deleted_at','status'] 
                },
                include:{
                    model:RoleModel,
                    as:'roles',
                    attributes:['role_name']
                }
            })


            if (getUser) {  
                return callback(null, getUser);
            }
            else {
                throw new Error('Users not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneUsername: async (data, callback) => {
        try {
            const getUser = await AdminUserModel.findOne({
                where: {
                    user_name: data.user_name
                },
               
            })

            // const getUsers = await AdminUserModel.findAll({})

            // console.log(getUser,getUsers)


            if (getUser) {
                return callback(null, getUser);
            }
            else {
                throw new Error('Users not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    }

}