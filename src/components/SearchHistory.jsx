import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SearchHistory = ({ history, onCityClick, onClearHistory }) => {
  const { isDarkMode } = useTheme();
  if (history.length === 0) return null;

  return (
    <div className={`rounded-xl shadow-lg p-4 transition-colors ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <History size={20} />
          Search History
        </h3>
        <button
          onClick={onClearHistory}
          className={`flex items-center gap-1 text-sm transition-colors ${
            isDarkMode
              ? 'text-red-400 hover:text-red-300'
              : 'text-red-500 hover:text-red-700'
          }`}
          aria-label="Clear search history"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onCityClick(city)}
            className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
              isDarkMode
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;