const { findChartUrls, getPageData, formatDataArray, clickThruChart } = require ('./priceUtils');
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const TombPriceModel = require('../models/priceModel');



// params or state
const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'
const domEl = 'a[rel="next"]';
const hrefDiv = '.panel-footer.text-center a';

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
async function runPriceBackground(baseUrl, domEl, hrefDiv) {

    // get an array of all pages in baseUrl's chart
    try {

        // gets array of all chart pages
        const url = await clickThruChart(baseUrl, domEl)

        if (url) {
            try {

                // gets flat array of all hrefs on all pages
                const urlArray = await findChartUrls(url, hrefDiv);

                if (urlArray) {

                    // initiate scrap urlArray for all data objs
                    // returns array of data objs
                    const resie = await getPageData(urlArray)

                    if (resie) {
                        try {

                            const finData = await formatDataArray(resie)

                            return finData;

                        } catch (err) {
                            console.log(err, 'err')
                        }
                    }

                    // upload each resArray obj to mongoDB

                }

            } catch (err) {
                console.log('err with findPageUrls', err);
            }
        }
    } catch (err) {
        console.log('err with findCharUrls', err)
    };

}

const i = runPriceBackground(baseUrl, domEl, hrefDiv).then(result => console.log(result, 'resIII')).catch(error => console.error(error));