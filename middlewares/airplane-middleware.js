    const { StatusCodes } = require('http-status-codes');
    const {ErrorResponse} = require('../utils/common');

    function validateCreateRequest(req, res, next) {
        const modelNumber = req.body.modelNumber || req.query.modelNumber;
        
        if (!modelNumber) {         
            ErrorResponse.message = "Model number is required";
            ErrorResponse.statusCode = StatusCodes.BAD_REQUEST;
            ErrorResponse.error = {
                modelNumber: "Model number is required"
            };
            return res.status(StatusCodes.BAD_REQUEST).json({
                ErrorResponse
            });
        }

        next();
    }


    module.exports = {
        validateCreateRequest
    };
