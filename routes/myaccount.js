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
    var query= "SELECT * FROM Customer WHERE Email = '"+email+"';";
    console.log("customer data query = "+query);
    con.query(query,function(err,result) {
        if (err) throw err;
        console.log("customer data after query: " + JSON.stringify(result));
       // var cusData={name:result['Name'], address:result['Address'],phone:result['Phone_no'],email:result['Email']};
        callback({name:result['Name'], address:result['Address'],phone:result['Phone_no'],email:result['Email']});
    });

}

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];
    console.log("email= "+req.session.user.email);
    getCustomerData(req.session.user.email,function(cusData){
        console.log("wtf is going on"+JSON.stringify(cusData));
        res.render('myaccount', { title: 'Hulton Hotel Management', user:cusData});
    });
});

module.exports = router;
