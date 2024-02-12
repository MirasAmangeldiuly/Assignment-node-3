const newsController = require('../controller/newsApiController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.get('/news', authMiddleware, newsController.getNews);

module.exports = router;