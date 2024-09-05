const SubCategoryModel = require("../../db/models/subCategory.model.js")
const VehicleCategoryModel = require("../../db/models/vehicleCategory.model.js")

module.exports = {
    createVehicleCategory: async (data, callback) => {
        try {
            console.log(data)
            const existingCategory = await VehicleCategoryModel.findOne({
                where: {
                    vehicle_type: data.vehicle_type
                }
            })
            console.log(existingCategory)
            if (existingCategory) {
                throw new Error('Vehicle Category is already exists !')
            }
            const category = await VehicleCategoryModel.create(data)
            return callback(null, category)
        } catch (error) {
            console.log(error)
            return callback(error)
        }
    },
    getAllVehicleCategory: async (callback) => {
        try {
            const category = await VehicleCategoryModel.findAll({
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                include:{
                    model:SubCategoryModel,
                    attributes:['sub_category_type'],
                    as:"vehicle_categories"
                }
            })
            return callback(null, category)
        }
        catch (error) {
            return callback(error)
        }
    },
    getOneVehicleCategory: async (data, callback) => {
        try {

            const getCategory = await VehicleCategoryModel.findOne({
                where: {
                    vehicle_category_id: data.id,
                },
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
            })


            if (getCategory) {
                return callback(null, getCategory);
            }
            else {
                throw new Error('Vehicle Category not Found !')
            }
        }
        catch (error) {
            return callback(error)
        }
    },

    updateVehicleCategory: async (data, callback) => {
        try {
            const update = await VehicleCategoryModel.update(data, {
                where: {
                    vehicle_category_id: data.id
                }
            })
            if (update[0] > 0) {
                return callback(null, `Vehicle Category updated successfully for ${data.sub_category_type}`);
            } else {
                throw new Error('Vehicle Category not found or nothing to update!');
            }
        } catch (error) {
            return callback(error)
        }
    },
    deleteVehicleCategory: async (data, callback) => {
        try {
            const deleted = await VehicleCategoryModel.destroy({
                where: {
                    vehicle_category_id: data.id,
                }
            });
            if (deleted > 0) {
                return callback(null, `Vehicle Category deleted successfully`);
            } else {
                throw new Error('Vehicle Category not found!');
            }
        } catch (error) {
            return callback(error);
        }
    }

}