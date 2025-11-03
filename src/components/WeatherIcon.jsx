import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning } from 'lucide-react'

const WeatherIcon = ({ weatherMain, iconCode, size = 48 }) => {
  if (iconCode) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={weatherMain}
        style={{ width: size, height: size }}
        className="drop-shadow-lg"
      />
    )
  }

  const iconProps = { size, className: "text-slate-400 drop-shadow-md" }

  switch (weatherMain?.toLowerCase()) {
    case "clear":
      return <Sun {...iconProps} className="text-amber-400 drop-shadow-md" />
    case "rain":
      return <CloudRain {...iconProps} />
    case "snow":
      return <CloudSnow {...iconProps} />
    case "drizzle":
      return <CloudDrizzle {...iconProps} />
    case "thunderstorm":
      return <CloudLightning {...iconProps} className="text-amber-600 drop-shadow-md" />
    default:
      return <Cloud {...iconProps} />
  }
}

export default WeatherIcon