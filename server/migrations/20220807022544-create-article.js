'use strict';

const ImageService = require('../services/image-service');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING(128),
        unique: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING(4096)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      thumbnail_url: {
        type: Sequelize.STRING(4096)
      },
      excerpt: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    const imageService = new ImageService();
    const articleData = await queryInterface.sequelize.query('SELECT thumbnail_url FROM articles WHERE thumbnail_url IS NOT NULL', { type: queryInterface.sequelize.QueryTypes.SELECT });
    for (const { thumbnail_url } of articleData) {
      await imageService.remove(imageService.getKeyForUrl(thumbnail_url));
    }

    await queryInterface.dropTable('articles');
  }
};