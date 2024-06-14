import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VehiclesTable from './VehiclesTable';


function App() {
  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);
  const [newDriver, setNewDriver] = useState('');
  const [selectedDriverCity, setSelectedDriverCity] = useState('');
  const [newCity, setNewCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cities, setCities] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchDrivers();
  }, []);

  const openDriverDialog = () => setIsDriverDialogOpen(true);
  const closeDriverDialog = () => setIsDriverDialogOpen(false);
  const openCityDialog = () => setIsCityDialogOpen(true);
  const closeCityDialog = () => setIsCityDialogOpen(false);

  const handleAddDriver = async () => {
    // Pop up menu with text dialog for driver name
    try {
        console.log(`driver_name: ${newDriver}, new_city: ${selectedDriverCity}`);
        await axios.post('http://localhost:9000/api/addDriver', { driver_name: newDriver, new_city: selectedDriverCity });
        closeDriverDialog();
        fetchDrivers();
    } catch (error) {
        console.error(error);
    }
  };
  
  const handleAddCity = async () => {
    // Pop up menu with text dialog for city name, latitude, longitude
    try {
        console.log(`new_city: ${newCity}, latitude: ${latitude}, longitude: ${longitude}`);
        await axios.post('http://localhost:9000/api/addCity', { new_city: newCity, latitude: latitude, longitude: longitude});
        closeCityDialog();
        fetchCities();
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <h1>Truck Tracker</h1>
      <VehiclesTable />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
          <button onClick={openDriverDialog}>Add Driver</button>
          <button onClick={openCityDialog}>Add City</button>
      </div>

      <dialog open={isDriverDialogOpen} onClose={closeDriverDialog}>
        <h2>Add Driver</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddDriver();}}>
          <label>
            Driver Name:
            <input
              type="text"
              value={newDriver}
              onChange={(e) => setNewDriver(e.target.value)}
              required
            />
          </label>
          <label>
            Select City:
            <select
              value={selectedDriverCity}
              onChange={(e) => setSelectedDriverCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={closeDriverDialog}>Cancel</button>
        </form>
      </dialog>

      <dialog open={isCityDialogOpen} onClose={closeCityDialog}>
        <h2>Add City</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddCity();}}>
          <label>
            City Name:
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              required
            />
          </label>
          <label>
            Latitude:
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={closeCityDialog}>Cancel</button>
        </form>
      </dialog>

    </div>
  );
}

export default App;
