const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            throw new AppError(
                'Validation failed: ' + messages.join(', '),
                StatusCodes.BAD_REQUEST,
                error
            );
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            const messages = error.errors.map(e => e.message);
            throw new AppError(
                'Unique constraint failed: ' + messages.join(', '),
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
            `Error creating city: ${error.message}`,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = {
    createCity,
};
