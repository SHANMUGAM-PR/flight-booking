const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    // Sequelize validation error
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      throw new AppError(
        'Validation failed: ' + messages.join(', '),
        StatusCodes.BAD_REQUEST,
        error
      );
    }

    // Sequelize DB error
    if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(
        'Database error: ' + error.message,
        StatusCodes.BAD_REQUEST,
        error
      );
    }

    // Unexpected error
    throw new AppError(
      `Error creating airport: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      `Error fetching airports: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function getAirportById(id) {
  try {
    const airport = await airportRepository.findByPk(id);
    if (!airport) {
      throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
    }
    return airport;
  } catch (error) {
    throw new AppError(
      `Error fetching airport by ID: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function deleteAirport(id) {
  try {
    const deleted = await airportRepository.destroy({ id });
    if (!deleted) {
      throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
    }
    return deleted;
  } catch (error) {
    throw new AppError(
      `Error deleting airport: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function updateAirport(id, data) {
  try {
    const updated = await airportRepository.update(data, { id });

    if (!updated || updated[0] === 0) {
      throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
    }

    const airport = await airportRepository.findByPk(id);
    return airport;
  } catch (error) {
    throw new AppError(
      `Error updating airport: ${error.message}`,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirportById,
  deleteAirport,
  updateAirport,
};
