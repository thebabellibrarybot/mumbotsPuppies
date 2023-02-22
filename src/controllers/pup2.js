const fetchTitleHref = require('../utils/findTitleHres');
const { Cluster } = require('puppeteer-cluster');


// get dict with {titles: href links}
const getTitleHref = async (req, res) => {

  console.log('getTitleHref fired')

  const url = 'http://ica.themorgan.org/manuscript/thumbs/77146';
  const className = req.body.className;
  const elType = req.body.elType;
  console.log(className, elType)

  async function run(url, className, elType) {
    const data = await fetchTitleHref(url, className, elType);
    console.log(data, 'data');
    res.status(200).json(data);
  };
  run(url, className, elType); 

};


// takes url param
// returns dict with {titles: href links}
/*
async function fetchTitleHref(url, className, elType) {
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
        const aElements = await page.$$(className);
    
        for (const aElement of aElements) {
    
            // get text from original page
            const text = await aElement.evaluate(el => el.textContent, aElement);
            // get src from original page
            const href = await aElement.getProperty(elType);

            myObj[text] = href.jsonValue();
        }
        await browser.close();

        return myObj;
  } catch (err) {
    return err
  }
};
*/

// takes dic with fetchTitleHref dict
// returns dict with {titles: fullsizeImgUrl}
async function fetchHrefLargeImage(dict) {

};


// takes search param by year (i.e. 1300)
// returns array with urls


module.exports = getTitleHref, fetchHrefLargeImage;