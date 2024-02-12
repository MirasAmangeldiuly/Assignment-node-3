import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    const fetchWeatherData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3000/weather/${city}`,
                {
                    headers: {
                        Authorization: `${cookies.token}`,
                    }
                });
            const data = await response.data;
            if (data.success) {
                setWeatherData(data.data);
            } else {
                console.error('Failed to fetch weather data:', data.message);
                navigate('/login');
            }
        } catch (error) {
            setError('Unable to fetch weather data');
        }
        setLoading(false);
    };

    return (
        <div className="weather-container">
            <h2>Weather App</h2>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>Get Weather</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h3>{weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}°F</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
