// App.jsx
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import video from "./video.mp4";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response && err.response.status === 400) {
        setError("Please enter a valid city name.");
      } else {
        setError("Unable to fetch weather data. Please try again later.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>
      
      {/* Overlay pour améliorer la lisibilité */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-1"></div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Carte météo avec effet glassmorphism */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* En-tête */}
          <div className="p-8 border-b border-white/10">
            <h1 className="text-4xl font-bold text-center text-white mb-2">
              Weather Forecast
            </h1>
            <p className="text-gray-300 text-center mb-6">
              Get real-time weather information for any city worldwide
            </p>
            
            {/* Barre de recherche */}
            <SearchBar fetchWeather={fetchWeather} />
            
            {/* Messages d'état */}
            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
                <p className="text-gray-300 mt-2">Fetching weather data...</p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-center">{error}</p>
              </div>
            )}
          </div>
          
          {/* Contenu météo */}
          <div className="p-8">
            {weather ? (
              <WeatherCard weather={weather} />
            ) : !loading && !error ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌤️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No City Selected
                </h3>
                <p className="text-gray-300">
                  Enter a city name above to get started
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {["New York", "London", "Tokyo"].map((city) => (
                    <button
                      key={city}
                      onClick={() => fetchWeather(city)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Pied de page */}
          <div className="p-4 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              Data provided by{" "}
              <a 
                href="https://openweathermap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                OpenWeatherMap
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;