var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hulton_hotels"
});

function checkLogedIn(req, res,next){
    console.log(console.log("req session = "+JSON.stringify(req.session.user)));
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

function checkIfStaff(acctType){
	console.log(acctType);
}

router.get('/', checkLogedIn, function(req, res, next) {
	if(req.session.user.account_type == 1){
		res.render('stats', { title: 'Hulton Hotel Management' });
	}
	else{
		var err = new Error("Access denied!");
		next(err);
	}
});

module.exports = router;