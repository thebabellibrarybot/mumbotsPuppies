const fetchTitleHref = require('../utils/findTitleHres');
const findImgurl = require('../utils/findImgurl');

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
    // mk returnData obj like:
    /*
    const returnData = {
      num_images: data.length,
      images: data
    }
    */
    res.status(200).json(data);
  };
  run(url, className, elType); 
};

// takes dic with fetchTitleHref dict
// returns dict with {titles: fullsizeImgUrl}
async function getImgurl(dict) {

  console.log('fetchHrefLargeImage fired')

};


// takes search param by year (i.e. 1300)
// returns array with urls


module.exports = getTitleHref, getImgurl;