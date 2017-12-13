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
  res.render('index', { title: 'Hulton Hotel Management', _user: JSON.stringify(req.session.user)});
});

router.post('/index/signout', function(req, res, nexr){
	console.log("12wefwfsfvs");
  	req.session.destroy();
  	res.send("Signed out");
});

module.exports = router;
