// src/components/WeatherCard.jsx
import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  // Utiliser le nom personnalisé si disponible
  const displayName = weather.customLocation || `${weather.name}, ${weather.sys?.country}`;

  return (
    <div className="mt-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          {weather.name}, {weather.sys?.country}
        </h2>
        <p className="text-gray-200 capitalize mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="text-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-32 h-32 -my-4"
          />
        </div>
        <div className="text-center">
          <p className="text-6xl font-bold text-white">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex gap-4 mt-2 text-gray-200">
            <span>H: {Math.round(weather.main.temp_max)}°</span>
            <span>L: {Math.round(weather.main.temp_min)}°</span>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20">
          <p className="text-gray-200 text-sm mb-1">Humidity</p>
          <p className="text-2xl font-bold text-white">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20">
          <p className="text-gray-200 text-sm mb-1">Wind</p>
          <p className="text-2xl font-bold text-white">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20">
          <p className="text-gray-200 text-sm mb-1">Pressure</p>
          <p className="text-2xl font-bold text-white">{weather.main.pressure} hPa</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20">
          <p className="text-gray-200 text-sm mb-1">Feels Like</p>
          <p className="text-2xl font-bold text-white">{Math.round(weather.main.feels_like)}°C</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-200 text-sm">Sunrise</p>
            <p className="text-white font-semibold">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-200 text-sm">Sunset</p>
            <p className="text-white font-semibold">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-200 text-sm">Visibility</p>
            <p className="text-white font-semibold">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;