const Weather = ({ weather, capital }) => {
  const kelvinToCelsius = (kelvin) => kelvin - 273.15;

  const temp = kelvinToCelsius(weather.main.temp);
  const windSpeed = weather.wind.speed;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const alt = weather.weather[0].description;

  return (
    <>
      <h3>Weather in {capital}</h3>
      <div className="weather">
        <span>Temperature: {temp.toFixed(2)} Celsius</span>
        <img src={iconUrl} alt={alt} />
        <span>Wind: {windSpeed} m/s</span>
      </div>
    </>
  );
};

export default Weather;
