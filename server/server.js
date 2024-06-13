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
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/vehicles", getVehicles);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});