const env = require('../config/env');
const axios = require('axios');
const getNews = async (searchQuery, fromDate, language, pageNumber, pageSize) => {
    try {
        const url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate.toISOString().slice(0,10)}&language=${language}&sortBy=publishedAt&apiKey=${env.NEWS_API_KEY}`;
        const response = await axios.get(url);
        return response.data.articles;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    getNews
}