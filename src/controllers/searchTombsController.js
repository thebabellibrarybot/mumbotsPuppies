const TombStatsModel = require('../models/backgroundModel');

// get stats by date
const getDateStats = async (req, res) => {

    const year = req.headers.year;
    console.log(year, 'year');
    const query = {
        "year": year
    }

    const foundData = await TombStatsModel.findOne(query)
    if (foundData) {
        console.log(foundData, 'foundData');
        res.status(200).json(foundData);
    }
    
};

// get num tombs by date 
const getNumTombsByDate = async (req, res) => {

    const year = req.headers.year;
    const query = {
        "year": year
    }
    const foundData = await TombStatsModel.findOne(query)
    if (foundData) {
        console.log(foundData, 'foundData');
        res.status(200).json(foundData.numTombsPerLocation);
    }

}

// get num tombs by type
const getNumTombsByType = async (req, res) => {

    const year = req.headers.year;
    const query = {
        "year": year
    }
    const foundData = await TombStatsModel.findOne(query)
    if (foundData) {
        console.log(foundData, 'foundData');
        res.status(200).json(foundData.numTombsPerType);
    };

};

module.exports = { getDateStats, getNumTombsByDate, getNumTombsByType };