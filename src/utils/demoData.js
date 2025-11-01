export const getDemoWeatherData = (city) => ({
  name: city,
  main: {
    temp: 28,
    feels_like: 30,
    humidity: 75
  },
  weather: [{
    main: 'Rain',
    description: 'light rain'
  }],
  wind: {
    speed: 3.5
  }
});

export const getDemoForecast = () => {
  const forecast = [];
  const weatherTypes = ['Clear', 'Clouds', 'Rain'];
  
  for (let i = 0; i < 40; i++) {
    forecast.push({
      dt: Date.now() / 1000 + (i * 3 * 3600),
      main: {
        temp: 25 + Math.random() * 10,
        humidity: 65 + Math.random() * 20
      },
      weather: [{
        main: weatherTypes[Math.floor(Math.random() * 3)],
        description: 'scattered clouds'
      }],
      wind: {
        speed: 2 + Math.random() * 3
      }
    });
  }
  
  return forecast;
};