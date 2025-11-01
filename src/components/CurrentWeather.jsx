import React from 'react';
import { Droplets, Wind, Cloud } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useTheme } from '../contexts/ThemeContext';

const CurrentWeather = ({ data, unit, onUnitToggle }) => {
  const { isDarkMode } = useTheme();
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const temp = unit === 'celsius'
    ? Math.round(main.temp)
    : Math.round(main.temp * 9/5 + 32);

  return (
    <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white'
        : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-blue-100 capitalize">{weather[0]?.description}</p>
        </div>
        <button
          onClick={onUnitToggle}
          className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          aria-label="Toggle temperature unit"
        >
          °{unit === 'celsius' ? 'C' : 'F'} | °{unit === 'celsius' ? 'F' : 'C'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <WeatherIcon weatherMain={weather[0]?.main} size={64} />
          <div className="text-6xl font-bold">{temp}°</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets size={20} />
            <span>Humidity: {main.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={20} />
            <span>Wind: {wind.speed} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud size={20} />
            <span>Feels like: {unit === 'celsius' 
              ? Math.round(main.feels_like) 
              : Math.round(main.feels_like * 9/5 + 32)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;