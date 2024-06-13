import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

const VehiclesTable = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/vehicles")
            .then(response => {
                setVehicles(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the vehicle data.", error);
            });
    }, []);

    return (
        <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* <h1>Vehicles</h1> */}
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
    );
};

export default VehiclesTable;