import logo from './logo.svg';
import React from 'react';
import './App.css';
import VehiclesTable from './VehiclesTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Where Are My Vehicles?
        <VehiclesTable />
      </header>
    </div>
  );
}

export default App;
