import React from "react";
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from "react-icons/wi";

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails } = weather;
  const weatherIcon = weatherDetails[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  const getWeatherIcon = (icon) => {
    if (icon.startsWith("01")) return <WiDaySunny />;
    if (icon.startsWith("02") || icon.startsWith("03") || icon.startsWith("04")) return <WiCloudy />;
    if (icon.startsWith("09") || icon.startsWith("10")) return <WiRain />;
    if (icon.startsWith("13")) return <WiSnow />;
    return <WiCloudy />;
  };

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>Temperature: {Math.ceil(main.temp)}°C</p>
      <p>Condition: {weatherDetails[0].description}</p>
      {getWeatherIcon(weatherIcon)}
      <img src={iconUrl} alt="weather icon" />
    </div>
  );
};

export default WeatherCard;
