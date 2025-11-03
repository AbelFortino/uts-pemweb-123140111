import { History, Trash2 } from 'lucide-react'
import { useTheme } from "../contexts/ThemeContext"

const SearchHistory = ({ history, onCityClick, onClearHistory }) => {
  const { isDarkMode } = useTheme()
  if (history.length === 0) return null

  return (
    <div className={`rounded-xl shadow-lg p-6 transition-all ${
      isDarkMode
        ? "bg-slate-800/50 border border-slate-700 text-white"
        : "bg-white border border-slate-200 text-gray-900"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-black flex items-center gap-2 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
          <History size={20} />
          Search History
        </h3>
        <button
          onClick={onClearHistory}
          className={`flex items-center gap-1 text-sm font-semibold transition-all ${
            isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-700"
          }`}
          aria-label="Clear search history">
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onCityClick(city)}
            className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
              isDarkMode
                ? "bg-slate-700/60 text-slate-200 hover:bg-slate-600/80 border border-slate-600"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300"
            }`}>
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchHistory