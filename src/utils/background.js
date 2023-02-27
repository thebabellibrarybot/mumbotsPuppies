const { findUrlCharts } = require('./findTombsByDate');
const stringMap = require('../middleware/stringmap');
const { countEachValue } = require('../utils/mathutils');
const TombStatsModel = require('../models/backgroundModel');
const getUniqueValues = require('../utils/mathutils').getUniqueValues;
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

// params or state
const baseurl = 'https://www.themorgan.org/manuscripts/list';
const yearArray = Object.values(stringMap);

// mongoDB conn
const uri = 'mongodb+srv://babeluser:babelpassword@babelcluster.fogf4.mongodb.net/testII?retryWrites=true&w=majority' 
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('md conn')
})

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
                "numtombs": Object.keys(allTombsDict).length,
                "locationArray": uniqueLocations,
                "numTombsPerLocation": numTombsPerLocation,
                "typeArray": uniqueTypes,
                "numTombsPerType": numTombsPerType
            });

            resObj.save()
            .then(() => {
            console.log(resObj, 'Document saved');
            })
            .catch((err) => {
            console.error('Error saving document:', err);
            });
        }; 
    } catch (err) {
        console.log(err);
    };
}
//const i = runbackground().then(result => console.log(result, 'resII')).catch(error => console.error(error));
