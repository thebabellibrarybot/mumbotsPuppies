const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');


const baseurl = 'https://www.themorgan.org/manuscripts/list';
const date = '12146';

// get all tbody link
// takes date and base url parameters (str, str)
// reutrns an array of all urls for each date
async function findUrls (date, url) {

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
        // open tomblist page set filter and apply filter
        await page.select('#edit-field-medieval-centuries-tid', date);
        await page.click('#edit-submit-collection');

        await page.waitForNavigation();

        // save page url and look for next button
        let currentPageUrl = page.url();
        urlArray.push(currentPageUrl);

        // click to next page and save url
        while (true) {

            const nextButton = await page.$('a[title="Go to next page"]');
            if (!nextButton) {
                break;
            }
            await nextButton.click();
            await page.waitForNavigation();
            currentPageUrl = page.url();
            urlArray.push(currentPageUrl);
          };

        await browser.close();

        return urlArray

    } catch (err) {
        console.log(err);
        return(err);
    }

};

/* CAN DELET FOR REF
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
*/

// takes array of urls
// returns data from chart in each url
async function findUrlCharts (date, url) {

    const urlArray = await findUrls(date, url);

    try {
        const resObj = {};
        // set up cluster to handle multiple links
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
            puppeteerOptions: {
                headless: false,
                defaultViewport: false,
                userDataDir: "./tmp"
            }
            });
        // start task-master: task = goto url and scrap data
        await cluster.task(async ({ page, data: url }) => {
            await page.goto(url);
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
            };
        });
        
        // load array of urls
        for (const url of urlArray) {
            await cluster.queue(url);
            }            
        await cluster.idle();
        await cluster.close();
        return resObj;
    } catch (err) {
        console.log(err, 'from findUrlCharts');
    };
};


  
//const i = findUrls(date, baseurl).then(result => console.log(result, 'res')).catch(error => console.error(error));
const urlss = [
    'https://www.themorgan.org/manuscripts/list?field_medieval_centuries_tid=12146&field_image_available_tid=All&field_ms_type_tid=All&field_country_taxonomy_tid=All&items_per_page=400',
    'https://www.themorgan.org/manuscripts/list?field_medieval_centuries_tid=12146&field_image_available_tid=All&field_ms_type_tid=All&field_country_taxonomy_tid=All&items_per_page=400&page=1'
  ];
findUrlCharts(date, baseurl).then(result => console.log(result, 'resII')).catch(error => console.error(error));