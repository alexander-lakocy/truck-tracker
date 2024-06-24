const pool = require(__dirname + "/../db/db.config.js");

exports.moveDriverToCity = async (driverName, destination) => {
    // const locationQuery = await pool.query(`
    //     SELECT id FROM locations
    //     WHERE name = '${newCity}'
    // `);
    
    // if (locationQuery.rows.length === 0) {
    //     console.error('Location not found');
    //     throw new Error('Location not found');
    // }

    // const locationIndex = locationQuery.rows[0].id;

    try {

        const locationIndex = findLocationID(destination);

        await pool.query(`
            UPDATE vehicles
            SET current_location_id = ${locationIndex}
            WHERE driver_name = '${driverName}'
        `);
    } catch (error) {
        const errString = 'Error moving driver';
        raiseErrorMessage(errString, error);
    }
};

exports.addNewDriver = async (newDriver, cityName) => {
    // const locationQuery = await pool.query(`
    //     SELECT id FROM locations
    //     WHERE name = '${newCity}'
    // `);
    
    // if (locationQuery.rows.length === 0) {
    //     console.error('Location not found');
    //     throw new Error('Location not found');
    // }

    // const locationIndex = locationQuery.rows[0].id;

    try {
        const locationIndex = findLocationID(cityName);

        await pool.query(`
            INSERT INTO vehicles (driver_name, current_location_id)
            VALUES ('${newDriver}', ${locationIndex})
        `);
    } catch (error) {
        const errString = 'Error adding driver';
        raiseErrorMessage(errString, error);
    }
};

exports.addNewCity = async (newCity, latitude, longitude) => {
    try {
        await pool.query(`
            INSERT INTO locations (name, latitude, longitude)
            VALUES ('${newCity}', ${latitude}, ${longitude})
        `);
    } catch (error) {
        const errString = 'Error adding city';
        raiseErrorMessage(errString, error);
    }
};

const findLocationID = async (cityName) => {
    const locationQuery = await pool.query(`
        SELECT id FROM locations
        WHERE name = '${cityName}'
    `);

    if (locationQuery.rows.length === 0) {
        console.error('Location not found');
        throw new Error('Location not found');
    }

    const locationIndex = locationQuery.rows[0].id;

    return locationIndex;
};

const raiseErrorMessage = (errString, error) => {
    console.error(errString, ':', error);
    throw new Error(errString);
};

exports.getVehicles = async () => {
    try {
        const result = await pool.query(`
            SELECT v.id, v.driver_name, l.name AS current_city, l.latitude, l.longitude
            FROM vehicles v
            JOIN locations l ON v.current_location_id = l.id
            ORDER BY id
        `);
        return result.rows;
    } catch (error) {
        const errString = 'Error fetching vehicles';
        raiseErrorMessage(errString, error);
    }
};

exports.getDrivers = async () => {
    try {
        const result = await pool.query(`
            SELECT driver_name FROM vehicles ORDER BY driver_name
        `);
        return result.rows;
    } catch (error) {
        const errString = 'Error fetching drivers';
        raiseErrorMessage(errString, error);
    }
};

exports.getCities = async () => {
    try {
        const result = await pool.query(`
            SELECT name FROM locations ORDER BY name
        `);
        return result.rows;
    } catch (error) {
        const errString = 'Error fetching cities';
        raiseErrorMessage(errString, error);
    }
};