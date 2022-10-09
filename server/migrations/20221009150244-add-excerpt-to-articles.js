'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('articles', 'excerpt', {
      type: Sequelize.STRING(256),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('articles', 'excerpt');
  }
};
