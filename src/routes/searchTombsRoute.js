const express = require('express');
const router = express.Router(); 
const { getDateStats, getNumTombsByDate, getNumTombsByType, getNumTombsByValue } = require('../controllers/searchTombsController');

// get stats by date
router.get('/datestats', getDateStats);

// get num tombs by date
router.get('/numtombs', getNumTombsByValue);

module.exports = router; 