import React, { useState } from 'react';

const MoveDriverDropdowns = ({ drivers, cities, onMoveDriver }) => {
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleMoveDriver = () => {
        if (selectedDriver && selectedCity) {
            onMoveDriver(selectedDriver, selectedCity);
            setSelectedDriver('');
            setSelectedCity('');
        }
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
            <div style={{ marginRight: '20px'}}>
                <label htmlFor="drivers">Driver:</label>
                <select 
                    id="drivers" 
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                >
                    <option value="">Select Driver</option>
                    {drivers.map(driver => (
                        <option key={driver.id} value={driver.driver_name}>{driver.driver_name}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginRight: '20px'}}>
                <label htmlFor="cities">Destination:</label>
                <select 
                    id="cities" 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">Select Destination</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={handleMoveDriver}>Send</button>
            </div>
        </div>
    );
};

export default MoveDriverDropdowns;