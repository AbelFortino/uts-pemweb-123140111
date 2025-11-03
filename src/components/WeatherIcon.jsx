import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning } from 'lucide-react';

const WeatherIcon = ({ weatherMain, iconCode, size = 48 }) => {
  if (iconCode) {
    return (
      <img 
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={weatherMain}
        style={{ width: size, height: size }}
      />
    );
  }

  const iconProps = { size, className: 'text-blue-500' };
  
  switch (weatherMain?.toLowerCase()) {
    case 'clear':
      return <Sun {...iconProps} className="text-yellow-500" />;
    case 'rain':
      return <CloudRain {...iconProps} />;
    case 'snow':
      return <CloudSnow {...iconProps} />;
    case 'drizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'thunderstorm':
      return <CloudLightning {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

export default WeatherIcon;
