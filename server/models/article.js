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
  }, {
    sequelize,
    modelName: 'Article',
    underscored: true
  });
  return Article;
};