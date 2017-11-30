var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/myaccount', function(req, res, next) {
    res.render('myaccount', { title: 'Hulton Hotel Management' });
});

module.exports = router;
