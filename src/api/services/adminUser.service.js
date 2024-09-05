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
    },
    updateUser: async(data,callback)=>{
        try {
            const update = await AdminUserModel.update(data,{
                where:{
                    user_id:data.id
                }
            })
            if (update[0] > 0) { 
                return callback(null, `User updated successfully for ${data.user_name}`);
            } else {
                throw new Error('User not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deleteUser: async(data,callback)=>{
        try {
            const deleted = await AdminUserModel.destroy({
                where: {
                    user_id: data.id, 
                }
            });
            if (deleted > 0) {
                return callback(null, `User deleted successfully`);
            } else {
                throw new Error('User not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }

}