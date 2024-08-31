const sequelize = require('../config/sequelizeConnect.js')
const { DataTypes } = require('sequelize')


const RoleModel = sequelize.define(
    'roles',
    {
        role_id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Role name Already Exists!"
            },
            validate: {
                notEmpty: {
                    msg: "please enter the user name !",
                }
            }
        },
        role_status: {
            type: DataTypes.STRING,
            defaultValue: true,
            allowNull: true
        }
        // created_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW
        // },
        // deleted_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW
        // },
        // updated_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW
        // }

    },
    {
        tableNames: 'roles',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)


module.exports = RoleModel