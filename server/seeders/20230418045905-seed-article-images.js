'use strict';

const ImageService = require('../services/image-service');
const FileUtility = require('../test/utilities/file-utility');
const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const imageService = new ImageService();
    const imageFile = await FileUtility.buildFile('4edcf27e7514e21508599892659e33c3');
    await imageService.send(imageFile);
    const article = await db.Article.findOne();
    const image = await article.createImage({
      filename: imageFile.filename,
      originalFilename: imageFile.originalname,
      mimetype: imageFile.mimetype,
      size: imageFile.size,
    });
    await article.update({
      body: article.body + `\n\n![image description](${image.url})`,
    });
  },

  async down (queryInterface, Sequelize) {
    const image = await db.Image.findOne({ where: { filename: '4edcf27e7514e21508599892659e33c3' } });
    const imageService = new ImageService();
    await imageService.remove(imageService.getKeyForUrl(image.url));

    const articleImage = (await image.getArticleImages())[0]
    await image.destroy();
    await articleImage.destroy();
  }
};
