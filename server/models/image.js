'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Article, {
        through: models.ArticleImage,
        foreignKey: 'imageId',
        otherKey: 'articleId',
        as: 'articles'
      });

      this.hasMany(models.ArticleImage, {
        foreignKey: 'imageId',
        as: 'articleImages',
      });
    }
  }
  Image.init({
    filename: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isLength: {
          min: 1,
          max: 255,
        },
      },
    },
    mimetype: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isLength: {
          min: 1,
          max: 255,
        },
      },
    },
    originalFilename: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isLength: {
          min: 1,
          max: 255,
        },
      },
    },
    size: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Image',
    underscored: true,
    tableName: 'images',
  });
  return Image;
};