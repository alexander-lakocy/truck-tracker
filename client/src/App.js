import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VehiclesTable from './components/VehiclesTable';
import AddDriverDialog from './components/AddDriverDialog';
import AddCityDialog from './components/AddCityDialog';
import MoveDriverDropdowns from './components/MoveDriverDropdowns';


function App() {
  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);
  // const [newDriver, setNewDriver] = useState('');
  // const [selectedDriverCity, setSelectedDriverCity] = useState('');
  // const [newCity, setNewCity] = useState('');
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await axios.get(`http://localhost:9000/${endpoint}`);
      console.log(`Fetched ${endpoint} data: `, JSON.stringify(response.data, null, 2));
      setState(response.data);
      console.log(`${endpoint} state updated: `, JSON.stringify(response.data, null, 2));
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

  const openDriverDialog = () => setIsDriverDialogOpen(true);
  const closeDriverDialog = () => setIsDriverDialogOpen(false);
  const openCityDialog = () => setIsCityDialogOpen(true);
  const closeCityDialog = () => setIsCityDialogOpen(false);

  const addDriver = async (name, city) => {
    try {
      console.log(`addDriver(name=${name}, city=${city})`);
      const response = await axios.post('http://localhost:9000/api/addDriver', { driverName: name, newCity: city });
      console.log(`addDriver response: `, response.data);
      closeDriverDialog();
      fetchAll();
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const addCity = async (newCity, latitude, longitude) => {
    // Pop up menu with text dialog for city name, latitude, longitude
    try {
        console.log(`new_city: ${newCity}, latitude: ${latitude}, longitude: ${longitude}`);
        const response = await axios.post('http://localhost:9000/api/addCity', { newCity: newCity, latitude: latitude, longitude: longitude});
        console.log(`addCity response: `, response.data);
        closeCityDialog();
        fetchCities();
    } catch (error) {
        console.error('Error adding city:', error);
    }
  };

  const moveDriver = async (driver, city) => {
    try {
      console.log(`moveDriver(driver=${driver}, city=${city})`);
      const response = await axios.post('http://localhost:9000/updateDatabase', { driverName: driver, newCity: city });
      console.log('moveDriver response:', response.data);
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
      {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
          <button onClick={openDriverDialog}>Add Driver</button>
          <button onClick={openCityDialog}>Add City</button>
      </div> */}

      <dialog open={isDriverDialogOpen} onClose={closeDriverDialog}>
        AddDriverDialog
      </dialog>

      <dialog open={isCityDialogOpen} onClose={closeCityDialog}>
        <h2>Add City</h2>
        
      </dialog>

    </div>
  );
}

export default App;
