const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');


const baseurl = 'https://www.themorgan.org/manuscripts/list';
const date = '12146';

// get all tbody link
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function findUrls (date, url) {

    try {

        const urlArray = [];

        // start puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
        await page.goto(url);
        // open tomblist page set filter and apply filter
        await page.select('#edit-field-medieval-centuries-tid', date);
        await page.click('#edit-submit-collection');

        await page.waitForNavigation();

        // save page url and look for next button
        while (true) {
            // Get the URL of the current page
            const currentPageUrl = page.url();
            urlArray.push(currentPageUrl); // save the URL to the array
        
            // Check if a next button is present
            const links = await page.$$('a');
            const nextLink = await links.find(async link => {
                const title = await link.getProperty('title').then(prop => prop.jsonValue());
                return title;
            });
            console.log(nextLink, 'next link');
            if (!nextLink) {
                console.log('no next')
                break; // exit the loop if there is no next button
            };
            // click the next button and wait for the page to load
            if (nextLink) {
                await page.click(nextLink);
                await page.waitForNavigation();
            };
          };

        //console.log(urlArray);
        //await browser.close();


        return urlArray;

    } catch (err) {
        console.log(err);
        return(err);
    }

};

// takes date and base url parameters (str, str)
// returns an dict with all tombs listed under that date {"year": ["tomb_name": "href"]}
async function findAllTombsUrls (urlArray) {

    console.log(date, url, 'date and baseurl')

    try {
        // declaare return obj and focus args
        const resObj = {};

        // start puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
        await page.goto(url);

        // open tomblist page set filter and apply filter
        await page.select('#edit-field-medieval-centuries-tid', date);
        await page.click('#edit-submit-collection');

        await page.waitForNavigation();

        // scrape all tomb on page
        const rows = await page.$$('tbody tr');
        for (const row of rows) {
            const rowData = [];
            // Process each row here
            const cells = await row.$$('td');
            for (const cell of cells) {
                const text = await cell.evaluate(el => el.textContent);
                rowData.push(text);
            };
            resObj[rowData[0].trim()] = {"type": rowData[1].trim(), "location": rowData[2].trim(), "date": rowData[3].trim()}                
        }

        // if next_page_button && all_tombs_scraped => click next_page_button()

        //end
        await browser.close();

        return resObj;

    } catch (err) {
        console.log(err)
    }

};


  
findUrls(date, baseurl).then(result => console.log(result, 'res')).catch(error => console.error(error));