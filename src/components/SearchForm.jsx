import { useState } from "react"
import { Search } from 'lucide-react'
import { useTheme } from "../contexts/ThemeContext"

const SearchForm = ({ onSearch, suggestions, onCitySelect, isLoading }) => {
  const { isDarkMode } = useTheme()
  const [city, setCity] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city)
      setShowSuggestions(false)
    }
  }

  const handleCityChange = (e) => {
    const value = e.target.value
    setCity(value)
    setShowSuggestions(value.length > 2)
  }

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion)
    onCitySelect(suggestion)
    setShowSuggestions(false)
  }

  const currentSuggestions = showSuggestions ? suggestions(city) : []

  return (
    <div className="relative mb-8">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Search city"
            required
            minLength="2"
            maxLength="50"
            aria-label="City name"
            className={`w-full px-5 py-3 pr-10 border rounded-xl focus:ring-2 focus:outline-none transition-all font-medium ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-slate-600 focus:border-slate-600"
                : "border-slate-300 bg-white text-gray-900 placeholder-slate-400 focus:ring-slate-400 focus:border-slate-400"
            }`}
            disabled={isLoading}
          />
          <Search
            className={`absolute right-3 top-3.5 pointer-events-none transition-colors ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
            size={20}
          />

          {currentSuggestions.length > 0 && (
            <div className={`absolute z-10 w-full mt-2 border rounded-xl shadow-lg max-h-48 overflow-y-auto backdrop-blur-sm ${
              isDarkMode ? "bg-slate-800/95 border-slate-700" : "bg-white/95 border-slate-300"
            }`}>
              {currentSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-2 text-left transition-all block font-medium ${
                    isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-slate-100 text-gray-900"
                  }`}>
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
          className={`px-8 py-3 font-bold rounded-xl transition-all ${
            isDarkMode
              ? "bg-slate-700 hover:bg-slate-600 text-white disabled:bg-slate-800 disabled:cursor-not-allowed"
              : "bg-slate-300 hover:bg-slate-400 text-slate-900 disabled:bg-slate-200 disabled:cursor-not-allowed"
          }`}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  )
}

export default SearchForm