const puppeteer = require('puppeteer');

async function fetchTitleHref(url, className, elType) {
    try {
        const myObj = {};
        const browser = await puppeteer.launch({
            //headless: false,
            //defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
    
        await page.goto(url);
    
        // get el by className and a.ref
        const aElements = await page.$$(className);
    
        for (const aElement of aElements) {
    
            // get text from original page
            const text = await aElement.evaluate(el => el.textContent, aElement);
            console.log(text, 'text');
            // get src from original page
            const href = await aElement.getProperty(elType);
            console.log(href.jsonValue(), 'href');

            myObj[text] = await href.jsonValue();
        }
        await browser.close();

        return myObj;
  } catch (err) {
    return err
  }
};

module.exports = fetchTitleHref;