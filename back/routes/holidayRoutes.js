const holidayController = require('../controller/holidayController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.get('/holidays', authMiddleware, holidayController.getHolidays);

module.exports = router;