const axios = require('axios');
const env = require('../config/env');
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${env.WEATHER_API_KEY}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCurrentWeather
};