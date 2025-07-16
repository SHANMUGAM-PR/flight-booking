'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      Airplane.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        as: 'flights',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Airplane.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        as: 'seats',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Airplane',
    timestamps: true,
  });

  return Airplane;
};
