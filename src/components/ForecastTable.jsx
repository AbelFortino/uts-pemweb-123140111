import { Wind } from 'lucide-react'
import { useTheme } from "../contexts/ThemeContext"

const ForecastTable = ({ forecast, unit }) => {
  const { isDarkMode } = useTheme()
  if (!forecast || forecast.length === 0) return null

  const getDailyForecasts = () => {
    const dailyData = {}

    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed,
        }
      }

      dailyData[date].temps.push(item.main.temp)
    })

    return Object.entries(dailyData)
      .slice(0, 5)
      .map(([date, data]) => {
        const avgTemp = data.temps.reduce((a, b) => a + b, 0) / data.temps.length
        const minTemp = Math.min(...data.temps)
        const maxTemp = Math.max(...data.temps)

        return {
          date,
          avgTemp,
          minTemp,
          maxTemp,
          weather: data.weather,
          humidity: data.humidity,
          wind: data.wind,
        }
      })
  }

  const dailyForecasts = getDailyForecasts()

  const convertTemp = (temp) => {
    return unit === "celsius" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32)
  }

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all ${
      isDarkMode
        ? "bg-slate-800/50 border border-slate-700 text-white"
        : "bg-white border border-slate-200 text-gray-900"
    }`}>
      <h3 className={`text-xl font-black p-4 border-b tracking-wide ${
        isDarkMode ? "bg-slate-700/50 border-slate-600 text-slate-100" : "bg-slate-100 border-slate-200 text-slate-900"
      }`}>
        5 Day Forecast
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={isDarkMode ? "bg-slate-700/30" : "bg-slate-50"}>
            <tr>
              <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Date
              </th>
              <th className={`px-4 py-3 text-center font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Weather
              </th>
              <th className={`px-4 py-3 text-center font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Temp (Min/Max)
              </th>
              <th className={`px-4 py-3 text-center font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Humidity
              </th>
              <th className={`px-4 py-3 text-center font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Wind Speed
              </th>
            </tr>
          </thead>
          <tbody className={isDarkMode ? "divide-slate-700" : "divide-slate-200"}>
            {dailyForecasts.map((day, index) => (
              <tr
                key={index}
                className={`transition-colors ${isDarkMode ? "hover:bg-slate-700/30" : "hover:bg-slate-50"}`}>
                <td className="px-4 py-3 font-medium">{day.date}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                      alt={day.weather.description}
                      className="w-12 h-12"
                    />
                    <span className={`text-xs capitalize ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {day.weather.description}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className={`font-semibold text-lg ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {convertTemp(day.avgTemp)}°
                  </div>
                  <div className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {convertTemp(day.minTemp)}° / {convertTemp(day.maxTemp)}°
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <defs>
                        <linearGradient id="dropletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={isDarkMode ? "#cbd5e1" : "#64748b"} />
                          <stop offset="100%" stopColor={isDarkMode ? "#94a3b8" : "#475569"} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 8 1 Q 8 1 11.5 6 Q 13 8 13 10 Q 13 12.5 10.5 14 Q 8 15.5 5.5 14 Q 3 12.5 3 10 Q 3 8 4.5 6 Q 8 1 8 1 Z"
                        fill="url(#dropletGrad)"
                      />
                    </svg>
                    {Math.round(day.humidity)}%
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 font-medium">
                    <Wind size={16} className={isDarkMode ? "text-slate-400" : "text-slate-500"} />
                    {day.wind.toFixed(1)} m/s
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ForecastTable