const { resolve } = require("path");
const { toASCII } = require("punycode");
const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');
const { strToNums, strToYear, getUniqueValuesII, countEachValue } = require("./mathutils");

/*
const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'

const urlArray = [
    'https://sdbm.library.upenn.edu/entries/59663',
    'https://sdbm.library.upenn.edu/entries/51499',
    'https://sdbm.library.upenn.edu/entries/51498',
    'https://sdbm.library.upenn.edu/entries/51497',
    'https://sdbm.library.upenn.edu/entries/45823',
    'https://sdbm.library.upenn.edu/entries/45822',
    'https://sdbm.library.upenn.edu/entries/45719',
    'https://sdbm.library.upenn.edu/entries/45627',
    'https://sdbm.library.upenn.edu/entries/38571',
    'https://sdbm.library.upenn.edu/entries/35535',
    'https://sdbm.library.upenn.edu/entries/28394',
    'https://sdbm.library.upenn.edu/entries/28391',
    'https://sdbm.library.upenn.edu/entries/28389',
    'https://sdbm.library.upenn.edu/entries/28385',
    'https://sdbm.library.upenn.edu/entries/28382',
    'https://sdbm.library.upenn.edu/entries/28380',
    'https://sdbm.library.upenn.edu/entries/28371',
    'https://sdbm.library.upenn.edu/entries/28202',
    'https://sdbm.library.upenn.edu/entries/28201',
    'https://sdbm.library.upenn.edu/entries/28191',
    'https://sdbm.library.upenn.edu/entries/28189',
    'https://sdbm.library.upenn.edu/entries/28186',
    'https://sdbm.library.upenn.edu/entries/26962',
    'https://sdbm.library.upenn.edu/entries/26934',
    'https://sdbm.library.upenn.edu/entries/26650',
    'https://sdbm.library.upenn.edu/entries/24633',
    'https://sdbm.library.upenn.edu/entries/24624',
    'https://sdbm.library.upenn.edu/entries/24618',
    'https://sdbm.library.upenn.edu/entries/24610',
    'https://sdbm.library.upenn.edu/entries/24607',
    'https://sdbm.library.upenn.edu/entries/24606',
    'https://sdbm.library.upenn.edu/entries/21934',
    'https://sdbm.library.upenn.edu/entries/20934',
    'https://sdbm.library.upenn.edu/entries/20829',
    'https://sdbm.library.upenn.edu/entries/20823',
    'https://sdbm.library.upenn.edu/entries/20705',
    'https://sdbm.library.upenn.edu/entries/20686',
    'https://sdbm.library.upenn.edu/entries/20685',
    'https://sdbm.library.upenn.edu/entries/20684',
    'https://sdbm.library.upenn.edu/entries/20683',
    'https://sdbm.library.upenn.edu/entries/20682',
    'https://sdbm.library.upenn.edu/entries/20317',
    'https://sdbm.library.upenn.edu/entries/19752',
    'https://sdbm.library.upenn.edu/entries/19743',
    'https://sdbm.library.upenn.edu/entries/19739',
    'https://sdbm.library.upenn.edu/entries/19728',
    'https://sdbm.library.upenn.edu/entries/19723',
    'https://sdbm.library.upenn.edu/entries/19722',
    'https://sdbm.library.upenn.edu/entries/19719',
    'https://sdbm.library.upenn.edu/entries/19718',
    'https://sdbm.library.upenn.edu/entries/19091',
    'https://sdbm.library.upenn.edu/entries/19087',
    'https://sdbm.library.upenn.edu/entries/19086',
    'https://sdbm.library.upenn.edu/entries/19085',
    'https://sdbm.library.upenn.edu/entries/16311',
    'https://sdbm.library.upenn.edu/entries/14706',
    'https://sdbm.library.upenn.edu/entries/14704',
    'https://sdbm.library.upenn.edu/entries/14702',
    'https://sdbm.library.upenn.edu/entries/14691',
    'https://sdbm.library.upenn.edu/entries/14689',
    'https://sdbm.library.upenn.edu/entries/14683',
    'https://sdbm.library.upenn.edu/entries/14455',
    'https://sdbm.library.upenn.edu/entries/7906',
    'https://sdbm.library.upenn.edu/entries/3485',
    'https://sdbm.library.upenn.edu/entries/3484',
    'https://sdbm.library.upenn.edu/entries/3483',
    'https://sdbm.library.upenn.edu/entries/3482',
    'https://sdbm.library.upenn.edu/entries/3481',
    'https://sdbm.library.upenn.edu/entries/3480',
    'https://sdbm.library.upenn.edu/entries/3479',
    'https://sdbm.library.upenn.edu/entries/3478',
    'https://sdbm.library.upenn.edu/entries/3477',
    'https://sdbm.library.upenn.edu/entries/3476',
    'https://sdbm.library.upenn.edu/entries/3475',
    'https://sdbm.library.upenn.edu/entries/3474',
    'https://sdbm.library.upenn.edu/entries/3473',
    'https://sdbm.library.upenn.edu/entries/3472',
    'https://sdbm.library.upenn.edu/entries/3471',
    'https://sdbm.library.upenn.edu/entries/3470',
    'https://sdbm.library.upenn.edu/entries/3469',
    'https://sdbm.library.upenn.edu/entries/3458',
    'https://sdbm.library.upenn.edu/entries/3457',
    'https://sdbm.library.upenn.edu/entries/3456',
    'https://sdbm.library.upenn.edu/entries/3455',
    'https://sdbm.library.upenn.edu/entries/3454',
    'https://sdbm.library.upenn.edu/entries/3409',
    'https://sdbm.library.upenn.edu/entries/3408',
    'https://sdbm.library.upenn.edu/entries/3407',
    'https://sdbm.library.upenn.edu/entries/3406',
    'https://sdbm.library.upenn.edu/entries/3405',
    'https://sdbm.library.upenn.edu/entries/3468',
    'https://sdbm.library.upenn.edu/entries/3467',
    'https://sdbm.library.upenn.edu/entries/3466',
    'https://sdbm.library.upenn.edu/entries/3465',
    'https://sdbm.library.upenn.edu/entries/3464',
    'https://sdbm.library.upenn.edu/entries/3463',
    'https://sdbm.library.upenn.edu/entries/3462',
    'https://sdbm.library.upenn.edu/entries/3461',
    'https://sdbm.library.upenn.edu/entries/3460',
    'https://sdbm.library.upenn.edu/entries/3459'
]
const dataArray = [
    {
        soldDate: { soldDate: 1965 },
        price: { price: 3200 },
        type: { type: 'Ordinaciones de la Casa Real' },
        date: { date: 1400 },
        location: {
          location: 'Barcelona, Catalonia, Spain, Iberian Peninsula, Europe'
        }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 5000 },
        type: { type: 'Queste Del Sainte Graal & la Mort le Roi Artur' },
        date: { date: 1300 },
        location: { location: 'France, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 1700 },
        type: { type: 'Epistolae ex Ponto' },
        date: { date: 1300 },
        location: { location: 'Paris, France, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 1500 },
        type: { type: 'Lectionary' },
        date: { date: 1300 },
        location: {
          location: 'Bologna, Emilia-Romagna, Northern Italy, Italy, Europe'
        }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 8500 },
        type: { type: 'Roman de Garin le Loherain' },
        date: { date: 1300 },
        location: { location: 'France, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 1200 },
        type: { type: 'Life of Robert de Bethune' },
        date: { date: 1300 },
        location: {
          location: 'Llanthony Secunda Priory, Gloucester, England, Great Britain, United Kingdom, Europe'
        }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 1300 },
        type: {
          type: 'Specchio Della Croce  \n' +
            '                    Epistle  \n' +
            '                    Life of John  \n' +
            '                    Sermon on Death of John'
        },
        date: { date: 1400 },
        location: { location: 'Florence, Tuscany, Italy, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 2000 },
        type: { type: 'Turris Virtutum & Pomerium Fidelis Anime' },
        date: { date: 1300 },
        location: { location: 'Kempen, North Rhine-Westphalia, Germany, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 1400 },
        type: { type: 'Biblical Commentary' },
        date: { date: 1200 },
        location: { location: 'Kloster Rebdorf, Germany, Europe' }
      },
      {
        soldDate: { soldDate: 1965 },
        price: { price: 8000 },
        type: { type: 'Works, Musical' },
        date: { date: 1400 },
        location: { location: 'Paris, France, Europe' }
      }
]
*/

// get all tabel-body links
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function clickThruChart (url, domEl) {
 
    try {
        // return obj
        const urlArray = [];

        // start puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
        await page.goto(url);

        // save page url and look for next button
        let currentPageUrl = page.url();
        urlArray.push(currentPageUrl);

        // click to next page and save url
        while (true) {

            const nextButton = await page.$(domEl);
            const text = await page.evaluate(() => {
                const strongElements = document.querySelectorAll('.page_entries strong');
            
                const numbers = [];
            
                for (const strongElement of strongElements) {
                  const number = parseInt(strongElement.textContent);
                  if (!isNaN(number)) {
                    numbers.push(number);
                  }
                }
            
                return numbers;
              });
            const curPage = text[0];
            const maxPage = text[2];
            //console.log(curPage, maxPage)
            if (curPage >= maxPage) {
                break;
            }
            await nextButton.click();
            await page.waitForNavigation();
            currentPageUrl = page.url();
            //console.log('adding', currentPageUrl)
            urlArray.push(currentPageUrl);
          };

        await browser.close();

        return urlArray

    } catch (err) {
        console.log(err);
        return(err);
    }

};

// get all tomb links from each page
async function findChartUrls (urlArray, hrefDiv) {

    try {

        // initiate cluster and declare return obj
        const resObj = [];
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
            puppeteerOptions: {
              headless: false,
              defaultViewport: false,
              userDataDir: "./tmp"
          }
        });

        // cluster task-master
        await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        
        // do find by pg.eval and add to response array
        const hrefs = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll(hrefDiv));
            return links.map(link => link.href);
        });
        resObj.push(hrefs);
        })
    
        // set-up cluster-que
        // load array of urls
        for (const url of urlArray) {
            await cluster.queue(url);
            }            
        await cluster.idle();
        await cluster.close();
        return resObj.flat();
        
    } catch (err) {
        console.log(err); 
    }
};

// takes an array of urls
// returns a obj with year key and detail values i.e. {"price": 100, "date": 1400}
async function getPageData (urlArray) {
    // setup cluster
    try {
        const resObj = [];
        // initiate cluster and declare return obj
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
            puppeteerOptions: {
              headless: false,
              defaultViewport: false,
              userDataDir: "./tmp"
          }
        });

        // cluster task-master
        await cluster.task(async ({ page, data: url }) => {
            await page.goto(url);
            
            // do find by pg.eval and add to response array
            const tdTexts = await page.$$eval('tr', trs => {
                return trs.map(tr => {
                  const tds = Array.from(tr.querySelectorAll('td'));
                  return tds.map(td => td.textContent.trim());
                });
              });

            const resItems = {};
            for (const tdText of tdTexts) {
                // date
                if (tdText[0] === 'Manuscript Dates') {
                    const date = {"date": strToNums(tdText[1])}
                    resItems["date"] = date;
                };
                // price
                if (tdText[0] === 'Price') {
                    const price = {"price": strToNums(tdText[1])}
                    resItems["price"] = price;
                };
                // location
                if (tdText[0] === 'Places') {
                    const place = {"location": tdText[1]}
                    resItems["location"] = place
                };
                // type
                if (tdText[0] === 'Titles') {
                    const type = {"type": tdText[1].trim()};
                    resItems["type"] = type;
                }
                // sale date
                if (tdText[0] === 'Date Sold') {
                    const dateSold = {"soldDate": strToYear(tdText[1])};
                    resItems["soldDate"] = dateSold;
                }
            };
            resObj.push(resItems)
        });
        // set-up cluster-que
        // load array of urls
        for (const url of urlArray) {
            await cluster.queue(url);
            }            
        await cluster.idle();
        await cluster.close();
        return resObj;
        
    } catch (err) {
        console.log(err); 
    }
};

// takes array of data and formats it for mongoDB
async function formatDataArray (dataArray) {

    // decalre res obj
    const resMap = new Map();

    for (const obj of dataArray) {
    const date = obj["date"].date;
    
    
    if (resMap.has(date)) {
        // add value to existingObj
        const existingObj = resMap.get(date);
        existingObj.numtombs++;
        existingObj.location.push(obj["location"].location);
        existingObj.type.push(obj["type"].type);
        existingObj.price.push(obj["price"].price);
        existingObj.soldDate.push(obj["soldDate"].soldDate);

    } else {
        resMap.set(date, { 
            "date": date,
            "numtombs": 1,
            "location": [obj["location"].location],
            "price": [obj["price"].price],
            "type": [obj["type"].type],
            "soldDate": [obj["soldDate"].soldDate]
        });
    }
    }

    const resArr = Array.from(resMap.values());

    // compile meta-data
    for (const resObj of resArr) {
        // append meta-data for location
        const numTombsPerLocation = {};
        const uniqueLocations = getUniqueValuesII(resObj, 'location');
        for (const uniqueLocation of uniqueLocations) {
            const numTombs = countEachValue(resObj, 'location', uniqueLocation);
            numTombsPerLocation[uniqueLocation] = numTombs;
        };  
        resObj.numTombsPerLocation = numTombsPerLocation;
        resObj.uniqueLocations = uniqueLocations;
        // append meta-data for type
        // append meta-data for location
        const numTombsPerType = {};
        const uniqueTypes = getUniqueValuesII(resObj, 'type');
        for (const uniqueType of uniqueTypes) {
            const numTombs = countEachValue(resObj, 'type', uniqueType);
            numTombsPerType[uniqueType] = numTombs;
        };  
        resObj.numTombsPerType = numTombsPerType;
        resObj.uniqueTypes = uniqueTypes;
        // append meta-data for price
        const totalPrice = resObj.price.reduce((acc, curr) => acc + curr, 0);
        const avgPrice = Math.round(totalPrice / resObj.numtombs);
        resObj.avgPrice = avgPrice
    };
    return resArr[0];
}


//const i = formatDataArray(dataArray).then(result => console.log(result, 'resIII')).catch(error => console.error(error));

module.exports = { clickThruChart, findChartUrls, getPageData, formatDataArray };