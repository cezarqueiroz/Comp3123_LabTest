import React from "react";

const FiveDayForecast = ({ forecast }) => {
  return (
    <div>
        <h2>Five Day Forecast</h2>
        <div className="forecast-container">        
            {forecast.map((day) => (
                <div key={day.day} className="forecast-item">
                <img
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt="weather icon"
                />
                <p>{day.day}</p>
                <p>{day.maxTemp}°C</p>
                </div>
            ))}
        </div>
    </div>
    
  );
};

export default FiveDayForecast;
