const WeatherCard = ({ weather }) => {
  return (
    <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-white/80 capitalize mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-24 h-24"
        />
        <div>
          <p className="text-5xl font-bold text-white">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex gap-4 mt-2 text-white/80">
            <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/20 p-4 rounded-xl text-center">
          <p className="text-white/80 mb-1">Humidity</p>
          <p className="text-2xl font-bold text-white">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl text-center">
          <p className="text-white/80 mb-1">Wind</p>
          <p className="text-2xl font-bold text-white">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl text-center">
          <p className="text-white/80 mb-1">Pressure</p>
          <p className="text-2xl font-bold text-white">{weather.main.pressure} hPa</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl text-center">
          <p className="text-white/80 mb-1">Visibility</p>
          <p className="text-2xl font-bold text-white">
            {(weather.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-white/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-white/80">Sunrise</p>
            <p className="text-white font-semibold">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/80">Sunset</p>
            <p className="text-white font-semibold">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;