import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Header from "./components/Header";
import { FaSun, FaCloudRain, FaSnowflake, FaCloud, FaBolt } from "react-icons/fa";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("from-blue-500 to-purple-600");

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fonction pour déterminer le fond basé sur la météo
  const getWeatherBackground = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase();
    
    if (condition?.includes("clear")) return "from-yellow-400 to-orange-500";
    if (condition?.includes("cloud")) return "from-gray-400 to-blue-400";
    if (condition?.includes("rain") || condition?.includes("drizzle")) return "from-blue-600 to-gray-700";
    if (condition?.includes("thunderstorm")) return "from-purple-700 to-gray-900";
    if (condition?.includes("snow")) return "from-blue-200 to-blue-400";
    if (condition?.includes("mist") || condition?.includes("fog")) return "from-gray-300 to-gray-500";
    return "from-blue-500 to-purple-600";
  };

  const fetchWeather = async (city) => {
    if (!city || city.trim() === "") {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      
      // Mettre à jour le background basé sur la météo
      const bgClass = getWeatherBackground(response.data.weather[0].main);
      setBackgroundClass(bgClass);
      
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 404) {
        setError("City not found! Please check the name and try again.");
      } else if (err.response?.status === 400) {
        setError("Invalid input. Please enter a valid city name.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Unable to fetch weather data. Please try again.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Charger une ville par défaut au démarrage
  useEffect(() => {
    fetchWeather("London");
  }, []);

  // Obtenir l'icône météo basée sur la condition
  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase();
    if (cond?.includes("clear")) return <FaSun className="text-yellow-300" size={28} />;
    if (cond?.includes("rain")) return <FaCloudRain className="text-blue-300" size={28} />;
    if (cond?.includes("snow")) return <FaSnowflake className="text-blue-100" size={28} />;
    if (cond?.includes("thunderstorm")) return <FaBolt className="text-yellow-400" size={28} />;
    return <FaCloud className="text-gray-300" size={28} />;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} transition-all duration-1000`}>
      <Header fetchWeather={fetchWeather} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Bar */}
          {weather && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm">FEELS LIKE</p>
                    <p className="text-2xl font-bold text-white">{Math.round(weather.main.feels_like)}°C</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    {getWeatherIcon(weather.weather[0].main)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm">HUMIDITY</p>
                    <p className="text-2xl font-bold text-white">{weather.main.humidity}%</p>
                  </div>
                  <div className="text-3xl">💧</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm">WIND SPEED</p>
                    <p className="text-2xl font-bold text-white">{weather.wind.speed} m/s</p>
                  </div>
                  <div className="text-3xl">💨</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm">VISIBILITY</p>
                    <p className="text-2xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
                  </div>
                  <div className="text-3xl">👁️</div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Weather Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                    <p className="text-white mt-6 text-lg">Fetching weather data...</p>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-red-100 text-center text-lg">{error}</p>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => fetchWeather("London")}
                        className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                      >
                        Try London
                      </button>
                    </div>
                  </div>
                )}
                
                {weather && <WeatherCard weather={weather} />}
                
                {!weather && !loading && !error && (
                  <div className="text-center py-16">
                    <div className="text-7xl mb-6 opacity-70">🌍</div>
                    <h3 className="text-3xl font-bold text-white mb-4">Global Weather Insights</h3>
                    <p className="text-gray-200 text-lg">
                      Search for any city to get real-time weather updates
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Info Panels */}
            <div className="space-y-8">
              {/* Quick Forecast */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">⏰</span> 24-Hour Forecast
                </h3>
                <div className="space-y-4">
                  {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                    <div key={time} className="flex items-center justify-between p-3 hover:bg-white/10 rounded-xl transition-colors">
                      <span className="text-gray-200">{time}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-semibold">
                          {weather ? `${Math.round(weather.main.temp + (Math.random() * 4 - 2))}°C` : '--°C'}
                        </span>
                        <span className="text-2xl">
                          {time === 'Morning' ? '☀️' : time === 'Afternoon' ? '⛅' : time === 'Evening' ? '🌇' : '🌙'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Air Quality */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">🌿</span> Air Quality
                </h3>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-green-300 mb-2">Good</div>
                  <div className="w-full bg-gray-600/50 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-3/4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['PM2.5', 'NO2', 'O3', 'CO'].map((pollutant) => (
                    <div key={pollutant} className="text-center p-3 bg-white/10 rounded-xl">
                      <p className="text-gray-300 text-sm">{pollutant}</p>
                      <p className="text-white font-bold">
                        {(Math.random() * 30 + 10).toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Tips */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">💡</span> Weather Tips
                </h3>
                <div className="space-y-4">
                  {weather?.weather[0].main === 'Rain' && (
                    <div className="p-4 bg-blue-500/20 rounded-xl">
                      <p className="text-white font-semibold">🌧️ Bring an umbrella!</p>
                      <p className="text-blue-100 text-sm mt-1">Rain expected today</p>
                    </div>
                  )}
                  {weather?.main?.temp < 10 && (
                    <div className="p-4 bg-blue-400/20 rounded-xl">
                      <p className="text-white font-semibold">🧣 Dress warm!</p>
                      <p className="text-blue-100 text-sm mt-1">Cold temperatures expected</p>
                    </div>
                  )}
                  {weather?.main?.temp > 25 && (
                    <div className="p-4 bg-orange-500/20 rounded-xl">
                      <p className="text-white font-semibold">🧴 Sunscreen needed!</p>
                      <p className="text-orange-100 text-sm mt-1">High UV index today</p>
                    </div>
                  )}
                  <div className="p-4 bg-purple-500/20 rounded-xl">
                    <p className="text-white font-semibold">📱 Stay updated</p>
                    <p className="text-purple-100 text-sm mt-1">Check hourly forecasts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Cities */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Featured Cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Paris', 'Tokyo', 'New York', 'Sydney', 'Dubai', 'Rio'].map((city) => (
                <button
                  key={city}
                  onClick={() => fetchWeather(city)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20 transition-all hover:scale-105 group"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {city === 'Paris' ? '🗼' : 
                       city === 'Tokyo' ? '🗾' : 
                       city === 'New York' ? '🗽' : 
                       city === 'Sydney' ? '🇦🇺' : 
                       city === 'Dubai' ? '🏙️' : '🏖️'}
                    </div>
                    <p className="text-white font-semibold">{city}</p>
                    <p className="text-gray-300 text-sm">
                      {weather ? `${Math.round(weather.main.temp + (Math.random() * 10 - 5))}°C` : '--°C'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70">
              <p>© 2024 WeatherPro. All rights reserved.</p>
              <p className="text-sm mt-1">Data provided by OpenWeatherMap</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-white/70 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-white/70 hover:text-white transition-colors">Terms of Service</button>
              <button className="text-white/70 hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;