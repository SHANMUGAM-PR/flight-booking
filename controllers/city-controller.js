const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name || req.query.name,
            state: req.body.state || req.query.state,
            country: req.body.country || req.query.country,
        });

        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            data: city,
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            message: error.message || "Error creating city",
            error: error.explanation || error,
        });
    }
}
module.exports = {
    createCity,
};
