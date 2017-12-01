var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/rooms', function(req, res, next) {
    res.render('rooms', { title: 'Hulton Hotel Management' });
});
module.exports = router;
