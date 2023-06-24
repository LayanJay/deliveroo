'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Restaurant.hasMany(models.Menu);
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      tags: DataTypes.STRING,
      openingHours: DataTypes.STRING,
      closingHours: DataTypes.STRING,
      deliveryFee: DataTypes.FLOAT,
      minimumOrderValue: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Restaurant',
    }
  );
  return Restaurant;
};
