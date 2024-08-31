const sequelize = require('../config/sequelizeConnect.js')
const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')
const RoleModel = require('./roles.model.js')
const AdminUserModel = sequelize.define(
    'admin_users',
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkEmpt(value) {
                    if (value.length < 5) {
                        throw new Error('please provide the name with atleast 5 characters');
                    }
                },
            }

        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "user name Already Exists!"
            },
            validate: {
                notEmpty: {
                    msg: "please enter the user name !",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, Number.MAX_SAFE_INTEGER],
                    msg: "password atleast contain 8 characters"
                },
                notEmpty: {
                    msg: "please enter the password !"
                }
            }
        },
        confirm_password: {
            type: DataTypes.VIRTUAL,
            validate: {
                len: {
                    args: [8, Number.MAX_SAFE_INTEGER],
                    msg: "password atleast contain 8 characters"
                },
                notEmpty: {
                    msg: "please enter the password !"
                },
                matchValues(values) {
                    if (values != this.password) {
                        throw new Error('Password and Confirm password must be same !');
                    }
                }
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RoleModel,
                key: 'role_id',
            },
            validate: {
                checkEmpt(value) {
                    if (value == "" || value == undefined) {
                        throw new Error('Must enter the Role !')
                    }
                }
            },
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:"true",
            allowNull:true
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
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableNames: 'admin_users',
        hooks: {
            beforeSave: async (value) => {
                if (value.password) {
                    const salt = await bcrypt.genSalt(10)
                    value.password = await bcrypt.hash(value.password, salt);
                }
            }
        }
    }
)

AdminUserModel.belongsTo(RoleModel, { foreignKey: 'role', as: 'roles' });
RoleModel.hasMany(AdminUserModel, { foreignKey: 'role', as: 'users' });

module.exports = AdminUserModel