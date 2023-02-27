const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');
const { strToNums, getValueByParam, strToYear } = require("./mathutils");

const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'


// get all tabel-body links
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function clickThruChart (url) {
 
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

            const nextButton = await page.$('a[rel="next"]');
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
async function findChartUrls (urlArray) {

    try {
        //get urlArray
        const urlArray = await findUrls(baseUrl);

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
            const links = Array.from(document.querySelectorAll('.panel-footer.text-center a'));
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

            const resItems = [];
            for (const tdText of tdTexts) {
                // date
                if (tdText[0] === 'Manuscript Dates') {
                    const date = {"date": strToNums(tdText[1])}
                    resItems.push(date)
                };
                // price
                if (tdText[0] === 'Price') {
                    const price = {"price": strToNums(tdText[1])}
                    resItems.push(price)
                };
                // location
                if (tdText[0] === 'Places') {
                    const place = {"location": tdText[1]}
                    resItems.push(place)
                };
                // type
                if (tdText[0] === 'Titles') {
                    const type = {"type": tdText[1].trim()};
                    resItems.push(type)
                }
                // sale date
                if (tdText[0] === 'Date Sold') {
                    const dateSold = {"sold": strToYear(tdText[1])};
                    resItems.push(dateSold);
                }
                // title 
                if (tdText[0] === 'Created') {
                    const title = {"title": tdText[1].trim()};
                    resItems.push(title);
                }
            };
            const obj = {"date": getValueByParam(resItems, 'date'),
                "price": getValueByParam(resItems, 'price'),
                "location": getValueByParam(resItems, 'location'),
                "type": getValueByParam(resItems, 'type'),
                "sold": getValueByParam(resItems, 'sold'),
                "title": getValueByParam(resItems, 'title')
                }
            //resObj[]
            resObj.push(obj)
        });
        // set-up cluster-que
        // load array of urls
        for (const url of urlArray) {
            await cluster.queue(url);
            }            
        await cluster.idle();
        await cluster.close();
        console.log(Object.keys(resObj).length, 'resObj Len')
        console.log(resObj, 'resObj')
        return resObj;
        
    } catch (err) {
        console.log(err); 
    }
};

module.exports = { clickThruChart, findChartUrls, getPageData };