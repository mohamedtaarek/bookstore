"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class store_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Book, {
        foreignKey: "bookId",
        as: "book",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store",
        onDelete: "CASCADE",
      });
    }
  }
  store_book.init(
    {
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "store_book",
    }
  );
  return store_book;
};
