const { StatusCodes } = require('http-status-codes');
const flightService = require('../services/flight-service');

async function createFlight(req, res) {
  try {
    const flight = await flightService.createFlight(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Flight created successfully',
      data: flight,
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create flight',
      data: {},
      error: error.message
    });
  }
}

async function getFlights(req, res) {  // renamed to getFlights to match router
  try {
    const flights = await flightService.getFlights(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Flights fetched successfully',
      data: flights,
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch flights',
      data: {},
      error: error.message
    });
  }
}

async function getFlightById(req, res) {
  try {
    const flight = await flightService.getFlightById(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Flight fetched successfully',
      data: flight,
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch flight',
      data: {},
      error: error.message
    });
  }
}

async function updateFlight(req, res) {
  try {
    const flight = await flightService.updateFlight(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Flight updated successfully',
      data: flight,
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update flight',
      data: {},
      error: error.message
    });
  }
}

async function deleteFlight(req, res) {
  try {
    await flightService.deleteFlight(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Flight deleted successfully',
      data: {},
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete flight',
      data: {},
      error: error.message
    });
  }
}

async function reduceSeats(req, res) {
  try {
    const { flightId, seats } = req.body;

    if (!flightId || !seats || seats <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid flightId or seats',
        data: {},
        error: 'Validation error'
      });
    }

    const updatedFlight = await flightService.reduceFlightSeats(flightId, seats);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Seats reduced successfully',
      data: updatedFlight,
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to reduce seats',
      data: {},
      error: error.message
    });
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  reduceSeats
};
