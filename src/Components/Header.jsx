// src/components/Header.jsx
import React, { useState } from 'react';
import { FaSearch, FaHome, FaMapMarkerAlt, FaHistory, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ fetchWeather }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleQuickCity = (city) => {
    fetchWeather(city);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { icon: <FaHome />, label: 'Home', action: () => handleQuickCity('London') },
    { icon: <FaMapMarkerAlt />, label: 'Popular Cities', action: () => setIsMenuOpen(false) },
    { icon: <FaHistory />, label: 'History', action: () => setIsMenuOpen(false) },
    { icon: <FaCog />, label: 'Settings', action: () => setIsMenuOpen(false) },
  ];

  const popularCities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Dubai'];

  return (
    <header className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-lg shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="text-3xl">⛅</div>
              <div className="ml-2">
                <h1 className="text-xl font-bold text-white">Bwenge Tech</h1>
                <p className="text-xs text-blue-200">Real-time Forecast</p>
              </div>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city or zip code..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-sm transition-colors text-white"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleQuickCity('London')}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleQuickCity('Paris')}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Favorites
            </button>
            <div className="relative group">
              <button className="text-gray-200 hover:text-white transition-colors flex items-center">
                Quick Cities
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {popularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleQuickCity(city)}
                    className="w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/25">
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            {/* Quick Cities Grid */}
            <div className="mb-6">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">POPULAR CITIES</h3>
              <div className="grid grid-cols-3 gap-2">
                {popularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleQuickCity(city)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-3 text-white text-sm transition-all"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center w-full p-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Current Location Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-3 rounded-xl text-white font-semibold flex items-center justify-center transition-all">
              <FaMapMarkerAlt className="mr-2" />
              Use My Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;