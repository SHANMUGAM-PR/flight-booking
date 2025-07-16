const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

function validateCityName(req, res, next) {
    const name = req.body.name || req.query.name;

    if (!name || name.trim() === '') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ...ErrorResponse,
            message: 'City name is required and cannot be empty',
        });
    }

    next(); // continue to controller
}

module.exports = {
    validateCityName,
};
