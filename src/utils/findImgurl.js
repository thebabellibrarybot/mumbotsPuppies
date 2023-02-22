const { Cluster } = require('puppeteer-cluster');

// takes array of urls and preforms pupetter action on each
// returns url of lg_img and info about each image
const data = {
    "MS B.19 fol. 1r": "http://ica.themorgan.org/manuscript/page/1/77146",
    "MS B.19 fol. 25v": "http://ica.themorgan.org/manuscript/page/2/77146",
    "MS B.19 fol. 26v": "http://ica.themorgan.org/manuscript/page/3/77146",
    "MS B.19 fol. 28v": "http://ica.themorgan.org/manuscript/page/4/77146",
    "MS B.19 fol. 29r": "http://ica.themorgan.org/manuscript/page/5/77146",
    "MS B.19 fol. 29v": "http://ica.themorgan.org/manuscript/page/6/77146",
    "MS B.19 fol. 32v": "http://ica.themorgan.org/manuscript/page/7/77146",
    "MS B.19 fol. 46r": "http://ica.themorgan.org/manuscript/page/8/77146",
    "MS B.19 fol. 46v": "http://ica.themorgan.org/manuscript/page/9/77146",
    "MS B.19 fol. 53r": "http://ica.themorgan.org/manuscript/page/10/77146",
    "MS B.19 fol. 58r": "http://ica.themorgan.org/manuscript/page/11/77146",
    "MS B.19 fol. 73v": "http://ica.themorgan.org/manuscript/page/12/77146"
  }



async function findImgurl (url) {

    try {

        const urls = Object.values(url);
        console.log(urls);;

        (async () => {
            const cluster = await Cluster.launch({
              concurrency: Cluster.CONCURRENCY_CONTEXT,
              maxConcurrency: 2,
              puppeteerOptions: {
                headless: false,
                defaultViewport: false,
                userDataDir: "./tmp"
            }
            });
          
            await cluster.task(async ({ page, data: url }) => {
              await page.goto(url);
              const screen = await page.screenshot();
              // Store screenshot, do something else
            });
          
            await cluster.idle();
            await cluster.close();
          })();

        } catch (err) {
            console.log(err, 'err');
            return err;
        }

};
findImgurl(data);

module.exports = findImgurl;