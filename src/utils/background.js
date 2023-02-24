const { findUrlCharts } = require('./findTombsByDate');
const stringMap = require('../middleware/stringmap');
const { countEachValue } = require('../utils/mathutils');
const TombStatsModel = require('../models/backgroundModel');
const getUniqueValues = require('../utils/mathutils').getUniqueValues;

// params or state
const baseurl = 'https://www.themorgan.org/manuscripts/list';
const yearArray = Object.values(stringMap);

async function runbackground(){
    try { 
        for (const year of yearArray) {
            console.log(year)
        
            // get dict of year from find
            const allTombsDict = await findUrlCharts(year, baseurl);

            // get unique locations in dict
            // get numTombsPerLocation
            const numTombsPerLocation = {};
            const uniqueLocations = getUniqueValues(allTombsDict, 'location');
            for (const uniqueLocation of uniqueLocations) {
                const numTombs = countEachValue(allTombsDict, 'location', uniqueLocation);
                numTombsPerLocation[uniqueLocation] = numTombs;
            };  
            
            // get array of unique types
            // get numTombsPerType
            const numTombsPerType = {};
            const uniqueTypes = getUniqueValues(allTombsDict, 'type');
            for (const uniqueType of uniqueTypes) {
                const numTypes = countEachValue(allTombsDict, 'type', uniqueType);
                numTombsPerType[uniqueType] = numTypes;
            }

            // mk obj per year
            // add to mongoDB
            const resObj = await new TombStatsModel ({
                "year": year,
                "numTombs": Object.keys(allTombsDict).length,
                "locationArray": uniqueLocations,
                "numTombsPerLocation": numTombsPerLocation,
                "typeArray": uniqueTypes,
                "numTombsPerType": numTombsPerType
            });

            resObj.save()
            .then(() => {
            console.log('Document saved');
            })
            .catch((err) => {
            console.error('Error saving document:', err);
            });
        }; 
    } catch (err) {
        console.log(err);
    };
}
const i = runbackground().then(result => console.log(result, 'resII')).catch(error => console.error(error));
