'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Book, {
        through: 'store_book',
        as: 'books',
        foreignKey: 'storeId',
        otherKey: 'bookId'
      });
    }
  }
  Store.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};