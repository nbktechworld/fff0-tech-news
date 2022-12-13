'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });
      this.belongsTo(models.Image, {
        foreignKey: 'imageId',
        as: 'image',
      })
    }
  }
  ArticleImage.init({
    articleId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'articles',
        key: 'id',
      },
    },
    imageId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'images',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'ArticleImage',
    underscored: true,
    tableName: 'article_images',
  });
  return ArticleImage;
};