'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Book, {
        foreignKey: 'authorId',
        as: 'books'
      });
    }
  }
  Author.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};