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

function getCustomerData(email,callback){
    var query= "SELECT * FROM Customers WHERE Email = '"+email+"';";
    var cusData={};
    console.log("customer data query = "+query);
    con.connect(query,function(err,result) {
        console.log("customer data after query: " + JSON.stringify(result));
        cusData={name:result['Name'],address:result['Address'],phone:result['Phone_no'],email:result['Email']}

    });
    callback(cusData);
}

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];
    getCustomerData(req.session.user.email,function(cusData){
        res.render('myaccount', { title: 'Hulton Hotel Management',user:cusData});
    });
});

module.exports = router;
