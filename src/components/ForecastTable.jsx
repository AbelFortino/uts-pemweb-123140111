import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useTheme } from '../contexts/ThemeContext';

const ForecastTable = ({ forecast, unit }) => {
  const { isDarkMode } = useTheme();
  if (!forecast || forecast.length === 0) return null;

  const getDailyForecasts = () => {
    const dailyData = {};
    
    forecast.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed
        };
      }
      
      dailyData[date].temps.push(item.main.temp);
    });

    return Object.entries(dailyData).slice(0, 5).map(([date, data]) => {
      const avgTemp = data.temps.reduce((a, b) => a + b, 0) / data.temps.length;
      const minTemp = Math.min(...data.temps);
      const maxTemp = Math.max(...data.temps);
      
      return {
        date,
        avgTemp,
        minTemp,
        maxTemp,
        weather: data.weather,
        humidity: data.humidity,
        wind: data.wind
      };
    });
  };

  const dailyForecasts = getDailyForecasts();

  const convertTemp = (temp) => {
    return unit === 'celsius' 
      ? Math.round(temp) 
      : Math.round(temp * 9/5 + 32);
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-colors ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className={`text-xl font-bold p-4 border-b ${
        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
      }`}>5-Day Forecast</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-center font-semibold">Weather</th>
              <th className="px-4 py-3 text-center font-semibold">Temp (Min/Max)</th>
              <th className="px-4 py-3 text-center font-semibold">Humidity</th>
              <th className="px-4 py-3 text-center font-semibold">Wind Speed</th>
            </tr>
          </thead>
          <tbody className={isDarkMode ? 'divide-gray-600' : 'divide-gray-200'}>
            {dailyForecasts.map((day, index) => (
              <tr key={index} className={`transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <td className="px-4 py-3 font-medium">{day.date}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <WeatherIcon weatherMain={day.weather.main} size={32} />
                    <span className="text-xs capitalize">{day.weather.description}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="font-semibold">{convertTemp(day.avgTemp)}°</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {convertTemp(day.minTemp)}° / {convertTemp(day.maxTemp)}°
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Droplets size={16} className="text-blue-500" />
                    {Math.round(day.humidity)}%
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Wind size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    {day.wind.toFixed(1)} m/s
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForecastTable;