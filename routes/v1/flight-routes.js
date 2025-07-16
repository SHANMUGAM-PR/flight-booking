const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middlewares'); // Optional

/**
 * Create a Flight
 * POST http://localhost:3000/api/v1/flight
 * 
 * In Postman:
 * - Method: POST
 * - URL: http://localhost:3000/api/v1/flight
 * - Headers: Content-Type: application/json
 * - Body (raw JSON):
 *   {
 *     "flightNumber": "AI101",
 *     "airplaneId": 1,
 *     "departureAirportId": 2,
 *     "arrivalAirportId": 3,
 *     "departureTime": "2025-06-10T10:00:00Z",
 *     "arrivalTime": "2025-06-10T14:00:00Z",
 *     "price": 5000,
 *     "boardingGate": "A5",
 *     "totalSeats": 150
 *   }
 */
router.post(
  '/',
  FlightMiddleware?.validateCreateRequest || ((req, res, next) => next()),
  FlightController.createFlight
);

/**
 * Get all Flights with optional filters
 * GET http://localhost:3000/api/v1/flight
 * 
 * In Postman:
 * - Method: GET
 * - URL example with filters:
 *   http://localhost:3000/api/v1/flight?departureAirportId=2&arrivalAirportId=3&priceMin=1000&priceMax=7000&sortBy=price&order=ASC
 * - No body required
 */
router.get('/', FlightController.getFlights);  // <- make sure this matches your controller

/**
 * Get Flight by ID
 * GET http://localhost:3000/api/v1/flight/:id
 * 
 * In Postman:
 * - Method: GET
 * - URL example: http://localhost:3000/api/v1/flight/1
 * - No body required
 */
router.get('/:id', FlightController.getFlightById);

/**
 * Update Flight by ID
 * PATCH http://localhost:3000/api/v1/flight/:id
 * 
 * In Postman:
 * - Method: PATCH
 * - URL example: http://localhost:3000/api/v1/flight/1
 * - Headers: Content-Type: application/json
 * - Body (raw JSON):
 *   {
 *     "price": 5500,
 *     "boardingGate": "B10"
 *   }
 */
router.patch('/:id', FlightController.updateFlight);

/**
 * Delete Flight by ID
 * DELETE http://localhost:3000/api/v1/flight/:id
 * 
 * In Postman:
 * - Method: DELETE
 * - URL example: http://localhost:3000/api/v1/flight/1
 * - No body required
 */
router.delete('/:id', FlightController.deleteFlight);

/**
 * Reduce Seats on a Flight (e.g., after booking)
 * POST http://localhost:3000/api/v1/flight/reduce-seats
 * 
 * In Postman:
 * - Method: POST
 * - URL: http://localhost:3000/api/v1/flight/reduce-seats
 * - Headers: Content-Type: application/json
 * - Body (raw JSON):
 *   {
 *     "flightId": 1,
 *     "seats": 2
 *   }
 */
router.post(
  '/reduce-seats',
  FlightController.reduceSeats
);

module.exports = router;
