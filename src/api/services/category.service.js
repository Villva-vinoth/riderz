const CategoryModel = require("../../db/models/category.model")

module.exports = {
    createCategory: async (data, callback) => {
        try {
            const existingCategory = await CategoryModel.findOne({
                where: {
                    category_type: data.category_type
                }
            })
            // console.log(existingUser)
            if (existingCategory) {
                throw new Error('Category is already exists !')
            }
            const category = await CategoryModel.create(data)
            return callback(null, category)
        } catch (error) {
           return callback(error)
        }
    },
    getAllCategory: async (callback) => {
        try {
            const category = await CategoryModel.findAll({
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                }
            })
            return callback(null, category)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneCategory: async (data, callback) => {
        try {

            const getCategory = await CategoryModel.findOne({
                where: {
                    category_id: data.id,
                },
                attributes: { 
                    exclude: ['updated_at', 'deleted_at'] 
                },
            })


            if (getCategory) {  
                return callback(null, getCategory);
            }
            else {
                throw new Error('Category not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },

    updateCategory: async(data,callback)=>{
        try {
            const update = await CategoryModel.update(data,{
                where:{
                    category_id:data.id
                }
            })
            if (update[0] > 0) { 
                return callback(null, `Category updated successfully for ${data.category_type}`);
            } else {
                throw new Error('Category not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deleteCategory: async(data,callback)=>{
        try {
            const deleted = await CategoryModel.destroy({
                where: {
                    category_id: data.id, 
                }
            });
            if (deleted > 0) {
                return callback(null, `Category deleted successfully`);
            } else {
                throw new Error('Category not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }

}