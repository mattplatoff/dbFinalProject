var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "dbproj.cep2q1dc92rr.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "password",
    database: "hulton_hotels"
});

function checkEmail(data, callback){
    var emailexists = 0;
    var query = "SELECT Email FROM users";
    con.query(query, function(err, result){
        if (err) throw err;
        if(result.length == 0) callback(emailexists);
        else{
            result.forEach(function(record, index){
                if(record['Email']==data.email) emailexists = 1;
                if(result.length - 1 <= index) callback(emailexists);
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

function accountType(data, callback){
   var type = 0;
    var i = 0;
    for(;i < data.email.length; i++){
        if(data.email[i] == "@"){
            i++;
            break;
        }
    }
    console.log(i);
    if(data.email.substring(i) == 'hultonhotels.com') type = 1;
    callback(type)
}

function registerUser(data, callback){
    //insert all users as type 1 users for now.
    checkValidity(data, function(valid){
        accountType(data, function(type)
        {
            console.log("valid = "+valid);
            console.log("type = "+type);
            
            var query = "INSERT INTO customer (Name, Address, Phone_no, Email, Password) VALUES ('"+data.name+"','"+data.address+"','"+data.phone+"','"+data.email+"','"+data.password+"');"
            var userquery = "INSERT INTO users (Email, Password, account_type) VALUE ('"+data.email+"','"+data.password+"',"+type+");";
            console.log("register user query="+userquery);

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
                callback(valid);
            }
            else{
                callback(valid);
            }
        });
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
        console.log("valid= "+valid);
        if (valid===1){
        res.send("registration successful");}
        else if (valid === 2){
            res.send("a field was left empty");}
        else if (valid=== 3){
            res.send("email already exists in db");}
        else{
            res.send("error: valid code not recognized");}

    });
    console.log("registered user = " +JSON.stringify(req.body));
});

module.exports = router;
