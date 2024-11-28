import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import FiveDayForecast from "./components/FiveDayForecast";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "d3c97f7678bb3010c203a08faab4aff8";

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  const fetchForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
  
      const dailyData = {};
      data.list.forEach((item) => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
  
        if (!dailyData[day]) {
          dailyData[day] = {
            day,
            maxTemp: item.main.temp,
            icon: item.weather[0].icon,
          };
        } else {
          dailyData[day].maxTemp = Math.ceil(Math.max(dailyData[day].maxTemp, item.main.temp));
        }
      });
  
      const processedForecast = Object.values(dailyData).slice(0, 5);
  
      setForecast(processedForecast);
    } catch (err) {
      setForecast([]);
      setError(err.message);
    }
  };
  

  useEffect(() => {
    fetchWeather("Toronto");
    fetchForecast("Toronto");
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar
        onSearch={(city) => {
          fetchWeather(city);
          fetchForecast(city);
        }}
      />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <FiveDayForecast forecast={forecast} />}
    </div>
  );
};

export default App;
