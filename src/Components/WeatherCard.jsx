// src/components/WeatherCard.jsx
import React from 'react';
import { FaThermometerHalf, FaTint, FaWind, FaCompressAlt, FaEye, FaSun, FaMoon } from 'react-icons/fa';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  // Fonction pour formater l'heure
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Fonction pour déterminer la couleur de la température
  const getTempColor = (temp) => {
    if (temp < 0) return 'text-blue-300';
    if (temp < 10) return 'text-blue-200';
    if (temp < 20) return 'text-green-300';
    if (temp < 30) return 'text-yellow-300';
    return 'text-red-300';
  };

  return (
    <div>
      {/* Main Weather Display */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <p className="text-2xl text-gray-200 capitalize">
              {weather.weather[0].description}
            </p>
            <span className="text-gray-400">•</span>
            <p className="text-gray-200">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="mt-6 lg:mt-0">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-40 h-40 -my-8"
            />
            <div className="ml-4">
              <div className={`text-7xl font-bold ${getTempColor(weather.main.temp)}`}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">High</p>
                  <p className="text-xl font-semibold text-white">{Math.round(weather.main.temp_max)}°</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Low</p>
                  <p className="text-xl font-semibold text-white">{Math.round(weather.main.temp_min)}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Weather Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feels Like Card */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/30 rounded-xl mr-4">
                <FaThermometerHalf className="text-blue-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Feels Like</p>
                <p className={`text-3xl font-bold ${getTempColor(weather.main.feels_like)}`}>
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            {weather.main.feels_like > weather.main.temp ? 
              "Feels warmer than actual temperature" : 
              "Feels cooler than actual temperature"}
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/30 rounded-xl mr-4">
                <FaTint className="text-green-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Humidity</p>
                <p className="text-3xl font-bold text-white">{weather.main.humidity}%</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-600/50 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-400 h-full rounded-full"
              style={{ width: `${Math.min(weather.main.humidity, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Wind Card */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-orange-500/30 rounded-xl mr-4">
                <FaWind className="text-orange-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Wind</p>
                <p className="text-3xl font-bold text-white">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            Direction: {weather.wind.deg}°
          </div>
        </div>

        {/* Pressure Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/30 rounded-xl mr-4">
                <FaCompressAlt className="text-purple-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Pressure</p>
                <p className="text-3xl font-bold text-white">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            {weather.main.pressure < 1000 ? 'Low' : 
             weather.main.pressure < 1020 ? 'Normal' : 'High'} pressure
          </div>
        </div>

        {/* Visibility Card */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-500/30 rounded-xl mr-4">
                <FaEye className="text-indigo-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Visibility</p>
                <p className="text-3xl font-bold text-white">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            {weather.visibility > 10000 ? 'Excellent' : 
             weather.visibility > 5000 ? 'Good' : 
             weather.visibility > 2000 ? 'Moderate' : 'Poor'} visibility
          </div>
        </div>

        {/* Sunrise/Sunset Card */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/30 rounded-xl mr-4">
                <FaSun className="text-yellow-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Sunrise</p>
                <p className="text-2xl font-bold text-white">{formatTime(weather.sys.sunrise)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/30 rounded-xl mr-4">
                <FaMoon className="text-blue-200" size={24} />
              </div>
              <div>
                <p className="text-gray-200 font-semibold">Sunset</p>
                <p className="text-2xl font-bold text-white">{formatTime(weather.sys.sunset)}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300 text-center">
            Day length: {Math.round((weather.sys.sunset - weather.sys.sunrise) / 3600)} hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;