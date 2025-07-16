const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse,SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber ||  req.query.modelNumber,
            capacity: req.body.capacity || req.query.capacity,
        });
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Error creating airplane";
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAirplanes(req, res) {
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
         ErrorResponse.message = "Error creating airplane";
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAirplaneById(req,res){
    try {
    const id = req.params.id;
    const airplane = await AirplaneService.getAirplaneById(id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Error fetching airplane";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function deleteAirplane(req, res) {
    try {
        const id = req.params.id;
        const airplane = await AirplaneService.deleteAirplane(id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Error deleting airplane";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function updateAirplane(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedAirplane = await AirplaneService.updateAirplane(id, data);

        return res.status(StatusCodes.OK).json({
            success: true,
            data: updatedAirplane,
            message: 'Airplane updated successfully'
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Error updating airplane",
    error: error.message || String(error)   // ✔ use .message or convert error to string
});

    }
}




module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneById,
    deleteAirplane,
    updateAirplane,
    
}