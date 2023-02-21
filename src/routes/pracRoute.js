const fetchTitleHref = require('../controllers/pup2');


const url = 'http://ica.themorgan.org/manuscript/thumbs/77146';

async function run(url) {
    const data = await fetchTitleHref(url);
    console.log(data);
  }
run(url);