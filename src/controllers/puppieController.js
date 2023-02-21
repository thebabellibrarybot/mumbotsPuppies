const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
	const page = await browser.newPage();
	await page.goto('http://ica.themorgan.org/manuscript/thumbs/77146');

    /*
    // get el by className
    const elements = await page.$$('col-xs-12 col-sm-2');
    // loop thru all handles
    for(const element of elements){
        // do something
        try {
            const singleEl = await page.evaluate(el => el.innterText, element)
            console.log(singleEl)
        } catch (err) {
nonod
        }
    }   
    */
    
	
	await browser.close();
})();