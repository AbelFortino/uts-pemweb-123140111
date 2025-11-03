import { Wind, Cloud } from 'lucide-react'
import WeatherIcon from "./WeatherIcon"
import { useTheme } from "../contexts/ThemeContext"

const HumidityDroplet = ({ humidity, isDarkMode }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="humidity-icon relative">
        <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-md">
          <defs>
            <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#06b6d4" : "#0891b2"} />
              <stop offset="100%" stopColor={isDarkMode ? "#14b8a6" : "#06d6d6"} />
            </linearGradient>
          </defs>
          <path d="M 20 4 Q 20 4 28 16 Q 32 22 32 28 Q 32 34 26 38 Q 20 42 14 38 Q 8 34 8 28 Q 8 22 12 16 Q 20 4 20 4 Z"
            fill="url(#dropletGradient)" strokeWidth="0" />
        </svg>
      </div>
      <span className="font-semibold text-lg">{humidity}%</span>
    </div>
  )
}

const CurrentWeather = ({ data, unit, onUnitToggle }) => {
  const { isDarkMode } = useTheme()
  if (!data) return null

  const { name, main, weather, wind } = data
  const temp = unit === "celsius" ? Math.round(main.temp) : Math.round((main.temp * 9) / 5 + 32)

  return (
    <div className={`rounded-2xl p-8 shadow-lg transition-all ${
      isDarkMode
        ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 text-white"
        : "bg-gradient-to-br from-teal-500/90 to-cyan-500/90 text-white border border-teal-300/30"
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className={`text-3xl font-black ${isDarkMode ? "text-cyan-300" : "text-white"}`}>{name}</h2>
          <p className={`capitalize text-lg font-light ${isDarkMode ? "text-slate-300" : "text-white/90"}`}>
            {weather[0]?.description}
          </p>
        </div>
        <button onClick={onUnitToggle} className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          isDarkMode ? "bg-slate-700/50 hover:bg-slate-600/50 text-cyan-300" : "bg-white/20 hover:bg-white/30 text-white"
        }`}>
          °{unit === "celsius" ? "C" : "F"} | °{unit === "celsius" ? "F" : "C"}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <WeatherIcon weatherMain={weather[0]?.main} size={80} />
          <div className={`text-6xl font-black ${isDarkMode ? "text-cyan-300" : "text-white"}`}>{temp}°</div>
        </div>

        <div className={`space-y-4 p-6 rounded-xl backdrop-blur-sm ${
          isDarkMode ? "bg-slate-700/40 border border-slate-600" : "bg-white/10 border border-white/20"
        }`}>
          <HumidityDroplet humidity={main.humidity} isDarkMode={isDarkMode} />
          <div className="flex items-center gap-2">
            <Wind size={20} />
            <span className="font-semibold">{wind.speed} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud size={20} />
            <span className="font-semibold">
              {unit === "celsius" ? Math.round(main.feels_like) : Math.round((main.feels_like * 9) / 5 + 32)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather