const { StatusCodes } = require('http-status-codes');

function validateCreateRequest(req, res, next) {
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    arrivalTime,
    departureTime,
    price,
    totalSeats
  } = req.body;

  if (!flightNumber || typeof flightNumber !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'flightNumber'"
    });
  }

  if (!airplaneId || typeof airplaneId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'airplaneId'"
    });
  }

  if (!departureAirportId || typeof departureAirportId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'departureAirportId'"
    });
  }

  if (!arrivalAirportId || typeof arrivalAirportId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'arrivalAirportId'"
    });
  }

  if (!arrivalTime || isNaN(Date.parse(arrivalTime))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'arrivalTime'"
    });
  }

  if (!departureTime || isNaN(Date.parse(departureTime))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'departureTime'"
    });
  }

  if (!price || typeof price !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'price'"
    });
  }

  if (!totalSeats || typeof totalSeats !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'totalSeats'"
    });
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  // For update, allow partial data but validate if fields exist
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    arrivalTime,
    departureTime,
    price,
    totalSeats
  } = req.body;

  if (flightNumber && typeof flightNumber !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'flightNumber' must be a string"
    });
  }

  if (airplaneId && typeof airplaneId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'airplaneId' must be a number"
    });
  }

  if (departureAirportId && typeof departureAirportId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'departureAirportId' must be a number"
    });
  }

  if (arrivalAirportId && typeof arrivalAirportId !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'arrivalAirportId' must be a number"
    });
  }

  if (arrivalTime && isNaN(Date.parse(arrivalTime))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'arrivalTime' must be a valid date"
    });
  }

  if (departureTime && isNaN(Date.parse(departureTime))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'departureTime' must be a valid date"
    });
  }

  if (price && typeof price !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'price' must be a number"
    });
  }

  if (totalSeats && typeof totalSeats !== 'number') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "'totalSeats' must be a number"
    });
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest
};
