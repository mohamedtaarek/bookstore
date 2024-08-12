'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Author, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE'
      });

      this.belongsToMany(models.Store, {
        through: models.store_book,
        as: 'stores',
        foreignKey: 'bookId',
        otherKey: 'storeId'
      });
    }
  }
  Book.init({
    name: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};