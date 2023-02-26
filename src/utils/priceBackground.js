const { findPageUrls } = require ('./priceUtils');
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const TombPriceModel = require('../models/priceModel');

// params or state
const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'

// mongoDB conn
const uri = 'mongodb+srv://babeluser:babelpassword@babelcluster.fogf4.mongodb.net/testII?retryWrites=true&w=majority' 
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('md conn')
})

async function runPriceBackground(baseUrl) {

    const urlArray = await findPageUrls(baseUrl)
    console.log(baseUrl)
    if (urlArray) {
        return urlArray;
    }
    // get desired info

    // upload to mongoDB
    const resObj = await new TombPriceModel ({
        "year": "yearvalue",
        "numtombs": "tval",
        "avgPrice": "ap",
        "priceByType": "pvt",
        "priceByLocation": "pbl",
        "locationArray": "la",
        "numTombsPerLocation": "npt", 
        "typeArray": "ta",
        "numTombsPerType": "d"
    });

}

const i = runPriceBackground(baseUrl).then(result => console.log(result, 'resII')).catch(error => console.error(error));