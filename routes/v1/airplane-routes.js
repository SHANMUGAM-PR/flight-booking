const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares');

/*
POST → Create Airplane

URL: http://localhost:3000/api/v1/airplane
Body (JSON):
{
  "modelNumber": "akcc",
  "capacity": 15
}

Response (Success):
{
  "data": {
    "id": 20,
    "modelNumber": "akcc",
    "capacity": 15,
    "createdAt": "2025-05-29T12:34:03.000Z",
    "updatedAt": "2025-05-29T12:34:03.000Z"
  }
}
*/
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);

/*
GET → Get all airplanes

URL: http://localhost:3000/api/v1/airplane

Response (Success):
{
  "data": [
    {
      "id": 19,
      "modelNumber": "Boeing747MAX",
      "capacity": 680,
      "createdAt": "2025-05-25T10:58:32.000Z",
      "updatedAt": "2025-06-01T10:21:54.000Z"
    },
    {
      "id": 20,
      "modelNumber": "akcc",
      "capacity": 15,
      "createdAt": "2025-05-29T12:34:03.000Z",
      "updatedAt": "2025-05-29T12:34:03.000Z"
    }
  ]
}
*/
router.get('/', AirplaneController.getAirplanes);

/*
GET → Get airplane by ID

URL: http://localhost:3000/api/v1/airplane/:id
Example: http://localhost:3000/api/v1/airplane/17

Response (Success):
{
  "data": {
    "id": 17,
    "modelNumber": "Boeing737",
    "capacity": 200,
    "createdAt": "2025-05-20T09:00:00.000Z",
    "updatedAt": "2025-06-01T10:00:00.000Z"
  }
}
*/
router.get('/:id', AirplaneController.getAirplaneById);

/*
DELETE → Delete airplane by ID

URL: http://localhost:3000/api/v1/airplane/:id
Example: http://localhost:3000/api/v1/airplane/17

Response (Success):
{
  "message": "Airplane deleted successfully"
}
*/
router.delete('/:id', AirplaneController.deleteAirplane);

/*
PATCH → Update airplane by ID

URL: http://localhost:3000/api/v1/airplane/:id
Example: http://localhost:3000/api/v1/airplane/19

Body (JSON):
{
  "modelNumber": "Boeing747MAX",
  "capacity": 680
}

Response (Success):
{
  "data": {
    "id": 19,
    "modelNumber": "Boeing747MAX",
    "capacity": 680,
    "createdAt": "2025-05-25T10:58:32.000Z",
    "updatedAt": "2025-06-05T11:00:00.000Z"
  }
}
*/
router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;
