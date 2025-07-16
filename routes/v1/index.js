const express = require('express');
const router = express.Router();

const{ InfoController} = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');
const airportRoutes = require('./airport-routes');

router.use('/airplane',airplaneRoutes);
router.use('/city', require('./city-routes'));
router.use('/airport', airportRoutes);
router.use('/flight', require('./flight-routes'));

router.get('/info',InfoController.info);

module.exports = router;