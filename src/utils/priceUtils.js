const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');


const baseUrl = 'https://sdbm.library.upenn.edu/?f%5Bsale_seller%5D%5B%5D=Phillipps%2C+Thomas%2C+Sir%2C+1792-1872&per_page=10&q=medieval+manuscript&search_field=all_fields'

// get all tabel-body links
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function findUrls (url) {

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
async function findPageUrls (baseUrl) {
    try {
        //get urlArray
        const urlArray = await findUrls(baseUrl);
        if (urlArray) {
            console.log('got urlArray', urlArray)
        }

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
        resObj.push(hrefs)
        })
    
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
}

module.exports = { findUrls, findPageUrls };
//const it = findPageUrls(baseUrl).then(result => console.log(result, 'resIII')).catch(error => console.error(error));