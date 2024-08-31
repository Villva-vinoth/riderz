'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('roles',
      {
        role_id:
        {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        role_name: {
          type: Sequelize.STRING,
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

      }
      ,
      {
        tableNames: 'roles',
        timestamps: true,
        paranoid: true
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('roles');

  }
};
