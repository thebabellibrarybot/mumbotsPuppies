const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
	const page = await browser.newPage();
	await page.goto('http://ica.themorgan.org/manuscript/thumbs/77146');

    
    // get el by className
    const elements = await page.$$('.col-xs-12.col-sm-2 a');
    // loop through all .col elements
    for (const element of elements) {
        // get title of each el
        const aElement = await element.$('a');

        // get text from original page
        const text = await element.evaluate(el => el.textContent, aElement);
        console.log(text);
        // get src from original page
        const src = await element.evaluate(el => el.src, aElement);
        console.log(src);

        // get title and url for large image
        const title = await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            aElement.click(),
        ]).then(()=> page.title());
        console.log(title, 'title')

        // double check nav
        if (page.url() === 'http://ica.themorgan.org/manuscript/thumbs/77146') {
            console.log(`Title: ${title}, URL: ${await href.jsonValue()}`);
        } else {
            console.log(`Page has navigated away from original URL, skipping...`);
        }

        await page.goBack();

        
    }
    
	
	await browser.close();
})();