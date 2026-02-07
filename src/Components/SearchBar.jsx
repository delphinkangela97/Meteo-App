import { useState } from "react";

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-3 rounded-lg bg-white/90 text-gray-800 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;