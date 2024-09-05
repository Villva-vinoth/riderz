const { DataTypes} = require('sequelize')
const sequelize = require('../config/sequelizeConnect.js')
const CategoryModel = require('./category.model.js')
const SubCategoryModel = sequelize.define(
    'sub_categories',
    {
        sub_category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'category_id'
            },
            validate: {
                isvalue(value) {
                    if (value == undefined || value == "") {
                        throw new Error('category must be required')
                    }
                }
            }
        },
        sub_category_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notEmpty: {
                    msg: "category type is required !",
                }
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "category type is required !",
                }
            },
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isvalue(values) {
                    if (values <= 0) {
                        throw new Error(`Priority is not negative !`);
                    }
                }
            }
        },
        corporate_sub_category_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: false,
            defaultValue: 'disable',
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Enumaration Error !')
                    }
                }
            }
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Active',
            allowNull: false,
            validate: {
                isvalue(value) {
                    if (!['Active', 'Inactive'].includes(value)) {
                        throw new Error(`status is a Enumation entry`)
                    }
                }
            }
        }
    },
    {
        tableNames: 'sub_categories',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

SubCategoryModel.belongsTo(CategoryModel, { foreignKey: 'category_id', as: 'categories' })
CategoryModel.hasMany(SubCategoryModel, { foreignKey: 'category_id', as: 'sub_categories' })

module.exports = SubCategoryModel