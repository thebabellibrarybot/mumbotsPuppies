const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');


const baseurl = 'https://www.themorgan.org/manuscripts/list';
const date = '12106';

// get all tbody link
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function findUrls (date, url) {

}

// takes date and base url parameters (str, str)
// returns an dict with all tombs listed under that date {"year": ["tomb_name": "href"]}
async function findAllTombsUrls (date, url) {

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
                console.log(text, 'text');
            }
        }

        // if next_page_button && all_tombs_scraped => click next_page_button()

        //end
        await browser.close();

    } catch (err) {
        console.log(err)
    }

};


  
findAllTombsUrls(date, baseurl).then(result => console.log(result, 'res')).catch(error => console.error(error));