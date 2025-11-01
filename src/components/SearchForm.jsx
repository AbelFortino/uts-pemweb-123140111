import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SearchForm = ({ onSearch, suggestions, onCitySelect, isLoading }) => {
  const { isDarkMode } = useTheme();
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowSuggestions(false);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(value.length > 2);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    onCitySelect(suggestion);
    setShowSuggestions(false);
  };

  const currentSuggestions = showSuggestions ? suggestions(city) : [];

  return (
    <div className="relative mb-6">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            required
            minLength="2"
            maxLength="50"
            aria-label="City name"
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            disabled={isLoading}
          />
          <Search className={`absolute right-3 top-3.5 pointer-events-none transition-colors ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`} size={20} />

          {currentSuggestions.length > 0 && (
            <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-48 overflow-y-auto transition-colors ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600'
                : 'bg-white border-gray-300'
            }`}>
              {currentSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-2 text-left transition-colors block ${
                    isDarkMode
                      ? 'hover:bg-gray-700 text-white'
                      : 'hover:bg-blue-50 text-gray-900'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !city.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchForm;