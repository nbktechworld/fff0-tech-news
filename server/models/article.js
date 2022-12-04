'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Image, {
        through: models.ArticleImage,
        foreignKey: 'articleId',
        otherKey: 'imageId',
        // as: 'images',
      });
    }
  }
  Article.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 128],
        is: /^[a-z0-9-]+$/,
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 128]
      },
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 4096]
      },
    },
    thumbnailUrl: {
      allowNull: true,
      type: DataTypes.STRING(4096),
    },
    excerpt: {
      allowNull: false,
      type: DataTypes.STRING(256),
    },
  }, {
    sequelize,
    modelName: 'Article',
    underscored: true
  });
  return Article;
};