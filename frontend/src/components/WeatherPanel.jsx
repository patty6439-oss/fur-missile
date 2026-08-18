import { useEffect, useState } from "react"; 
 
function WeatherPanel({ location }) { 
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(""); 
 
  useEffect(() => { 
    async function loadWeather() { 
      setError(""); 
      setWeather(null); 
 
      try { 
        const geoUrl = 
          "https://geocoding-api.open-meteo.com/v1/search" + 
          `?name=${encodeURIComponent(location)}` + 
          "&count=1&language=en&format=json"; 
 
        const geoResponse = await fetch(geoUrl); 
        if (!geoResponse.ok) throw new Error("Geocoding failed."); 
        const geoData = await geoResponse.json(); 
 
        if (!geoData.results?.length) { 
          setError("Location not found."); 
          return; 
        } 
 
        const { latitude, longitude, name } = geoData.results[0]; 
 
        const forecastUrl = 
          "https://api.open-meteo.com/v1/forecast" + 
          `?latitude=${latitude}` + 
          `&longitude=${longitude}` + 
          "&current=temperature_2m,precipitation,wind_speed_10m"; 
 
        const forecastResponse = await fetch(forecastUrl); 
        if (!forecastResponse.ok) throw new Error("Forecast failed."); 
        const forecastData = await forecastResponse.json(); 
 
        setWeather({ 
          locationName: name, 
          ...forecastData.current, 
        }); 
      } catch (err) { 
        console.error(err); 
        setError("Weather is unavailable."); 
      } 
    } 
 
    if (location) loadWeather(); 
  }, [location]); 
 
  return ( 
    <section> 
      <h2>Mission Weather</h2> 
      {!location && <p>Add a mission location to see weather.</p>} 
      {error && <p>{error}</p>} 
      {weather && ( 
        <> 
          <p>{weather.locationName}</p> 
          <p>Temperature: {weather.temperature_2m}°C</p> 
          <p>Precipitation: {weather.precipitation} mm</p> 
          <p>Wind: {weather.wind_speed_10m} km/h</p> 
        </> 
      )} 
    </section> 
  ); 
} 
 
export default WeatherPanel; 