const permissionModel = require('../../db/models/permission.model');
const RoleModel = require('../../db/models/roles.model');
module.exports = {
    createPermission: async (data, callback) => {
        try {
            const existingPermission = await permissionModel.findOne({
                where: {
                    role: data.role,
                    resources: data.resources,
                }
            });
            if (existingPermission) {
                throw new Error('Role and Resource is already exits !')
            }
            const permission = await permissionModel.create(data)
            return callback(null, permission)
        } catch (error) {
            return callback(error)
        }
    },
    getAllPermission: async (callback) => {
        try {
            const roles = await permissionModel.findAll({
                where: {
                    permission_status: "true",
                },
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                include: {
                    model: RoleModel,
                    as: 'roles_permissions',
                    attributes: ['role_name']
                }
            })
            return callback(null, roles)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOnePermission: async (data, callback) => {
        try {
            const getPermission = await permissionModel.findOne({
                where: {
                    permission_id: data.id,
                    permission_status: "true"
                },
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                include: {
                    model: RoleModel,
                    as: 'roles_permissions',
                    attributes: ['role_name']
                }
            })
            if (getPermission) {
                return callback(null, getPermission);
            }
            else {
                throw new Error('Permission not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },
    getAllPermissionByRole: async (data, callback) => {
        try {
            const getPermission = await permissionModel.findAll({
                where: {
                    role: data.id,
                    permission_status: "true"
                },
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                include: {
                    model: RoleModel,
                    as: 'roles_permissions',
                    attributes: ['role_name']
                }
            })
            if (getPermission) {
                return callback(null, getPermission);
            }
            else {
                throw new Error('Permission not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },
    updatePermission: async(data,callback)=>{
        try {
            const updatePermissions = await permissionModel.update(data,{
                where:{
                    permission_id:data.id
                }
            })
            if (updatePermissions[0] > 0) { 
                return callback(null, `Permission updated successfully for : ${data.permission_id}`);
            } else {
                throw new Error('Permission not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deletePermission: async(data,callback)=>{
        try {
            const deletedPermission = await permissionModel.destroy({
                where: {
                    permission_id: data.id, 
                }
            });
            if (deletedPermission > 0) {
                return callback(null, `Permission deleted successfully for : ${data.permission_id}`);
            } else {
                throw new Error('Permission not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }

}