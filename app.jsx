import { useState, useEffect } from "react";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Coordinates for London (Latitude: 51.5074, Longitude: -0.1278)
    const latitude = 51.5074;
    const longitude = -0.1278;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "20px" }}>Loading weather...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Weather App</h1>
      {weather && (
        <div>
          <p><strong>Temperature:</strong> {weather.temperature} °C</p>
          <p><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
          <p><strong>Wind Direction:</strong> {weather.winddirection}°</p>
        </div>
      )}
    </div>
  );
}