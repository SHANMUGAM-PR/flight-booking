const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    // Sequelize validation error
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message); // ⬅️ Extract validation messages
      throw new AppError(
        'Validation failed: ' + messages.join(', '),
        StatusCodes.BAD_REQUEST,
        error
      );
    }

    // Sequelize DB error (e.g., wrong data type)
    if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(
        'Database error: ' + error.message,
        StatusCodes.BAD_REQUEST,
        error
      );
    }

    // Unexpected error
    throw new AppError(
      `Error creating airplane: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

async function getAirplanes(){
   try{
        const response = await airplaneRepository.getAll();
        return response;
   }
   catch(error){
        throw new AppError(
            `Error fetching airplanes: ${error.message}`,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
   }
}

async function getAirplaneById(id){
  try{
     const response = await airplaneRepository.findByPk(id);  // ✅ Correct method
    if (!response) {
      throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
    }
    return response;  // ✅ Return the airplane
  }
  catch (error) {
    throw new AppError(
      `Error fetching airplane by ID: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
}
}
async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.destroy({ id });
        if (!response) {
            throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        throw new AppError(
            `Error deleting airplane: ${error.message}`,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}
async function updateAirplane(id, data) {
    try {
        const response = await airplaneRepository.update(data, { id });
        
        if (!response || response[0] === 0) { // no rows updated
            throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
        }

        const updatedAirplane = await airplaneRepository.findByPk(id);
        return updatedAirplane;
        
    } catch (error) {
        throw new AppError(
            `Error updating airplane: ${error.message}`,
            error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}


module.exports = {
  createAirplane,
  getAirplanes,
  getAirplaneById,
  deleteAirplane,
  updateAirplane,
  
};
