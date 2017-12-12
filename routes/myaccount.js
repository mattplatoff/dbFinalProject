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
            console.log("invoice record = "+record);
             invoice = {
                invoice_num:record['InvoiceNo'],
                 res_date:record['ResDate'],
                 amt:record['TotalAmt'],
                 cid:record['CID'],
                 Cnumber:record['Cnumber']
            };
             invoices.push(invoice);
        });
    });
    callback(invoices);
}

function getRoomsFromInvoice(invoice_num,callback){
    var query = "SELECT * FROM Reserves WHERE InvoiceNo = "+invoice_num+";";
    var rooms = [];
    con.query(query, function(err,result){
        if (err) throw err;
        result.forEach(function (record) {
            console.log("room record = "+record);
            room = {
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
            console.log("service record = "+JSON.stringify(record));
            service = {
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
            console.log("breakfast record = "+JSON.stringify(record));
            breakfast = {
                invoice_num:record['InvoiceNo'],
                hotelid:record['HotelID'],
                bType:record['sType']
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

function aggragrateInvoiceData(cid,callback){
    var _invoices;
    var reservations =[];
    console.log("entered aggregateInvoiceData");
    getInvoiceData(cid,function (invoices) {
        _invoices=invoices;
        console.log("invoices initialized to: "+JSON.stringify(_invoices));
    });
    _invoices.forEach(function(invoice){

        var _breakfasts,_rooms,_services;
        invoiceNum = invoice.invoice_num;
        getBreakfastFromInvoice(invoiceNum,function (breakfasts) {
            _breakfasts=breakfasts;
            console.log("_breakfasts initialized to: "+JSON.stringify(_breakfasts));
        });
        getServicesFromInvoiceNum(invoiceNum,function (services) {
            _services=services;
            console.log("_services initialized to: "+ JSON.stringify(_services));
        });
        getRoomsFromInvoice(invoiceNum, function (rooms) {
            _rooms=rooms;
            console.log("_rooms initialized to: "+JSON.stringify(_rooms));
        });
        reservation = {
            invoice_num:invoice.invoice_num,
            res_date:invoice.res_date,
            amt:invoice.amt,
            cid:invoice.cid,
            Cnumber:invoice.Cnumber,
            rooms:_rooms,
            services:_services,
            breakfasts:_breakfasts
        };
        reservations.push(reservation);
    });
    callback(reservations);
}

function getCidFromEmail(email,callback){
    var query= "SELECT * FROM Customer WHERE Email = '"+email+"';";
    console.log("entered getCidFromEmail query= "+query);
    con.query(query,function(err,result){
        if (err) throw err;
        result.forEach(function(record){
            console.log("calling back cid: "+record['CID']);
            callback(record['CID']);
        })
    })

}

router.get('/', checkLogedIn, function(req, res, next) {
    var reservationlist = [];
            getCustomerData(req.session.user.email,function(cusData){
                getCidFromEmail(req.session.user.email, function(cid){
                aggragrateInvoiceData(cid,function(invoices){
                console.log("invoices before render: "+JSON.stringify(invoices));
                    res.render('myaccount', { title: 'Hulton Hotel Management', user:cusData,invoice:invoices});
            });
        });
    });

});

router.use(function(err,req,res,next){
    console.error(err.stack);
    res.send("Uhh on, please log in first");
});

module.exports = router;
