'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // A city can have many airports
      City.hasMany(models.Airport, {
        foreignKey: 'cityId',
        as: 'airports',
        onDelete: 'CASCADE',      // 👈 This is important
        hooks: true               // 👈 Required for CASCADE to work in Sequelize
      });
    }
  }

  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'City',
  });

  return City;
};
