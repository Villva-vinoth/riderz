const RoleModel = require('../../db/models/roles.model');
module.exports = {
    createRole: async (data, callback) => {

        try {
            const existingRole = await RoleModel.findOne({
                where: {
                    role_name: data.role_name
                }
            })
           
            if (existingRole) {
                throw new Error('Role is already register !')
            }
            const role = await RoleModel.create(data)
            return callback(null, role)
        } catch (error) {
           return callback(error)
        }
    },
    getAllRole: async (callback) => {
        try {
            const roles = await RoleModel.findAll({
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                }
            })
            
            return callback(null, roles)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneRole: async (data, callback) => {
        try {
            const getRole = await RoleModel.findOne({
                where: {
                    role_id: data.id,
                    role_status:'true'
                },
                attributes:{exclude:['deleted_at','role_status']}
            })
            if (getRole) {
                return callback(null, getRole);
            }
            else {
                throw new Error('Role not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    }
}