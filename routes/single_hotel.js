var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/single_hotel', function(req, res, next) {
    res.render('single_hotel', { title: 'Hulton Hotel Management' });
});

module.exports = router;

