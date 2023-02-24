const { findUrlCharts } = require('./findTombsByDate');
const stringMap = require('../middleware/stringmap');
const { countEachValue } = require('../utils/mathutils');
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
            console.log(allTombsDict, 'atd')

            // get unique locations in dict
            const numTombsPerLocation = {};
            const uniqueLocations = getUniqueValues(allTombsDict, 'location');
            for (const uniqueLocation of uniqueLocations) {
                const numTombs = countEachValue(allTombsDict, 'location', uniqueLocation);
                numTombsPerLocation[uniqueLocation] = numTombs;
            };  
            
            // get array of types and num per types
            // [type: 45, type2: 39, type3: 1 ...]
            const numTombsPerType = {};
            const uniqueTypes = getUniqueValues(allTombsDict, 'type');
            for (const uniqueType of uniqueTypes) {
                const numTypes = countEachValue(allTombsDict, 'type', uniqueType);
                numTombsPerType[uniqueType] = numTypes;
            }

            // mk obj per year
            const resObj = {
                "year": year,
                "numTombs": Object.keys(allTombsDict).length,
                "locationArray": uniqueLocations,
                "numTombsPerLocation": numTombsPerLocation,
                "typeArray": uniqueTypes,
                "numTombsPerType": numTombsPerType
            };
            console.log(resObj, 'res obj')
            /*
            {
                "year": "year",
                "numTombsPerYear": "numTombs",
                "locationArray": ["locations"],
                "numTombsPerLocation": {"location": "numtombs"},
                "typesArray": ["types"],
                "numTombsPerType": {"type": "numtombs"}
                "" 
            }
            */

            // add to mongoDB

        }; 
    } catch (err) {
        console.log(err);
    };
}
const i = runbackground().then(result => console.log(result, 'resII')).catch(error => console.error(error));
