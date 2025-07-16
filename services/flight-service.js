const { StatusCodes } = require('http-status-codes');
const FlightRepository = require('../repositories/flight-repository'); // IMPORTANT: no destructuring, direct class import
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      throw new AppError(
        'Validation failed: ' + messages.join(', '),
        StatusCodes.BAD_REQUEST,
        error
      );
    }
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      throw new AppError(
        'Foreign key constraint failed: ' + error.message,
        StatusCodes.BAD_REQUEST,
        error
      );
    }
    if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(
        'Database error: ' + error.message,
        StatusCodes.BAD_REQUEST,
        error
      );
    }
    throw new AppError(
      `Error creating flight: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function getFlights(filter = {}) {
  try {
    const {
      departureAirportId,
      arrivalAirportId,
      priceMin,
      priceMax,
      departureTime,
      arrivalTime,
      numberOfTravellers,
      sortBy,
      order
    } = filter;

    const query = {
      where: {}
    };

    if (departureAirportId) query.where.departureAirportId = departureAirportId;
    if (arrivalAirportId) query.where.arrivalAirportId = arrivalAirportId;

    if (priceMin && priceMax) {
      query.where.price = { [Op.between]: [priceMin, priceMax] };
    } else if (priceMin) {
      query.where.price = { [Op.gte]: priceMin };
    } else if (priceMax) {
      query.where.price = { [Op.lte]: priceMax };
    }

    if (departureTime) {
      query.where.departureTime = { [Op.gte]: new Date(departureTime) };
    }

    if (arrivalTime) {
      query.where.arrivalTime = {
        ...(query.where.arrivalTime || {}),
        [Op.lte]: new Date(arrivalTime)
      };
    }

    if (sortBy && ['price', 'departureTime', 'arrivalTime'].includes(sortBy)) {
      query.order = [[sortBy, order === 'DESC' ? 'DESC' : 'ASC']];
    }

    const flights = await flightRepository.getAllFlights(query);

    if (numberOfTravellers) {
      const availableFlights = flights.filter(
        flight => flight.totalSeats >= numberOfTravellers
      );

      if (availableFlights.length === 0) {
        throw new AppError(
          'No flights available with enough seats',
          StatusCodes.NOT_FOUND
        );
      }

      return availableFlights;
    }

    return flights;
  } catch (error) {
    throw new AppError(
      `Error fetching flights: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function getFlightById(id) {
  try {
    const response = await flightRepository.findByPk(id);
    if (!response) {
      throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
    }
    return response;
  } catch (error) {
    throw new AppError(
      `Error fetching flight by ID: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function updateFlight(id, data) {
  try {
    const response = await flightRepository.update(data, { id });
    if (!response || response[0] === 0) {
      throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
    }
    const updatedFlight = await flightRepository.findByPk(id);
    return updatedFlight;
  } catch (error) {
    throw new AppError(
      `Error updating flight: ${error.message}`,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function deleteFlight(id) {
  try {
    const response = await flightRepository.destroy({ id });
    if (!response) {
      throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
    }
    return response;
  } catch (error) {
    throw new AppError(
      `Error deleting flight: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function reduceFlightSeats(flightId, seatsToReduce) {
  try {
    const updatedFlight = await flightRepository.reduceSeats(flightId, seatsToReduce);
    return updatedFlight;
  } catch (error) {
    throw new AppError(
      `Error reducing seats: ${error.message}`,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  reduceFlightSeats
};
