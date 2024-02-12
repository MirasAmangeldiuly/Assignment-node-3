const weatherController = require('../controller/weatherController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/weather/:city', authMiddleware, weatherController.getCurrentWeather);
module.exports = router;