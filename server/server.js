require("dotenv").config({ path: __dirname + "/.env"});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');


const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// app.use(express.json());



// const getVehicles = async (req, res) => {
//     try {
        
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error(error.message);
//         console.error(error.stack);
//         res.status(500).send('Server Error');
//     }
// };
        
// const getCities = async (req, res) => {
//     try {
//         const result = await pool.query(`
//             SELECT name FROM locations ORDER BY name
//         `);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error(error.message);
//         console.error(error.stack);
//         res.status(500).send('Server Error');
//     }
// };

// const getDrivers = async (req, res) => {
//     try {
        
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error(error.message);
//         console.error(error.stack);
//         res.status(500).send('Server Error');
//     }
// };
                
// const moveDriverToCity = async (req, res) => {
//     const { driverName, newCity } = req.body;
//     try {
//         res.send('Database updated successfully');
//     } catch (error) {
//         console.error(error.message);
//         console.error(error.stack);
//         res.status(500).send('Server Error');
//     }
// };

// const addNewDriver = async (req, res) => {
//     const { driverName, newCity } = req.body;

// };

// const addNewCity = async (req, res) => {
    
    
// };

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.get("/vehicles", getVehicles);

// app.get("/cities", getCities);

// app.get("/drivers", getDrivers);

// app.get("/api/vehicles", getVehicles);

// app.get("/api/cities", getCities);

// app.get("/api/drivers", getDrivers);

// app.post("/api/addDriver", addNewDriver);

// app.post("/api/addCity", addNewCity);

// app.post("/updateDatabase", moveDriverToCity);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});