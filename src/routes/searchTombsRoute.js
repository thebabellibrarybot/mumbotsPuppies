const express = require('express');
const router = express.Router(); 
const { getDateStats, getNumTombsByDate, getNumTombsByType } = require('../controllers/searchTombsController');

// get stats by date
router.get('/datestats', getDateStats);

// get num tombs by date
router.get('/datenumtombs', getNumTombsByDate);

// get num by type
router.get('/typenumtombs', getNumTombsByType);

module.exports = router; 