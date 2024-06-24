import React, { useState } from 'react';

const AddCityDialog = ({ onAddCity }) => {
    const [newCity, setNewCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleAddCity = () => {
      if ((newCity && latitude) && longitude) {
        onAddCity(newCity, latitude, longitude);
        setNewCity('');
        setLatitude('');
        setLongitude('');
      }
    };

    return (
        <div>
            <h2>Add City</h2>
            <input
              type="text"
              placeholder="City Name"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          <button onClick={handleAddCity}>Add City</button>
        </div>
    );
};

export default AddCityDialog;