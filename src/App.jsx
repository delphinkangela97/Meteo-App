import { useState, useEffect, useRef } from "react";
import axios from "axios";
import WeatherCard from "./Components/WeatherCard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { FaSun, FaCloudRain, FaSnowflake, FaCloud, FaBolt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("from-blue-500 to-purple-600");
  const [userLocation, setUserLocation] = useState(null); // Store user location
  const [locationError, setLocationError] = useState("");
  const hasAttemptedAutoLocation = useRef(false); // Prevent multiple attempts

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Function to define the background based on weather
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

  // Principal Function to manage weather per city name
  const fetchWeather = async (city) => {
    if (!city || city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    
    setLoading(true);
    setError("");
    setLocationError("");
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
      
      // Background Update following weather
      const bgClass = getWeatherBackground(response.data.weather[0].main);
      setBackgroundClass(bgClass);
      
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 404) {
        setError("City not found. Please check the name.");
      } else if (err.response?.status === 400) {
        setError("Invalid city name.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Check your connection.");
      } else {
        setError("Unable to fetch weather data.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Function for recovering weather by coordinated 
  const fetchWeatherByCoords = async (lat, lon, locationName = "Your Location") => {
    setLoading(true);
    setError("");
    setLocationError("");
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      
      //Add personalized location name
      const weatherData = {
        ...response.data,
        customLocation: locationName
      };
      
      setWeather(weatherData);
      setUserLocation({ lat, lon, name: locationName });
      
      // Update background
      const bgClass = getWeatherBackground(response.data.weather[0].main);
      setBackgroundClass(bgClass);
      
    } catch (err) {
      console.error("Error fetching by coordinates:", err);
      setError("Unable to get weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get Geographic location
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  // Function to get city name per opposite geoconding 
  const getCityNameFromCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      
      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        return location.name || "Your Location";
      }
      return "Your Location";
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return "Your Location";
    }
  };

  // Function to manage the geolocation
  const handleGeolocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position;
      
      // Get city name
      const cityName = await getCityNameFromCoords(latitude, longitude);
      
      // Fetch weather with coordonated
      await fetchWeatherByCoords(latitude, longitude, cityName);
      
    } catch (error) {
      console.error("Geolocation error:", error);
      setLoading(false);
      
      // Specific Error Messages 
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Location access denied. Please enable location services in your browser settings.");
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError("Location information unavailable. Please try again.");
          break;
        case error.TIMEOUT:
          setLocationError("Location request timed out. Please try again.");
          break;
        default:
          setLocationError("Unable to get your location. Please try again.");
          break;
      }
      
      // Fallback to Goma if it's first attempt
      if (!hasAttemptedAutoLocation.current) {
        fetchWeather("Goma");
      }
    }
  };

  // Automatic Geolocation on start
  useEffect(() => {
    if (!hasAttemptedAutoLocation.current) {
      hasAttemptedAutoLocation.current = true;
      handleGeolocation();
    }
  }, []);

  // Get weather icons based on location
  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase();
    if (cond?.includes("clear")) return <FaSun className="text-yellow-300" size={28} />;
    if (cond?.includes("rain")) return <FaCloudRain className="text-blue-300" size={28} />;
    if (cond?.includes("snow")) return <FaSnowflake className="text-blue-100" size={28} />;
    if (cond?.includes("thunderstorm")) return <FaBolt className="text-yellow-400" size={28} />;
    return <FaCloud className="text-gray-300" size={28} />;
  };

  // Function to refresh  current location
  const refreshLocation = () => {
    handleGeolocation();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} transition-all duration-1000`}>
      {/* Header with  handleGeolocation function*/}
      <Header fetchWeather={fetchWeather} onGeolocation={handleGeolocation} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Location Info Banner */}
          {userLocation && !loading && (
            <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-300 mr-3" size={20} />
                  <div>
                    <p className="text-white font-semibold">Current Location</p>
                    <p className="text-gray-300 text-sm">
                      {weather?.customLocation || weather?.name} 
                      {userLocation.lat && ` (${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)})`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={refreshLocation}
                  className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-xl text-white text-sm transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Location
                </button>
              </div>
            </div>
          )}
          
          {/* Location Error */}
          {locationError && (
            <div className="mb-6 bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-500/30">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-300 mr-3" />
                <div>
                  <p className="text-red-100">{locationError}</p>
                  <p className="text-red-200/70 text-sm mt-1">
                    Showing weather for Goma instead. You can search for any city or try enabling location services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !weather && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FaMapMarkerAlt className="text-white animate-pulse" size={32} />
                </div>
              </div>
              <p className="text-white mt-6 text-lg">Detecting your location...</p>
              <p className="text-gray-300 text-sm mt-2">Please allow location access for accurate weather</p>
            </div>
          )}
          
          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-red-100 text-center text-lg">{error}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={() => fetchWeather("London")}
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                >
                  Try London
                </button>
                <button
                  onClick={handleGeolocation}
                  className="px-6 py-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-xl text-white transition-colors flex items-center"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Try My Location
                </button>
              </div>
            </div>
          )}
          
          {/* Weather Display */}
          {weather && !loading && (
            <>
              {/* Stats Bar */}
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
              
              {/* Main Weather Card */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <WeatherCard weather={weather} />
              </div>
              
              {/* Location Actions */}
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={handleGeolocation}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Update My Location
                </button>
                <button
                  onClick={() => fetchWeather("Goma")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/20 transition-all"
                >
                  View Goma
                </button>
              </div>
            </>
          )}
          
          {/* Initial State - No data yet (should not appear with auto-location) */}
          {!weather && !loading && !error && !locationError && (
            <div className="text-center py-20">
              <div className="text-7xl mb-6 opacity-70">📍</div>
              <h3 className="text-3xl font-bold text-white mb-4">Getting Your Location</h3>
              <p className="text-gray-200 text-lg mb-8">
                Please allow location access to see your local weather
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleGeolocation}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl text-white font-semibold transition-all flex items-center"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Allow Location Access
                </button>
                <button
                  onClick={() => fetchWeather("London")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/20 transition-all"
                >
                  Skip & View Goma
                </button>
              </div>
            </div>
          )}
          
          {/* Popular Cities */}
          {weather && !loading && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Other Popular Cities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['KINSHASA', 'KIGALI', 'KAMPALA', 'NAIROBI', 'BUKAVU', 'MATADI'].map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchWeather(city)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20 transition-all hover:scale-105 group"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {city === 'KINSHASA' ? '🗼' : 
                         city === 'KIGALI' ? '🗾' : 
                         city === 'KAMPALA' ? '🗽' : 
                         city === 'NAIROBI' ? '' : 
                         city === 'BUKAVU' ? '🏙️' : '🏖️'}
                      </div>
                      <p className="text-white font-semibold">{city}</p>
                      <p className="text-gray-300 text-sm">Click to view</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;