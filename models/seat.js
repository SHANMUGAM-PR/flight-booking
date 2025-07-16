'use strict';
const { Model } = require('sequelize');
const { SeatType } = require('../utils/common/enums');
const { BUSINESS, ECONOMY, PREMIUM, FIRST_CLASS } = SeatType;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplane'
      });
    }
  }

  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: [ECONOMY, BUSINESS, PREMIUM, FIRST_CLASS],
      allowNull: false,
      defaultValue: ECONOMY
    }
  }, {
    sequelize,
    modelName: 'Seat',
    timestamps: true
  });

  return Seat;
};
