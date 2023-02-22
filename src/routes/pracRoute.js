const { getTitleHref, getImgurl } = require('../controllers/pup2');


router.get('/', getTitleHref);

router.get('/findurl', getImgurl);