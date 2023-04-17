'use strict';

const ImageService = require("../services/image-service");
const FileUtility = require('../test/utilities/file-utility');

module.exports = {
  async up (queryInterface, Sequelize) {
    const imageService = new ImageService();
    const article1File = await FileUtility.buildFile('027c817e71542424114393380e22a69a');
    await imageService.send(article1File);

    await queryInterface.bulkInsert('articles', [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: new Date(),
        updated_at: new Date(),
        thumbnail_url: imageService.getUrlForFile(article1File),
      },
      {
        title: 'Ut enim ad minim veniam, quis nostrud exercitation',
        slug: 'ut-enim-ad-minim-veniam',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Duis aute irure dolor in reprehenderit',
        slug: 'duis-aute-irure-dolor-in-reprehenderit',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const imageService = new ImageService();
    const article1File = await FileUtility.buildFile('027c817e71542424114393380e22a69a');
    await imageService.remove(imageService.getKeyForFile(article1File));

    await queryInterface.bulkDelete('articles', {
      slug: {
        [Sequelize.Op.in]: [
          'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing',
          'ut-enim-ad-minim-veniam',
          'duis-aute-irure-dolor-in-reprehenderit',
        ]
      }
    }, {});
  }
};
