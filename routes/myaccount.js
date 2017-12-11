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
    console.log("req session = "+JSON.stringify(req.session.user));
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
    var cusData= {
    name:"",
        address:"",
        phone:"",
        email:""

    };
    con.query(query,function(err,result) {
        if (err) throw err;
        result.forEach(function(record,index){
            console.log("customer data after query: " + JSON.stringify(result));
            cusData.name=record['Name'];
            cusData.email=record['Email'];
            cusData.address=record['Address'];
            cusData.phone=record['Phone_no'];
            console.log("cus data making obj: "+JSON.stringify(cusData));
            callback(cusData);
        });

    });

}

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];
    getCustomerData(req.session.user.email,function(cusData){
        res.render('myaccount', { title: 'Hulton Hotel Management', user:cusData});
    });
});

router.use(function(err,req,res,next){
    res.send("Uhh on, please log in first");
});

module.exports = router;
