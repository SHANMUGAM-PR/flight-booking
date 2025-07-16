'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      // Each airport belongs to a city
     Airport.belongsTo(models.City, {
    foreignKey: 'cityId',
    as: 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Flights that depart from this airport
  Airport.hasMany(models.Flight, {
    foreignKey: 'departureAirportId',
    as: 'departingFlights',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Flights that arrive at this airport
  Airport.hasMany(models.Flight, {
    foreignKey: 'arrivalAirportId',
    as: 'arrivingFlights',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}
  }

  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cities', // this must match the table name in the DB
        key: 'id'
      },
      onDelete: 'CASCADE',     // 👈 Important for DB-level cascade
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};
