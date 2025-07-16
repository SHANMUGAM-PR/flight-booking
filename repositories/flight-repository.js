const { Flight } = require('../models');
const { Op, Sequelize } = require('sequelize');
const CrudRepository = require('./crud-repository');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  /**
   * Reduce the totalSeats of a flight by a given number.
   * Ensures seats do not go below zero.
   * @param {number} flightId 
   * @param {number} seatsToReduce 
   */
  async reduceSeats(flightId, seatsToReduce) {
    try {
      const [updatedRowsCount] = await Flight.update(
        { totalSeats: Sequelize.literal(`totalSeats - ${seatsToReduce}`) },
        {
          where: {
            id: flightId,
            totalSeats: { [Op.gte]: seatsToReduce }
          }
        }
      );

      if (updatedRowsCount === 0) {
        throw new AppError('Not enough seats available or flight not found', StatusCodes.BAD_REQUEST);
      }

      const updatedFlight = await Flight.findByPk(flightId);
      return updatedFlight;
    } catch (error) {
      console.error('Error reducing seats:', error);
      throw new AppError('Error reducing seats', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Find flights by filters (optional: departureAirportId, arrivalAirportId, priceMin, priceMax)
   */
  async getFilteredFlights(filter = {}) {
    const whereClause = {};

    if (filter.departureAirportId) {
      whereClause.departureAirportId = filter.departureAirportId;
    }

    if (filter.arrivalAirportId) {
      whereClause.arrivalAirportId = filter.arrivalAirportId;
    }

    if (filter.priceMin && filter.priceMax) {
      whereClause.price = {
        [Op.between]: [filter.priceMin, filter.priceMax]
      };
    } else if (filter.priceMin) {
      whereClause.price = { [Op.gte]: filter.priceMin };
    } else if (filter.priceMax) {
      whereClause.price = { [Op.lte]: filter.priceMax };
    }

    return await Flight.findAll({
      where: whereClause,
      include: ['airplane', 'departureAirport', 'arrivalAirport']
    });
  }
}

module.exports = FlightRepository;
