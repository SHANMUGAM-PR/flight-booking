const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name || req.query.name,
      address: req.body.address || req.query.address,
      cityId: req.body.cityId || req.query.cityId,
    });

    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);

  } catch (error) {
    ErrorResponse.message = "Error creating airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Error fetching airports";
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getAirportById(req, res) {
  try {
    const id = req.params.id;
    const airport = await AirportService.getAirportById(id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Error fetching airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    const id = req.params.id;
    const airport = await AirportService.deleteAirport(id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Error deleting airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedAirport = await AirportService.updateAirport(id, data);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: updatedAirport,
      message: 'Airport updated successfully'
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating airport",
      error: error.message || String(error)
    });
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirportById,
  deleteAirport,
  updateAirport,
};
