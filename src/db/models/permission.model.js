const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelizeConnect.js')
const RoleModel = require('./roles.model.js')

const permissionModel = sequelize.define('permissions',
  {
    permission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    resources: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpt(value) {
          if (value == "" || value == undefined) {
            throw new Error('Must enter the Resources !')
          }
        }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        checkEmpt(value) {
          if (value == "" || value == undefined) {
            throw new Error('Must enter the Role !')
          }
        }
      },
      references: {
        model: RoleModel,
        key: 'role_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    can_create: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    can_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    can_update: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    can_show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    can_list: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    permission_status: {
      type: DataTypes.STRING,
      defaultValue: "true",
      allowNull: true,
    }
    // created_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },
    // deleted_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // }
  },
  {
    tableNames: 'permissions',
    timestamps: true,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
)

permissionModel.belongsTo(RoleModel, { foreignKey: 'role', as: 'roles_permissions' });
RoleModel.hasMany(permissionModel, { foreignKey: 'role', as: 'permissions' });


module.exports = permissionModel