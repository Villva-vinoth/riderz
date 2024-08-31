'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('admin_users', {
      fields: ['role'],
      type: 'foreign key',
      name: 'fk_admin_users_role',
      references: {
        table: 'roles',
        field: 'role_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down(queryInterface, Sequelize) {
   
      await queryInterface.removeConstraint('admin_users','fk_admin_users_role');
  }
};
