var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "hulton_hotels"
});

//REGION CALLBACKS

function getServiceReviews(services, callback){
    var serviceList = [];
    services.forEach(function(service, index){
        var sql = "SELECT * FROM `Review-Writes` WHERE HotelID = " + service['HotelID'] + " AND sType = '" + service['sType'] + "'";
        con.query(sql, function (err, reviews) {
            service['Reviews'] = reviews;
            if(!reviews){
                service['Reviews'] = [];
            }
            serviceList.push(service);
            if (services.length - 1 == index){
                callback(serviceList);
            }
        });
    });
}

function getHotelServices(hotelList, callback){
    var hotelListing = [];
    hotelList.forEach(function(hotelRecord, index){
        var sql = "SELECT * FROM Service WHERE HotelID = " + hotelRecord['HotelID'];
        con.query(sql, function (err, services) {
            getServiceReviews(services, function(serviceList){
                hotelRecord['Services'] = serviceList;
                hotelListing.push(hotelRecord);
                if (hotelList.length - 1 == index){
                    callback(hotelListing);
                }
            });
        });
    });
}

function getBreakfastReviews(breakfasts, callback){
    var breakfastList = [];
    breakfasts.forEach(function(breakfast, index){
        var sql = "SELECT * FROM `Review-Writes` WHERE HotelID = " + breakfast['HotelID'] + " AND bType = '" + breakfast['bType'] + "'";
        con.query(sql, function (err, reviews) {
            breakfast['Reviews'] = reviews;
            if(!reviews){
                breakfast['Reviews'] = [];
            }
            breakfastList.push(breakfast);
            if (breakfasts.length - 1 == index){
                callback(breakfastList);
            }
        });
    });
}

function getHotelBreakfasts(hotels, callback){
    var hotelListing = [];
    hotels.forEach(function(hotelRecord, index){
        var sql = "SELECT * FROM Breakfast WHERE HotelID = " + hotelRecord['HotelID'];
        con.query(sql, function (err, breakfasts) {
            getBreakfastReviews(breakfasts, function(breakfastList){
                hotelRecord['Breakfasts'] = breakfastList;
                hotelListing.push(hotelRecord);
                if (hotels.length - 1 == index){
                    callback(hotelListing);
                }
            });
        });
    });
}

//END REGION CALLBACKS

/* GET home page. */

router.get('/', function(req, res, next) {
    var hotelList = [];
    sql = "SELECT * FROM Hotel";
    con.connect(function(err) {
        con.query(sql, function(err, hotelList){
            getHotelServices(hotelList, function(hotels){
                getHotelBreakfasts(hotels, function(hotelList_){
                    res.render('hotels', { title: 'Hulton Hotel Management', hotelListing: JSON.stringify(hotelList_) });
                });
            });
        });
    });
});



module.exports = router;
