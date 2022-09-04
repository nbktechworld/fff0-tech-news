'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('articles', 'thumbnail_url', Sequelize.STRING(4096));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('articles', 'thumbnail_url');
  }
};
