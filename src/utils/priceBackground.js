const { findChartUrls, getPageData } = require ('./priceUtils');
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const TombPriceModel = require('../models/priceModel');
const { getUniqueValues, countEachValue } = require('./mathutils');

// params or state
const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'

// mongoDB conn
const uri = 'mongodb+srv://babeluser:babelpassword@babelcluster.fogf4.mongodb.net/testII?retryWrites=true&w=majority' 
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('md conn')
});

// takes urlArray
// returns array of json obj's
async function runPriceBackground(baseUrl) {

    // get an array of all pages in baseUrl's chart
    const url = await findChartUrls(baseUrl);

    // get an array of all tomb records
    const urlArray = await findPageUrls(baseUrl);

    try {
        //get urlArray
        if (urlArray) {
            console.log('got urlArray', urlArray)
        }

        // initiate scrap urlArray for all data objs
        // returns array of data objs
        const resie = await getPageDate(urlArray)
        console.log(resie)
               
        const yearArray = getUniqueValues(resie, 'date');
        
        for (const year of yearArray) {
            const byYear = data.filter(obj => obj.date === year);
            console.log(byYear, `all tombs form the year ${year}`)
            // get unique locations in dict
            // get numTombsPerLocation
            const numTombsPerLocation = {};
            const uniqueLocations = getUniqueValues(byYear, 'location');
            for (const uniqueLocation of uniqueLocations) {
                const numTombs = countEachValue(byYear, 'location', uniqueLocation);
                numTombsPerLocation[uniqueLocation] = numTombs;
            };  
            
            // get array of unique types
            // get numTombsPerType
            const numTombsPerType = {};
            const uniqueTypes = getUniqueValues(byYear, 'type');
            for (const uniqueType of uniqueTypes) {
                const numTypes = countEachValue(byYear, 'type', uniqueType);
                numTombsPerType[uniqueType] = numTypes;
            }

            // get avg price for the year
            // get avg price per location
            const avgPricePerYear = 100;
            const avgPricePerLocation = 100;
            for (const uniqueType of uniqueTypes) {
                //const avgPricePerLocation = avgEachValue(byYear, 'location', uniqueType)
            }

            const res = {
                "date": year,
                "numtombs": Object.keys(byYear).length,
                "uniqueLocations": uniqueLocations,
                "numTombsPerLocation": numTombsPerType,
                "uniqueTypes": uniqueTypes,
                "numTombsPerType": numTombsPerType,
                "avgPricePerYear": avgPricePerYear,
                "avgPricePerLocation": avgPricePerLocation
            }
            console.log(res, 'res per')
        }

        return true;
    } catch (err) {
        console.log(err); 
    }

}

const i = runPriceBackground(baseUrl).then(result => console.log(result, 'resIII')).catch(error => console.error(error));