import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/weather?city=${city}`); // Replace with backend API URL
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(''); // Clear any previous error
    } catch (error) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
          />
          <button type="submit">Get Weather</button>
        </form>
        {error && <p>{error}</p>}
        {weather && (
          <div>
            <h3>Weather in {weather.city}</h3>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Description: {weather.description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
