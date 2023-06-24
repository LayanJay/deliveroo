'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Menu.hasMany(models.Dish);
      models.Menu.belongsTo(models.Restaurant);
    }
  }
  Menu.init(
    {
      categoryName: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Menu',
    }
  );
  return Menu;
};
