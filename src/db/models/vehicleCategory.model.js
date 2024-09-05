const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelizeConnect.js')
const SubCategoryModel = require('./subCategory.model.js')
const VehicleCategoryModel = sequelize.define(
    'vehicle_category',
    {
        vehicle_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        vehicle_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Vehicle Type is Required"
                }
            }
        },
        base_fare: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Base Pice is Required"
                }
            }
        },
        price_per_km: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Price Per Km is Required"
                }
            }
        },
        subcategory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Sub category is Required"
                }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     notEmpty: {
            //         msg: "Title is Required"
            //     }
            // }
        },
        vehicle_category_details: {
            type: DataTypes.TEXT,
            allowNull: true,
            // validate: {
            //     notEmpty: {
            //         msg: "Vehicle Category Details is Required"
            //     }
            // }
        },
        promotion_image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Promotion Image is Required"
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Image is Required"
                }
            }
        },
        waiting_grace_mins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Waiting Grace minute is greater than or equal to 0"
                },
                notEmpty: {
                    msg: "Waiting Grace minute is Required"
                }
            }
        },
        interval_mins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Interval minute is greater than or equal to 0"
                },
                notEmpty: {
                    msg: "Interval minute is Required"
                }
            }
        },
        waiting_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Waiting price  is greater than or equal to 0"
                },
                notEmpty: {
                    msg: "Waiting Price is Required"
                }
            }
        },
        no_show_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: "No Show Fee is greater than or equal to 0"
                },
                notEmpty: {
                    msg: "No Show Fee  is Required"
                }
            }
        },
        mininum_buffer_mins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Minimum Buffer minute is greater than or equal to 0"
                },
                notEmpty: {
                    msg: "Minimum Buffer minute is Required"
                }
            }
        },
        cutoff_start: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        cutoff_end: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        always_schedule_start: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        always_schedule_end: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        max_passengers_without_luggage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Max Passenger without luggage is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "Max Passenger without luggage is Required"
                // },

            }
        },
        max_passengers_with_luggage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Max Passenger with luggage is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "Max Passenger luggage is Required"
                // },

            }
        },
        max_luggage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Max luggage is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "Max luggage minutre is Required"
                // },

            }
        },
        cashback_value: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Cash Back Value is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "Cash Back Value minutre is Required"
                // },
                max: {
                    args: [100],
                    msg: "Cash Back values is not greater than 100"
                }

            }
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Priority is Required"
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
                        throw new Error('status must be in Enumeration')
                    }
                }
            }
        },
        public_user: {
            type: DataTypes.ENUM('on', 'off'),
            defaultValue: 'off',
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['on', 'off'].includes(value)) {
                        throw new Error('Public user must in Enumeration')
                    }
                }
            }
        },
        corporate_user: {
            type: DataTypes.ENUM('on', 'off'),
            defaultValue: 'off',
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['on', 'off'].includes(value)) {
                        throw new Error('corporate user must in Enumeration')
                    }
                }
            }
        },
        cap_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "cab price is greater than or equal to 0"
                },

            }
        },
        per_stop_fare: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per stop fare is greater than or equal to 0"
                },

            }
        },
        per_stop_increase_cap_fare: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per stop increase cap fare is greater than or equal to 0"
                },

            }
        },
        price_per_min: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per minutes is greater than or equal to 0"
                },

            }
        },
        commission_percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage is not greater than 100"
                }

            }
        },
        corporate_vehicle_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Corporate vehicle must follow Enumeration')
                    }
                }
            }
        },
        cap_price_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "cab price later is greater than or equal to 0"
                },

            }
        },
        per_stop_fare_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per stop fare later is greater than or equal to 0"
                },

            }
        },
        per_stop_increase_cap_fare_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per stop increase cap fare later is greater than or equal to 0"
                },

            }
        },
        base_fare_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "base fare later is greater than or equal to 0"
                },

            }
        },
        price_per_km_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per km later is greater than or equal to 0"
                },

            }
        },
        price_per_min_later: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per minutes later is greater than or equal to 0"
                },

            }
        },
        commission_percentage_later: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage later is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage later is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage is not greater than 100"
                }

            }
        },
        per_stop_fare_air: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per stop fare is greater than or equal to 0"
                },

            }
        },
        seats_allowed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "seats allowed is greater than or equal to 0"
                },

            }
        },
        luggage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per minutes later is greater than or equal to 0"
                },

            }
        },
        wheel_chair: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "wheel chair is greater than or equal to 0"
                },

            }
        },
        base_fare_later_air: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "wheel chair is greater than or equal to 0"
                },

            }
        },
        commission_percentage_later_air: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage later air is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage later is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage is not greater than 100"
                }

            }
        },
        corporate_airport_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Corporate airport access must follow Enumeration')
                    }
                }
            }
        },
        min_hours: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "minimum hours is greater than or equal to 0"
                },

            }
        },
        max_hours: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Maximum hours is greater than or equal to 0"
                },

            }
        },
        price_per_min_later_charter: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per min later charter is greater than or equal to 0"
                },

            }
        },
        commission_percentage_later_charter: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage later charter is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage later is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage is not greater than 100"
                }

            }
        },
        corporate_charter_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Corporate charter access must follow Enumeration')
                    }
                }
            }
        },
        malaysia_minimum_booking_minutes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "malaysia minimum booking minutes is greater than or equal to 0"
                },

            }
        },
        malaysia_minimum_fare: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "malaysia minimum fare is greater than or equal to 0"
                },

            }
        },
        malaysia_base_fare: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "malaysia base fare is greater than or equal to 0"
                },

            }
        },
        malaysia_price_per_km: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per min later charter is greater than or equal to 0"
                },

            }
        },
        commission_percentage_later_malaysia: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage later malaysia is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage later is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage later malaysia is not greater than 100"
                }

            }
        },
        corporate_malaysia_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Corporate malaysia access must follow Enumeration')
                    }
                }
            }
        },
        malaysian_charter_min_hours: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "malaysia charter minimum hours is greater than or equal to 0"
                },

            }
        },
        malaysian_charter_max_hours: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "malaysia charter Maximum hours is greater than or equal to 0"
                },

            }
        },
        price_per_min_later_malaysian_charter: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "price per min later malaysian charter is greater than or equal to 0"
                },

            }
        },
        commission_percentage_later_malaysian_charter: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "commission percentage later malaysian charter is greater than or equal to 0"
                },
                // notEmpty: {
                //     msg: "commission percentage later is Required"
                // },
                max: {
                    args: [100],
                    msg: "commission percentage is not greater than 100"
                }

            }
        },
        corporate_malaysian_charter_access: {
            type: DataTypes.ENUM('enable', 'disable'),
            allowNull: true,
            validate: {
                isvalue(value) {
                    if (!['enable', 'disable'].includes(value)) {
                        throw new Error('Corporate malaysian charter access must follow Enumeration')
                    }
                }
            }
        },
        addon_id: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,

        },
        maximum_count_adds_on: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: "Maximum Adds-on count is greater than or equal to 0"
                }
            }
        }

    },
    {
        tableNames: 'vehicle_category',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)


VehicleCategoryModel.belongsTo(SubCategoryModel, { foreignKey: 'subcategory_id', as: 'vehicle_categories' })
SubCategoryModel.hasMany(VehicleCategoryModel, { foreignKey: 'subcategory_id', as: 'vehicle_sub_categories' })

module.exports = VehicleCategoryModel