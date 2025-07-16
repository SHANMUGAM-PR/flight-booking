const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    const { name, address, cityId } = req.body;

    if (!name) {
        ErrorResponse.message = 'Airport name is required';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!address) {
        ErrorResponse.message = 'Airport address is required';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (cityId === undefined || cityId === null || isNaN(Number(cityId))) {
        ErrorResponse.message = 'Valid cityId is required';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next) {
    const { name, address, cityId } = req.body;

    if (!name && !address && !cityId) {
        ErrorResponse.message = 'At least one field (name, address, cityId) must be provided to update';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (cityId !== undefined && (cityId === null || isNaN(Number(cityId)))) {
        ErrorResponse.message = 'cityId must be a valid number if provided';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest,
};
