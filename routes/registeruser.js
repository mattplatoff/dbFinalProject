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
    var query = "SELECT Email FROM Customer"
    con.query(query, function(err, result){
        if (err) throw err;
        result.forEach(function(record, index){
            if(record['Email']==data.email) emailexists = 1;
            if(emailexists || result.length - 1 == index) callback(emailexists);
        });
    });
}

function checkValidity(data, callback){
    //valid = 1
    //passwords don't match = 0
    //a field was empty = 2
    //email already exists in db = 3;

    var valid = 1;
    if(data.name==""||data.email==""||data.phone==""||data.email==""||data.password==""||data.confpassword=="") valid=2;
    else if(data.password!=data.confpassword) valid=0;
    checkEmail(data, function(exists){
        if(exists) valid = 3;
        callback(valid);
    });
}

function registerUser(data, callback){
    var query = "INSERT INTO Customer (Name, Address, Phone_no, Email, Password) VALUES ('"+data.name+"','"+data.address+"','"+data.phone+"','"+data.email+"','"+data.password+"');"
    checkValidity(data, function(valid){
        if(valid==1) {
            con.query(query, function(err, rows){
                if (err) throw err;
                console.log("1 Record inserted");
                callback();
            });
        }
        else{
            //callback();
        }
    });
};


router.post('/', function(req, res, next) {
    registerUser(req.body, function(){
        res.render('index', {title: "Hulton Hotel Management"});
    });
});

module.exports = router;
