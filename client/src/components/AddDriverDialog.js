import React, { useState } from 'react';

const AddDriverDialog = ({ cities, onAddDriver }) => {
    const [newDriver, setDriverName] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleAddDriver = () => {
        if (newDriver && selectedCity) {
            onAddDriver(newDriver, selectedCity);
            setDriverName('');
            setSelectedCity('');
        }
    };

    return (
        <div>
            <h2>Add Driver</h2>
            <input
                type="text"
                placeholder="Driver Name"
                value={newDriver}
                onChange={(e) => setDriverName(e.target.value)}
            />
            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>
            <button onClick={handleAddDriver}>Add Driver</button>
        </div>
    );    
};

export default AddDriverDialog;