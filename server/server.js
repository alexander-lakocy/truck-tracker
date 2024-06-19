require("dotenv").config({ path: __dirname + "/.env"});
const express = require('express');
const cors = require('cors');
const pool = require(__dirname + "/db.config.js");

const app = express();
// const routes = require('./routes');

// app.use(express.json());
// app.use('/api', routes);

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const getVehicles = async (req, res) => {
    console.log('getVehicles()');
    try {
        const result = await pool.query(`
            SELECT v.id, v.driver_name, l.name AS current_city, l.latitude, l.longitude
            FROM vehicles v
            JOIN locations l ON v.current_location_id = l.id
            ORDER BY id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};
        
const getCities = async (req, res) => {
    console.log('getCities()');
    try {
        const result = await pool.query(`
            SELECT name FROM locations
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};

const getDrivers = async (req, res) => {
    console.log('getDrivers()');
    try {
        const result = await pool.query(`
            SELECT driver_name FROM vehicles ORDER BY id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};
                
const moveDriverToCity = async (req, res) => {
    const { driverName, newCity } = req.body;
    console.log(`moveDriverToCity(driverName=${driverName}, newCity=${newCity})`);
    try {
        const locationQuery = await pool.query(`
            SELECT id FROM locations
            WHERE name = '${newCity}'
        `);
        
        if (locationQuery.rows.length === 0) {
            throw new Error('Location not found');
            console.error('Location not found');
        }

        const locationIndex = locationQuery.rows[0].id;

        const result = await pool.query(`
            UPDATE vehicles
            SET current_location_id = ${locationIndex}
            WHERE driver_name = '${driverName}'
        `);
        console.log("Database updated successfully");
        res.send('Database updated successfully');
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};

const addNewDriver = async (req, res) => {
    const { driverName, newCity } = req.body;
    console.log(`addNewDriver(driverName=${driverName}, newCity=${newCity})`);
    try {
        const locationQuery = await pool.query(`
            SELECT id FROM locations
            WHERE name = '${newCity}'
        `);
        
        if (locationQuery.rows.length === 0) {
            console.error('Location not found');
            throw new Error('Location not found');
        }

        const locationIndex = locationQuery.rows[0].id;

        const result = await pool.query(`
            INSERT INTO vehicles (driver_name, current_location_id)
            VALUES ('${driverName}', ${locationIndex})
        `);
        console.log(`addNewDriver result: ${result}`);
        res.send('Database updated successfully');
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};

const addNewCity = async (req, res) => {
    const {newCity, latitude, longitude } = req.body;
    console.log(`newCity: ${newCity}, latitude: ${latitude}, longitude: ${longitude})`);
    try {
        const locationQuery = await pool.query(`
            INSERT INTO locations (name, latitude, longitude)
            VALUES ('${newCity}', ${latitude}, ${longitude})
        `);
        console.log("Database updated successfully");
        res.send('Database updated successfully');
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        res.status(500).send('Server Error');
    }
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/vehicles", getVehicles);

app.get("/cities", getCities);

app.get("/drivers", getDrivers);

app.get("/api/vehicles", getVehicles);

app.get("/api/cities", getCities);

app.get("/api/drivers", getDrivers);

app.post("/api/addDriver", addNewDriver);

app.post("/api/addCity", addNewCity);

app.post("/updateDatabase", moveDriverToCity);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});