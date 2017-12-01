var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hotels', function(req, res, next) {
    res.render('hotels', { title: 'Hulton Hotel Management' });
});
module.exports = router;
