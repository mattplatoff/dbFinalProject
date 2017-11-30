var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/reservations', function(req, res, next) {
    res.render('reservations', { title: 'Hulton Hotel Management' });
});

module.exports = router;
