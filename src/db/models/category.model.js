const { DataTypes} =require('sequelize')
const sequelize = require('../config/sequelizeConnect.js')
const CategoryModel = sequelize.define(
    'categories',
    {
        category_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        category_type :{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"category type is required !",
                }
            }, 
        },
        image :{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"category type is required !",
                }
            }, 
        },
        priority :{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isvalue(values){
                    if(values < 0){
                        throw new Error(`Priority is not negative !`);
                    }
                }
            }
        },
        corporate_category_access :{
            type:DataTypes.ENUM('enable','disable'),
            allowNull:false,
            defaultValue:'disable',
            validate:{
                isvalue(value){
                    if(!['enable','disable'].includes(value)){
                        throw new Error('Enumaration Error !')
                    }
                }
            }
        },
        status:{
            type:DataTypes.ENUM('Active','Inactive'),
            defaultValue:'Active',
            allowNull:false,
            validate:{
                isvalue(value){
                    if(!['Active','Inactive'].includes(value)){
                        throw new Error(`status is a Enumation entry`)
                    }
                }
            }
        }
    },
    {
        tableNames: 'categories',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
)

module.exports = CategoryModel