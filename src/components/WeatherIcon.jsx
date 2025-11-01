import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle } from 'lucide-react';

const WeatherIcon = ({ weatherMain, size = 48 }) => {
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
    default:
      return <Cloud {...iconProps} />;
  }
};

export default WeatherIcon;