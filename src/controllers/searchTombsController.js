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

// get num tombs by value['location' or 'type']
const getNumTombsByValue = async (req, res) => {

    console.log('getNumTombsFired')
    const year = req.headers.year;
    const value = req.headers.value;
    const query = {
        "year": year
    }
    const foundData = await TombStatsModel.findOne(query)
    if (foundData) {
        if (value === 'location') {
            res.status(200).json(foundData.numTombsPerLocation)
        };
        if (value === 'type') {
            res.status(200).json(foundData.numTombsPerType)
        };
    };

};

module.exports = { getDateStats, getNumTombsByValue };