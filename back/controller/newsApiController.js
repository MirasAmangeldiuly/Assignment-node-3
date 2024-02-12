const response = require('../util/response');
const newsService = require('../services/newsService');
const getNews = async (req,res) => {
    try {
        console.log('query ' + req.query)
        const searchQuery = req.query.searchQuery === undefined ? 'bitcoin' : req.query.searchQuery;
        let currentDate = new Date();
        let previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - 1);
        const fromDate = req.query.fromDate === undefined ? previousDate : req.query.fromDate;
        const language = req.query.language === undefined ? 'en' : req.query.language;
        const pageNumber = req.query.pageNumber === undefined ? 1 : req.query.pageNumber;
        const pageSize = req.query.pageSize === undefined ? 10 : req.query.pageSize;
        const result = await newsService.getNews(searchQuery, fromDate, language, pageNumber, pageSize);
        res.status(200).json(response.success(result.slice((pageNumber -1) * pageSize, pageNumber * pageSize)));
    }
    catch (error) {
        res.status(200).json(response.error(error.message));
    }
}

module.exports = {
    getNews
}

