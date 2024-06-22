const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/vehicles', vehicleController.getVehicles);
router.get('/drivers', vehicleController.getDrivers);
router.get('/cities', vehicleController.getCities);

// router.get('/api/vehicles', vehicleController.getVehicles);
// router.get('/api/drivers', vehicleController.getDrivers);
// router.get('/api/cities', vehicleController.getCities);

router.post('/moveDriver', vehicleController.moveDriverToCity);
router.post('/addDriver', vehicleController.addNewDriver);
router.post('/addCity', vehicleController.addNewCity);

// router.post('/api/moveDriver', vehicleController.moveDriverToCity);
// router.post('/api/addDriver', vehicleController.addNewDriver);
// router.post('/api/addCity', vehicleController.addNewCity);

module.exports = router;