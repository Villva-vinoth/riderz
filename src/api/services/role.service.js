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
    },
    updateRole: async(data,callback)=>{
        try {
            const update_role = await RoleModel.update(data,{
                where:{
                    role_id:data.id
                }
            })
            if (update_role[0] > 0) { 
                return callback(null, `Role updated successfully for : ${data.role_id}`);
            } else {
                throw new Error('Role not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deleteRole: async(data,callback)=>{
        try {
            const deleted_role = await RoleModel.destroy({
                where: {
                    role_id: data.id, 
                }
            });
            if (deleted_role > 0) {
                return callback(null, `Role deleted successfully for : ${data.role_id}`);
            } else {
                throw new Error('Role not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }
}