const vehicleService = require('../services/vehicleService');

exports.moveDriverToCity = async (req, res) => {
    try {
        const { driverName, destination } = req.body;
        await vehicleService.moveDriverToCity(driverName, destination);
        res.send('Database updated successfully');
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
};

exports.addNewDriver = async (req, res) => {
    try {
        const { newDriver, cityName } = req.body;
        await vehicleService.addNewDriver(newDriver, cityName);
        res.send('Database updated successfully');
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
};

exports.addNewCity = async (req, res) => {
    try {
        const {newCity, latitude, longitude } = req.body;
        await vehicleService.addNewCity(newCity, latitude, longitude);
        res.send('Database updated successfully');
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
};

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getVehicles();
        res.json(vehicles);
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await vehicleService.getDrivers();
        res.json(drivers);
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
}

exports.getCities = async (req, res) => {
    try {
        const cities = await vehicleService.getCities();
        res.json(cities);
    } catch (error) {
        errorMessage(error);
        res.status(500).send('Server Error');
    }
}

const errorMessage = (error) => {
    console.error(error.message);
    console.error(error.stack);
};