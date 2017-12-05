var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hulton_hotels"
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hulton Hotel Management' });
});

module.exports = router;
