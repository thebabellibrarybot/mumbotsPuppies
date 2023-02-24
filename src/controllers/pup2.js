const fetchTitleHref = require('../utils/findTitleHres');
const findImgurl = require('../utils/findImgurl');


// ******????******//// actually save for later this baddie mks good url lists


// get dict with {titles: href links}
const getTitleHref = async (req, res) => {

  console.log('getTitleHref fired')

  const url = 'http://ica.themorgan.org/manuscript/thumbs/77146';
  const className = req.body.className;
  const elType = req.body.elType;

  async function run(url, className, elType) {
    const data = await fetchTitleHref(url, className, elType);
    
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(401).json({
        err: 'err with fetchTitleHref',
        data: returnData
      })
    } 
    
    //res.status(200).json(data);
  };
  run(url, className, elType); 
};

// takes dic with fetchTitleHref dict
// returns dict with {titles: fullsizeImgUrl
const getImgurl = (req, res) => {
  console.log('getImgurl fired');
  const data = req.body.url;
  res.status(200).json({data: data});

};


module.exports = { getTitleHref, getImgurl };