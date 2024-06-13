import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

const VehiclesTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [cities, setCities] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');

    const fetchData = (endpoint, setData) => {
        axios.get("http://localhost:9000/"+endpoint)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(`There was an error fetching the ${endpoint} data.`, error);
        });
    };

    const fetchAll = () => {
        fetchData("vehicles", setVehicles);
        fetchData("cities", setCities);
        fetchData("drivers", setDrivers);
    };

    const handleButtonClick = () => {
        if (selectedDriver && selectedCity) {
            axios.post('http://localhost:9000/updateDatabase', {
                "driver_name": selectedDriver, 
                "new_city": selectedCity,
            })
            .then(response => {
                console.log(response.data);
                fetchData("vehicles", setVehicles);
            })
            .catch(error => {
                console.error("Error updating database:", error);
            });
        } else {
            alert('Please select both a driver and a city.');
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div>
            {/* <h1>Vehicles</h1> */}
            <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Driver Name</th>
                            <th>Current City</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.driver_name}</td>
                                <td>{vehicle.current_city}</td>
                                <td>{vehicle.latitude}</td>
                                <td>{vehicle.longitude}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                <div style={{ marginRight: '20px'}}>
                    <label htmlFor="drivers">Driver:</label>
                    <select id="drivers" onChange={(e) => setSelectedDriver(e.target.value)}>
                        <option value="">Select Driver</option>
                        {drivers.map(driver => (
                            <option key={driver.id} value={driver.driver_name}>{driver.driver_name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginRight: '20px'}}>
                    <label htmlFor="cities">Destination:</label>
                    <select id="cities" onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="">Select Destination</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={handleButtonClick}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default VehiclesTable;