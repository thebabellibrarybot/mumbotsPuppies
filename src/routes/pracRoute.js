const { fetchTitleHref } = require('../controllers/pup2');


router.get('/', fetchTitleHref)

/*
const url = 'http://ica.themorgan.org/manuscript/thumbs/77146';
const className = '.col-xs-12.col-sm-2 a';
const elType = 'href';

async function run(url, className, elType) {
    const data = await fetchTitleHref(url, className, elType);
    console.log(data);
  };
run(url, className, elType); 
*/