const holidayService = require('../services/holidayService');
const response = require('../util/response');

const getHolidays = async (req, res) => {
    try{
        const country = req.query.country;
        const holidays = await holidayService.getHolidays(country);
        res.status(200).json(response.success(holidays));
    }
    catch (error){
        res.status(200).json(response.error(error));
    }
}

module.exports = {
    getHolidays
}