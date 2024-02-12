const weatherService = require('../services/weatherService');
const response = require('../util/response');


const getCurrentWeather = async (req, res) => {
    try {
        const city = req.params.city;
        const result = await weatherService.getCurrentWeather(city);
        res.status(200).json(response.success(result));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}

module.exports = {
    getCurrentWeather
};