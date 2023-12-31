'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dish.belongsTo(models.Menu);
      models.Dish.hasMany(models.Rating);
    }
  }
  Dish.init(
    {
      dishName: DataTypes.STRING,
      isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      calories: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: 'Dish',
    }
  );
  return Dish;
};
