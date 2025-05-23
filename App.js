import React, { useState } from "react";
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = "d23e53a626412a5be6296c099320b2ac"; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Helper function to get image path based on condition
  const getWeatherImage = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return null;

    const condition = weather.weather[0].main.toLowerCase();

    if (weather.main.temp > 35) return "/hot.png";
    if (condition.includes("snow")) return "/snow.png";
    if (condition.includes("rain")) {
      const intensity = weather.weather[0].description.toLowerCase();
      if (intensity.includes("heavy")) return "/heavy_rain.png";
      return "/rain.png";
    }
    if (condition.includes("cloud")) return "/cloudy.png";
if (condition.includes("humidity")) return "/humidity.png";
const description = weather.weather[0].description.toLowerCase();

if (description.includes("clear sky")) return "/clear sky.png";

    return null; // default: no image
  };

  const weatherImage = getWeatherImage();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <img src="/logo.png" alt="App Logo" width="80" style={{ marginBottom: "10px" }} />

      <h1>☁️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && weather.main && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>

          {weatherImage && (
            <div style={{ marginTop: "10px" }}>
              <img src={weatherImage} alt="Weather icon" width="100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
