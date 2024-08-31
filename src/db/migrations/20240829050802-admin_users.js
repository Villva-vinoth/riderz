'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('admin_users',
      {
        user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        full_name: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
        role: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            checkEmpt(value) {
              if (value == "" || value == undefined) {
                throw new Error('Must enter the Role !')
              }
            }
          },
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        deleted_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        timestamps: true,
        paranoid: true,
        tableNames: 'admin_users'
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('admin_users');

  }
};
