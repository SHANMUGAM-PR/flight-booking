'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // define association here
       Flight.belongsTo(models.Airplane, {
    foreignKey: 'airplaneId',
    as: 'airplane',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Each flight departs from one airport
  Flight.belongsTo(models.Airport, {
    foreignKey: 'departureAirportId',
    as: 'departureAirport',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Each flight arrives at one airport
  Flight.belongsTo(models.Airport, {
    foreignKey: 'arrivalAirportId',
    as: 'arrivalAirport',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
    }
  }

  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};
