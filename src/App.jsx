import React, { useState, useEffect, useCallback } from 'react';
import { Cloud, Sun, Moon, MapPin } from 'lucide-react';
import SearchForm from './components/SearchForm';
import CurrentWeather from './components/CurrentWeather';
import ForecastTable from './components/ForecastTable';
import SearchHistory from './components/SearchHistory';
import { fetchCurrentWeather, fetchForecast } from './utils/api';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [unit, setUnit] = useState('celsius');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const popularCities = [
    'London', 'Paris', 'New York', 'Tokyo', 'Sydney',
    'Jakarta', 'Singapore', 'Bangkok', 'Dubai', 'Rome',
    'Berlin', 'Madrid', 'Amsterdam', 'Seoul', 'Mumbai'
  ];

  const fetchWeatherData = useCallback(async (city) => {
    setIsLoading(true);
    setError(null);

    try {
      const currentData = await fetchCurrentWeather(city);
      setCurrentWeather(currentData);

      const forecastData = await fetchForecast(city);
      setForecast(forecastData);

      addToHistory(city);

    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData('Jakarta');
  }, [fetchWeatherData]);

  const addToHistory = (city) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      const newHistory = [city, ...filtered].slice(0, 8);
      return newHistory;
    });
  };

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  const handleCitySelect = (city) => {
    fetchWeatherData(city);
  };

  const handleUnitToggle = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const getFilteredSuggestions = (input) => {
    if (input.length < 2) return [];

    const combined = [...new Set([...searchHistory, ...popularCities])];
    return combined.filter(city =>
      city.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 6);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <button
            onClick={toggleTheme}
            className={`absolute right-4 top-2 p-3 rounded-full transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <h1 className={`text-4xl font-bold mb-3 flex items-center justify-center gap-3 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <Cloud className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} size={42} />
            Weather Dashboard
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover real-time weather insights for any location
          </p>
        </header>

        {/* Search Form */}
        <div className="mb-8">
          <SearchForm
            onSearch={handleSearch}
            suggestions={getFilteredSuggestions}
            onCitySelect={handleCitySelect}
            isLoading={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg border ${
            isDarkMode 
              ? 'bg-red-900/20 border-red-700 text-red-200' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            ⚠️ {error}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Current Weather - Enhanced Layout */}
          {currentWeather && (
            <div className={`rounded-2xl p-8 shadow-2xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Location and Basic Info */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <MapPin size={24} className="text-blue-200" />
                    <h2 className="text-3xl font-bold">{currentWeather.name}</h2>
                  </div>
                  <p className="text-blue-100 capitalize text-xl mb-6">
                    {currentWeather.weather[0]?.description}
                  </p>
                  <div className="text-7xl font-bold">
                    {unit === 'celsius' 
                      ? Math.round(currentWeather.main.temp) 
                      : Math.round(currentWeather.main.temp * 9/5 + 32)
                    }°
                  </div>
                  <button
                    onClick={handleUnitToggle}
                    className="mt-4 bg-white/20 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors font-semibold"
                  >
                    Switch to °{unit === 'celsius' ? 'F' : 'C'}
                  </button>
                </div>
                
                {/* Weather Icon */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <img 
                      src={`https://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@4x.png`}
                      alt={currentWeather.weather[0]?.description}
                      className="w-48 h-48 mx-auto -my-4"
                    />
                  </div>
                </div>
                
                {/* Weather Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Feels like:</span>
                    <span className="font-bold text-xl">
                      {unit === 'celsius' 
                        ? Math.round(currentWeather.main.feels_like) 
                        : Math.round(currentWeather.main.feels_like * 9/5 + 32)
                      }°
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Humidity:</span>
                    <span className="font-bold text-xl">{currentWeather.main.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Wind Speed:</span>
                    <span className="font-bold text-xl">{currentWeather.wind.speed} m/s</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-100">Pressure:</span>
                    <span className="font-bold text-xl">{currentWeather.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section - Forecast and History */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Forecast - Takes 3/4 width */}
            <div className="xl:col-span-3">
              <ForecastTable forecast={forecast} unit={unit} />
            </div>
            
            {/* Sidebar - History and Quick Cities */}
            <div className="space-y-6">
              <SearchHistory
                history={searchHistory}
                onCityClick={handleCitySelect}
                onClearHistory={handleClearHistory}
              />
              
              {/* Quick Cities Panel */}
              <div className={`rounded-2xl shadow-lg p-6 transition-colors ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Popular Cities
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {popularCities.slice(0, 6).map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 hover:translate-x-1'
                          : 'bg-blue-50 hover:bg-blue-100 hover:translate-x-1'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-12 text-center text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Weather data provided by OpenWeatherMap API</p>
          <p className="mt-1">© 2025 Weather Dashboard | Made by Abel Fortino 123140111</p>
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;