import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VehiclesTable from './components/VehiclesTable';
import AddDriverDialog from './components/AddDriverDialog';
import AddCityDialog from './components/AddCityDialog';
import MoveDriverDropdowns from './components/MoveDriverDropdowns';


function App() {
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await axios.get(`http://localhost:9000/${endpoint}`);
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const fetchCities = async () => {
    fetchData('api/cities', setCities);
  };

  const fetchDrivers = async () => {
    fetchData('api/drivers', setDrivers);
  };

  const fetchVehicles = async () => {
    fetchData('api/vehicles', setVehicles);
  };

  const fetchAll = async () => {
    await fetchCities();
    await fetchDrivers();
    await fetchVehicles();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addDriver = async (name, city) => {
    try {
      await axios.post('http://localhost:9000/api/addDriver', { newDriver: name, cityName: city });
      fetchAll();
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const addCity = async (newCity, latitude, longitude) => {
    try {
        await axios.post('http://localhost:9000/api/addCity', { newCity: newCity, latitude: latitude, longitude: longitude});
        fetchCities();
    } catch (error) {
        console.error('Error adding city:', error);
    }
  };

  const moveDriver = async (driver, city) => {
    try {
      await axios.post('http://localhost:9000/moveDriver', { driverName: driver, destination: city });
      fetchAll();
    } catch (error) {
      console.error('Error moving driver:', error);
    }
  };

  return (
    <div>
      <h1>Truck Tracker</h1>
      <VehiclesTable vehicles={vehicles}/>
      <MoveDriverDropdowns drivers={drivers} cities={cities} onMoveDriver={moveDriver} />
      <AddDriverDialog cities={cities} onAddDriver={addDriver} />
      <AddCityDialog onAddCity={addCity} />
    </div>
  );
}

export default App;
