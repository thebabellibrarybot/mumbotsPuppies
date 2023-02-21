const puppeteer = require('puppeteer');

// takes url param
// returns dict with {titles: href links}
async function fetchTitleHref(url) {
    try {

        const myObj = {};
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
    
        await page.goto(url);
    
        // get el by className and a.ref
        const aElements = await page.$$('.col-xs-12.col-sm-2 a');
    
        for (const aElement of aElements) {
    
            // get text from original page
            const text = await aElement.evaluate(el => el.textContent, aElement);
            // get src from original page
            const href = await aElement.getProperty('href');

            myObj[text] = href.jsonValue();
        }
        await browser.close();

        return myObj;
  } catch (err) {
    return err
  }
};

// takes dic with fetchTitleHref dict
// returns dict with {titles: fullsizeImgUrl}
async function fetchHrefLargeImage(dict) {

};

// takes search param by year (i.e. 1300)
// returns array with urls


module.exports = fetchTitleHref, fetchHrefLargeImage;