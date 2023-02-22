const { getTitleHref, getImgurl } = require('../controllers/pup2');
const express = require('express');
const router = express.Router(); 

router.get('/findtitle', getTitleHref);

router.get('/findimgs', getImgurl);

module.exports = router; 