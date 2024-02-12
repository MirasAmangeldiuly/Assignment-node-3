const env = require('../config/env');
const axios = require('axios');

const getHolidays = async (country) => {
    try {
        console.log(country)
        const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=2021&type=public_holiday`;
        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': env.HOLIDAY_API_KEY
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    getHolidays
};