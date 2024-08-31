'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('permissions',
      {
        permission_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        resources: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            checkEmpt(value) {
              if (value == "" || value == undefined) {
                throw new Error('Must enter the Resources !')
              }
            }
          }
        },
        role: {
          type: Sequelize.INTEGER,
          allowNull: true,
          validate: {
            checkEmpt(value) {
              if (value == "" || value == undefined) {
                throw new Error('Must enter the Role !')
              }
            }
          },
          references: {
            model: 'roles',
            key: 'role_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        can_create: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
        },
        can_delete: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
        },
        can_update: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
        },
        can_show: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
        },
        can_list: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
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
        tableNames: 'permissions',
        timestamps: true,
        paranoid: true
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('permissions');

  }
};





















































































