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

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];

    res.render('myaccount', { title: 'Hulton Hotel Management' });
});

module.exports = router;