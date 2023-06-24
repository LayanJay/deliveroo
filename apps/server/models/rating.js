'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Rating.belongsTo(models.Dish);
    }
  }
  Rating.init(
    {
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );
  return Rating;
};
