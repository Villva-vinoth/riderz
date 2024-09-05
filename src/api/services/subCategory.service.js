const CategoryModel = require("../../db/models/category.model")
const SubCategoryModel = require("../../db/models/subCategory.model")

module.exports = {
    createSubCategory: async (data, callback) => {
        try {
            const existingCategory = await SubCategoryModel.findOne({
                where: {
                    sub_category_type: data.sub_category_type
                }
            })
            // console.log(existingUser)
            if (existingCategory) {
                throw new Error('Sub Category is already exists !')
            }
            const category = await SubCategoryModel.create(data)
            return callback(null, category)
        } catch (error) {
           return callback(error)
        }
    },
    getAllSubCategory: async (callback) => {
        try {
            const category = await SubCategoryModel.findAll({
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                include:{
                    model:CategoryModel,
                    as:'categories',
                    attributes:['category_type']                    
                }
            })
            return callback(null, category)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneSubCategory: async (data, callback) => {
        try {

            const getCategory = await SubCategoryModel.findOne({
                where: {
                    sub_category_id: data.id,
                },
                attributes: { 
                    exclude: ['updated_at', 'deleted_at'] 
                },
                include:{
                    model:CategoryModel,
                    as:'categories',
                    attributes:['category_type']                    
                }
            })


            if (getCategory) {  
                return callback(null, getCategory);
            }
            else {
                throw new Error('sub Category not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },

    updateSubCategory: async(data,callback)=>{
        try {
            const update = await SubCategoryModel.update(data,{
                where:{
                    sub_category_id:data.id
                }
            })
            if (update[0] > 0) { 
                return callback(null, `Sub Category updated successfully for ${data.sub_category_type}`);
            } else {
                throw new Error('Sub Category not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deleteSubCategory: async(data,callback)=>{
        try {
            const deleted = await SubCategoryModel.destroy({
                where: {
                    sub_category_id: data.id, 
                }
            });
            if (deleted > 0) {
                return callback(null, `Sub Category deleted successfully`);
            } else {
                throw new Error('Sub Category not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }

}