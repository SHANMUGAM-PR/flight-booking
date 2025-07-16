const express = require('express');
const router = express.Router();
const { CityController } = require('../../controllers'); 
const {CityMiddleware} = require('../../middlewares');


//localhost:3000/api/v1/city/
/*
POST http://localhost:3000/api/v1/city/
Body (JSON):
// duplicates are not allowed
{
  "name": "Chennai",
  "state": "Tamil Nadu",
  "country": "India"
}

*/
router.post('/',  CityMiddleware.validateCityName,CityController.createCity);

module.exports = router;