import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';
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

  useEffect(() => {
    fetchWeatherData('Jakarta');
  }, []);

  const fetchWeatherData = async (city) => {
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
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = (city) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      const newHistory = [city, ...filtered].slice(0, 10);
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
    ).slice(0, 5);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8 relative">
          <button
            onClick={toggleTheme}
            className={`absolute right-4 top-0 p-3 rounded-full transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <h1 className={`text-4xl font-bold mb-2 flex items-center justify-center gap-3 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <Cloud className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} size={40} />
            Weather Dashboard
          </h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Get real-time weather information for any city
          </p>
        </header>

        <SearchForm
          onSearch={handleSearch}
          suggestions={getFilteredSuggestions}
          onCitySelect={handleCitySelect}
          isLoading={isLoading}
        />

        {error && (
          <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-lg mb-6">
            ℹ️ {error}
          </div>
        )}



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CurrentWeather 
              data={currentWeather} 
              unit={unit} 
              onUnitToggle={handleUnitToggle}
            />
          </div>

          <div className="lg:col-span-1">
            <SearchHistory
              history={searchHistory}
              onCityClick={handleCitySelect}
              onClearHistory={handleClearHistory}
            />
          </div>

          <div className="lg:col-span-3">
            <ForecastTable forecast={forecast} unit={unit} />
          </div>
        </div>

        <footer className={`mt-12 text-center text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Weather data provided by OpenWeatherMap API</p>
          <p className="mt-1">© 2025 Weather Dashboard. All rights reserved.</p>
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
