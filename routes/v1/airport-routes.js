const express = require('express');
const router = express.Router();
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');

/*
POST → Create Airport

URL: http://localhost:3000/api/v1/airport
Body (JSON):
{
  "name": "Chennai International Airport",
  "address": "Meenambakkam, Chennai",
  "cityId": 1
}
*/
router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport);

/*
GET → Get all airports
URL: http://localhost:3000/api/v1/airport
*/
router.get('/', AirportController.getAirports);

/*
GET → Get airport by ID
URL: http://localhost:3000/api/v1/airport/:id
Example: http://localhost:3000/api/v1/airport/3
*/
router.get('/:id', AirportController.getAirportById);

/*
DELETE → Delete airport by ID
URL: http://localhost:3000/api/v1/airport/:id
Example: http://localhost:3000/api/v1/airport/3
*/
router.delete('/:id', AirportController.deleteAirport);

/*
PATCH → Update airport
URL: http://localhost:3000/api/v1/airport/:id
Example: http://localhost:3000/api/v1/airport/3

Body (JSON):
{
  "name": "Chennai Int’l Terminal 2",
  "address": "Meenambakkam South Gate"
}
*/
router.patch('/:id', AirportController.updateAirport);

module.exports = router;
