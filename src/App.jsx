import { useState, useEffect, useCallback } from "react"
import { Sun, Moon, MapPin } from 'lucide-react'
import SearchForm from "./components/SearchForm"
import ForecastTable from "./components/ForecastTable"
import SearchHistory from "./components/SearchHistory"
import { fetchCurrentWeather, fetchForecast } from "./utils/api"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import "./App.css"

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [unit, setUnit] = useState("celsius")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const popularCities = [
    "London", "Paris", "New York", "Tokyo", "Sydney", "Jakarta", "Singapore",
    "Bangkok", "Dubai", "Rome", "Berlin", "Madrid", "Amsterdam", "Seoul", "Mumbai",
  ]

  const fetchWeatherData = useCallback(async (city) => {
    setIsLoading(true)
    setError(null)

    try {
      const currentData = await fetchCurrentWeather(city)
      setCurrentWeather(currentData)

      const forecastData = await fetchForecast(city)
      setForecast(forecastData)

      addToHistory(city)
    } catch (err) {
      console.error("Failed to fetch weather data:", err)
      setError("Failed to fetch weather data. Please check the city name and try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeatherData("Jakarta")
  }, [fetchWeatherData])

  const addToHistory = (city) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase())
      const newHistory = [city, ...filtered].slice(0, 8)
      return newHistory
    })
  }

  const handleSearch = (city) => {
    fetchWeatherData(city)
  }

  const handleCitySelect = (city) => {
    fetchWeatherData(city)
  }

  const handleUnitToggle = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"))
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  const getFilteredSuggestions = (input) => {
    if (input.length < 2) return []

    const combined = [...new Set([...searchHistory, ...popularCities])]
    return combined.filter((city) => city.toLowerCase().includes(input.toLowerCase())).slice(0, 6)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
          : "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 text-gray-900"
      }`}
    >
      <div className="w-full px-8 py-12">
        <header className="text-center mb-16 relative">
          <button
            onClick={toggleTheme}
            className={`absolute right-0 top-0 p-3 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800 hover:bg-slate-700 text-amber-400 shadow-lg"
                : "bg-white hover:bg-gray-100 text-slate-600 shadow-lg border border-slate-200"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <h1
            className={`text-6xl font-black mb-3 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Weather Dashboard
          </h1>
          <p className={`text-xl font-light ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Real-time weather for any location
          </p>
        </header>

        <div className="mb-12 max-w-4xl mx-auto">
          <SearchForm
            onSearch={handleSearch}
            suggestions={getFilteredSuggestions}
            onCitySelect={handleCitySelect}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div
            className={`mb-8 p-6 rounded-xl border max-w-4xl mx-auto ${
              isDarkMode ? "bg-red-900/20 border-red-700/30 text-red-200" : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        <div className="space-y-10">
          {currentWeather && (
            <div
              className={`rounded-2xl p-10 shadow-xl transition-all ${
                isDarkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-slate-200"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <MapPin size={28} className={isDarkMode ? "text-slate-400" : "text-slate-600"} />
                    <h2
                      className={`text-4xl font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {currentWeather.name}
                    </h2>
                  </div>
                  <p
                    className={`capitalize text-xl mb-8 font-light ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {currentWeather.weather[0]?.description}
                  </p>
                  <div
                    className={`text-7xl font-black mb-6 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {unit === "celsius"
                      ? Math.round(currentWeather.main.temp)
                      : Math.round((currentWeather.main.temp * 9) / 5 + 32)}
                    °
                  </div>
                  <button
                    onClick={handleUnitToggle}
                    className={`px-8 py-3 text-lg rounded-lg font-semibold transition-all ${
                      isDarkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-100"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                    }`}
                  >
                    Switch to °{unit === "celsius" ? "F" : "C"}
                  </button>
                </div>

                <div className="flex justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@4x.png`}
                    alt={currentWeather.weather[0]?.description}
                    className="w-56 h-56 drop-shadow-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode ? "bg-slate-700/50 border border-slate-600" : "bg-slate-100 border border-slate-300"
                    }`}
                  >
                    <p className={`text-base font-light mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Current Temp
                    </p>
                    <p
                      className={`text-3xl font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {unit === "celsius"
                        ? Math.round(currentWeather.main.feels_like)
                        : Math.round((currentWeather.main.feels_like * 9) / 5 + 32)}
                      °
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode ? "bg-slate-700/50 border border-slate-600" : "bg-slate-100 border border-slate-300"
                    }`}
                  >
                    <p className={`text-base font-light mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Humidity
                    </p>
                    <p
                      className={`text-3xl font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {currentWeather.main.humidity}%
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode ? "bg-slate-700/50 border border-slate-600" : "bg-slate-100 border border-slate-300"
                    }`}
                  >
                    <p className={`text-base font-light mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Wind Speed
                    </p>
                    <p
                      className={`text-3xl font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {currentWeather.wind.speed} m/s
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode ? "bg-slate-700/50 border border-slate-600" : "bg-slate-100 border border-slate-300"
                    }`}
                  >
                    <p className={`text-base font-light mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Pressure
                    </p>
                    <p
                      className={`text-3xl font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {currentWeather.main.pressure} hPa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            <div className="xl:col-span-3">
              <ForecastTable forecast={forecast} unit={unit} />
            </div>

            <div className="space-y-8">
              <SearchHistory
                history={searchHistory}
                onCityClick={handleCitySelect}
                onClearHistory={handleClearHistory}
              />

              <div
                className={`rounded-xl shadow-lg p-8 transition-all ${
                  isDarkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-slate-200"
                }`}
              >
                <h3
                  className={`text-xl font-black mb-6 flex items-center gap-3 ${
                    isDarkMode ? "text-slate-200" : "text-slate-800"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <MapPin size={24} /> Popular Cities
                </h3>
                <div className="space-y-3">
                  {popularCities.slice(0, 6).map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full p-4 rounded-lg text-left transition-all font-medium text-lg ${
                        isDarkMode
                          ? "bg-slate-700/50 hover:bg-slate-600/70 text-slate-100 hover:translate-x-2"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900 hover:translate-x-2"
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

        <footer
          className={`mt-16 text-center text-base font-light ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          <p>Weather data by OpenWeatherMap API</p>
          <p className="mt-2">© 2025 Weather Dashboard</p>
          <p>Abel Fortino 123140111</p>
        </footer>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App