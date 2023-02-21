const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
	const page = await browser.newPage();
	await page.goto('https://www.freecodecamp.org/');

    // get el by className
    const elements = await page.$$('className');
    // loop thru all handles
    for(const element of elements){
        // do something
        try {
            const singleEl = await page.evaluate(el => el.innterText, element)
            console.log(singleEl)
        } catch (err) {

        }
    }   
    
	
	await browser.close();
})();