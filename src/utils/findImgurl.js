

// CAN DELET THIS WHOLE ASS FILE NOW

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
  };
const className = '.col-sm-7.col-sm-push-3 img';
const classNameP = '.col-sm-7.col-sm-push-3 p';



async function findImgurl (url, className, classNameP) {

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

              console.log(url);
              
              // get the href text from all <a> elements on the page
              console.log(url, 'url')
              const hrefs = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('.panel-footer.text-center a'));
                return links.map(link => link.href);
              });
            
              console.log(hrefs, 'href');

            for (const url of urls) {
              await cluster.queue(url);
            }
          
            await cluster.idle();
            await cluster.close();
          })();

        } catch (err) {
            console.log(err, 'err');
            return err;
        }

};
findImgurl(data, className, classNameP);

module.exports = findImgurl;