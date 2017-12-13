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
        console.log("user log in error");
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

function getInvoiceData(cid,callback){
    var query = "SELECT * FROM `Reservation-Makes` WHERE CID="+ cid+";";
    var invoices = [];
    con.query(query, function(err,result){
        if (err) throw err;
        result.forEach(function (record) {
            //console.log("invoice record = "+JSON.stringify(record));
             var invoice = {
                invoice_num:record['InvoiceNo'],
                 res_date:record['ResDate'],
                 amt:record['TotalAmt'],
                 cid:record['CID'],
                 Cnumber:record['Cnumber']
            };
             invoices.push(invoice);
             console.log("invoices in getInvoiceData "+JSON.stringify(invoices));
        });
        callback(invoices);
    });

}

function getRoomsFromInvoice(invoice_num,callback){
    var query = "SELECT * FROM Reserves WHERE InvoiceNo = "+invoice_num+";";
    var rooms = [];
    con.query(query, function(err,result){
        if (err) throw err;
        result.forEach(function (record) {
           // console.log("room record = "+JSON.stringify(record));
            var room = {
                invoice_num:record['InvoiceNo'],
                hotelid:record['HotelID'],
                room_no:record['Room_no'],
                outDate:record['outDate'],
                inDate:record['inDate']
            };
            rooms.push(room);
    });
        callback(rooms);
});
}


function getServicesFromInvoiceNum(invoice_num,callback){
    var query = "SELECT * FROM Contains WHERE InvoiceNo = "+invoice_num+";";

    var services = [];

    con.query(query,function (err,result){
        if (err) throw err;
        result.forEach(function (record) {
           // console.log("service record = "+JSON.stringify(record));
            var service = {
                invoice_num:record['InvoiceNo'],
                hotelid:record['HotelID'],
                sType:record['sType']
            };
            services.push(service);
        });
    });
        callback(services);
}

function getBreakfastFromInvoice(invoice_num,callback){
    var query = "SELECT * FROM Includes WHERE InvoiceNo = "+invoice_num+";";
    console.log("entered getBreakfastFromInvoice()");
    var breakfasts = [];

    con.query(query,function (err,result){
        if (err) throw err;
        result.forEach(function (record) {
           // console.log("breakfast record = "+JSON.stringify(record));
            var breakfast = {
                invoice_num:record['InvoiceNo'],
                hotelid:record['HotelID'],
                bType:record['bType']
            };
            breakfasts.push(breakfast);
        });
    });
    callback(breakfasts);
}

function getCustomerData(email,callback){
    var query= "SELECT * FROM Customer WHERE Email = '"+email+"';";
    console.log("customer data query = "+query);
    var cusData= {
        name:"",
        address:"",
        phone:"",
        email:"",
        cc:[]
    };
    con.query(query,function(err,result) {
        if (err) throw err;
        var cid = result[0].CID;
        result.forEach(function(record,index){
            console.log("customer data after query: " + JSON.stringify(result));
            cusData.name=record['Name'];
            cusData.email=record['Email'];
            cusData.address=record['Address'];
            cusData.phone=record['Phone_no'];
            console.log("cus data making obj: "+JSON.stringify(cusData.cc));
        });
        var ccQuery = "SELECT Cnumber, ExpDate FROM creditcard WHERE CID="+cid+";";
        con.query(ccQuery, function(err,result){
            if(err) throw err;
            result.forEach(function(record,index){
                var card = {number: record['Cnumber'], date: record['ExpDate']};
                cusData.cc.push(card);
            });
            callback(cusData);
        })
    });
}

function aggragrateInvoiceData(cid,callback){
    var _invoices = [];
    console.log("entered aggregateInvoiceData");
    getInvoiceData(cid,function (invoices) {
        var reservations = [];
        _invoices=invoices;
        console.log("invoices initialized to: "+JSON.stringify(_invoices));

    _invoices.forEach(function(invoice){
        invoiceNum = invoice.invoice_num;
        getBreakfastFromInvoice(invoiceNum,function (breakfasts) {
            _breakfasts=breakfasts;
            //console.log("_breakfasts initialized to: "+JSON.stringify(_breakfasts));

        getServicesFromInvoiceNum(invoiceNum,function (services) {
            _services=services;
            //console.log("_services initialized to: "+ JSON.stringify(_services));

        getRoomsFromInvoice(invoiceNum, function (rooms) {
            _rooms=rooms;
           // console.log("_rooms initialized to: "+JSON.stringify(_rooms));

        var reservation = {
            invoice_num:invoice.invoice_num,
            res_date:invoice.res_date,
            amt:invoice.amt,
            cid:invoice.cid,
            Cnumber:invoice.Cnumber,
            rooms:rooms,
            services:services,
            breakfasts:breakfasts
        };
        reservations.push(reservation);
        //console.log("reservations in loop "+JSON.stringify(reservations));
        });
    });
    });
    });
        console.log("reservations before callback"+JSON.stringify(reservations));
        callback(reservations);
    });

}

function getCidFromEmail(email,callback){
    var query= "SELECT * FROM Customer WHERE Email = '"+email+"';";
    console.log("entered getCidFromEmail query= "+query);
    con.query(query,function(err,result){
        if (err) throw err;
        result.forEach(function(record){
            console.log("calling back cid: "+record['CID']);
            callback(record['CID']);
        });
    });

}

function checkCard(data, callback){
    var cardexists = 0;
    var query = "SELECT Cnumber FROM creditcard";
    con.query(query, function(err, result){
        if (err) throw err;
        if(result.length == 0) callback(cardexists);
        else{
            result.forEach(function(record, index){
                if(record['Cnumber']==data.number) cardexists = 1;
                if(result.length - 1 <= index) callback(cardexists); 
            });
        }
    });
}

function checkCardValidty(data, callback){
    //1 - valid
    //2 - empty field
    //3 - card exists
    //4 - exp date is in past
    valid = 1;
    var now = new Date();
    //now.setHours(0,0,0,0);
    console.log(now);
    console.log(data.expirationDate);
    if(Date.parse(data.expirationDate) < now) valid = 4;
    if(data.name==""||data.email==""||data.phone==""||data.email==""||data.password==""||data.confpassword==""||data.cardType=="") valid=2;
    checkCard(data, function(exists){
        if(exists) valid = 3;
        callback(valid);
    });
}

function update(field, newData, req, callback){
    var query;
    if(field != "Password") query = "UPDATE customer SET "+field+" = '"+newData+"' WHERE Email='"+req.session.user.email+"';";
    else query = "UPDATE users SET "+field+" = '"+newData+"' WHERE Email='"+req.session.user.email+"';";
    con.query(query, function(err, result){
        if(err) throw err;
        console.log("updated " + field);
    });
}

router.post('/editInfo', function(req, res, next){
    console.log(JSON.stringify(req.body));
    if(req.body.name == "" && req.body.phone == "" && req.body.address == "" && req.body.password == "") res.send("All fields are empty");
    if(req.body.name != ""){
        update("Name", req.body.name, req);
    }
    if(req.body.phone != ""){
         update("Phone_no", req.body.phone, req);       
    }
    if(req.body.address != ""){
        update("address", req.body.address, req);
    }
    if(req.body.password != ""){
        update("Password", req.body.password, req);
    }

    res.send("Account Information Updated");
})

router.post('/cc', function(req, res, next){
console.log(JSON.stringify(req.body));  
    checkCardValidty(req.body, function(valid){
        console.log(valid);
        if(valid == 1){
            var query = "SELECT CID FROM Customer WHERE Email='" + req.session.user.email + "';";
            var cid;
            con.query(query, function(err, result){
                if(err) throw err;
                console.log("got cid");
                cid = result[0].CID;
                var insQuery = "INSERT INTO CreditCard(Cnumber, BillingAddr, Name, SecCode, Type, ExpDate, CID) VALUES ("+req.body.number+",'"+req.body.address+"','"+req.body.name+"',"+req.body.code+",'"+req.body.cardType+"','"+req.body.expirationDate+"',"+cid+");";
                con.query(insQuery, function(err, result){
                    if(err) throw err;
                    console.log("inserted cc");
                    res.send("Card Added");
                });
            });
        }
        else if(valid == 2){
            res.send("Some fields empty");
        }
        else if(valid == 3){
            res.send("Credit Card already added");
        }
        else if(valid == 4){
            res.send("Credit Card is expired");
        }
    });
});

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];
                getCidFromEmail(req.session.user.email, function(cid){
                    aggragrateInvoiceData(cid,function(invoices){
                        getCustomerData(req.session.user.email,function(cusData){
                console.log("invoices before render: "+JSON.stringify(invoices));
                    res.render('myaccount', { title: 'Hulton Hotel Management', _user:JSON.stringify(cusData),_invoice:JSON.stringify(invoices)});
            });
        });
    });

});

router.use(function(err,req,res,next){
    console.error(err.stack);
    res.send("Uhh on, please log in first");
});

router.post("/review",function(req,res){
    console.log(JSON.stringify(req.body));
    var data = req.body;
    var stype = data["sType"]==="" ? "NULL" : data["sType"];
    var btype = data["bType"]==="" ? "NULL" : data["bType"];
    var room_no = data["Room_no"]==="" ? "NULL" : data["Room_no"];
   var sql = "INSERT INTO `Review-Writes` (Rating, TextComment, CID, sType, bType, Room_no, Hotelid, dateReviewed) VALUES ( " +
       data["Rating"]+",'"+data['TextComment']+"',"+ data["CID"]+",'" +stype+"','"+btype+"',"+room_no+","+data["Hotelid"]+",NOW());";
   console.log("sql review query= "+sql);
   con.query(sql,function(err, result){
       if (err) throw err;
        res.status(200);
    })

});

module.exports = router;
