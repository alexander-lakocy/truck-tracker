import React from 'react';

const VehiclesTable = ({ vehicles }) => {
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
            
        </div>
    );
};

export default VehiclesTable;