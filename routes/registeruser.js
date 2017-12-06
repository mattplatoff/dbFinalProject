var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "hulton_hotels"
});

function checkEmail(data, callback){
    var emailexists = 0;
    var query = "SELECT Email FROM Users"
    con.query(query, function(err, result){
        if (err) throw err;
        if(result.length == 0) callback(emailexists);
        else{
            result.forEach(function(record, index){
                if(record['Email']==data.email) emailexists = 1;
                if(emailexists || result.length - 1 <= index) callback(emailexists);
            });
        }
    });
}

function checkValidity(data, callback){
    //valid = 1
    //passwords don't match = 0
    //a field was empty = 2
    //email already exists in db = 3;
    var valid = 1;
    console.log("test");
    if(data.name==""||data.email==""||data.phone==""||data.email==""||data.password==""||data.confpassword=="") valid=2;
    checkEmail(data, function(exists){
        if(exists) valid = 3;
        callback(valid);
    });
}

function registerUser(data, callback){
    var query = "INSERT INTO Customer (Name, Address, Phone_no, Email, Password) VALUES ('"+data.name+"','"+data.address+"','"+data.phone+"','"+data.email+"','"+data.password+"');"
    //insert all users as type 1 users for now.
    var userquery = "INSERT INTO Users (Email, Password, account_type) VALUE ('"+data.email+"','"+data.password+"',1);";
   console.log("register user query="+userquery);
    checkValidity(data, function(valid){
        console.log("valid = "+valid);
        if(valid==1) {
            console.log("valid registration");
            con.query(query, function(err, rows){
                if (err) throw err;
                console.log("1 Record inserted");
            });
            con.query(userquery, function(err, rows){
                if (err) throw err;
                console.log("1 Record inserted");
            });
            callback();
        }
        else{
            callback(valid);
        }
    });
};

function checkLogedIn(req, res,next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

router.post('/', function(req, res, next) {
    registerUser(req.body, function(valid){
        res.render('index', {title: "Hulton Hotel Management",valid:valid});
    });
    console.log("registered user = " +JSON.stringify(req.body));
});

module.exports = router;
