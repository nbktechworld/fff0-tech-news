'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      article_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      image_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('article_images', {
      type: 'UNIQUE',
      fields: ['article_id', 'image_id'],
    });

    await queryInterface.addConstraint('article_images', {
      type: 'UNIQUE',
      fields: ['image_id']
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article_images');
  }
};