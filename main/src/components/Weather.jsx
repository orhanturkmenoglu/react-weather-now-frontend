import { useEffect, useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import "../css/Weather.css";

// Hava durumuna göre ikon belirleme fonksiyonu
const getWeatherIcon = (description) => {
  if (!description) return <WiDaySunny />;
  const desc = description.toLowerCase();
  if (desc.includes("bulut")) return <WiCloud />;
  if (desc.includes("yağmur")) return <WiRain />;
  if (desc.includes("kar")) return <WiSnow />;
  if (desc.includes("fırtına")) return <WiThunderstorm />;
  return <WiDaySunny />;
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/weather/${city}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Şehir bulunamadı", err);
      setWeather(null);
    }
  };

  // `city` değiştiğinde otomatik olarak hava durumu al
  useEffect(() => {
    if (city) {
      // Şehir adı boş değilse veri çek
      getWeather(city);
    }
    setError(null);
  }, [city]);

  return (
    <div className="weather-container">
      <h2>Hava Durumu Uygulaması</h2>
      <input
        type="text"
        placeholder="Şehir adı giriniz"
        className="weather-input"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />

      {error && city && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].description)}
          </div>
          <p>Sıcaklık: {Math.round(weather.main.temp)}°C</p>
          <p>Hissedilen: {Math.round(weather.main.feels_like)}°C</p>
          <p>Hava: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
