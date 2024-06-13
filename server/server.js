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
                
                // const moveAliceToDenver = async (req, res) => {
                    //     try {
                        //         const result = await pool.query(`
                        //             UPDATE vehicles
                        //             SET current_location_id = 4
                        //             WHERE driver_name = 'Alice'
//         `);
//         res.send('Database updated successfully');
//     } catch (error) {
    //         console.error(error.message);
    //         res.status(500).send('Server Error');
    //     }
    // };
    
    // const moveDriverToAtlanta = async (req, res) => {
        //     const { driver_name, new_city } = req.body;
//     console.log(`Driver: ${driver_name}, City: ${new_city}`);
//     try {
    //         const result = await pool.query(`
    //             UPDATE vehicles
    //             SET current_location_id = 1
    //             WHERE driver_name = '${driver_name}'
    //         `);
    //         res.send('Database updated successfully');
    //     } catch (error) {
        //         console.error(error.message);
        //         res.status(500).send('Server Error');
        //     }
        // };

const moveDriverToCity = async (req, res) => {
    const { driver_name, new_city } = req.body;
    try {
        const locationQuery = await pool.query(`
            SELECT id FROM locations
            WHERE name = '${new_city}'
            `);
        
        if (locationQuery.rows.length === 0) {
            throw new Error('Location not found');
            console.error('Location not found');
        }

        const locationIndex = locationQuery.rows[0].id;

        const result = await pool.query(`
            UPDATE vehicles
            SET current_location_id = ${locationIndex}
            WHERE driver_name = '${driver_name}'
        `);
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

app.post("/updateDatabase", moveDriverToCity);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});