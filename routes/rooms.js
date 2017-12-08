var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "hulton_hotels"
});

function loadReviews(reviewSQL, callback){
    con.query(reviewSQL, function (err, reviews) {
        if(err) throw err;
        callback(reviews);
    });
}

function getRoomReviews(result, req, callback){
    roomList = [];
    con.query(sql, function (err, result) {
        result.forEach(function(roomRecord, index){
            reviewSQL = "SELECT * FROM `Review-Writes` WHERE HotelId = " + req.params.id + " AND Room_no = " + roomRecord['Room_no'];
            loadReviews(reviewSQL, function(reviewList){
                roomRecord['Reviews'] = reviewList;
                roomList.push(roomRecord);
                if (result.length - 1 == index){
                    callback(roomList);
                }
            });
        });
    });
}
router.post('/rooms/breakfast/:id', function(req, res, next){
  var breakfastSQL = "SELECT * FROM Breakfast WHERE HotelID = " + req.params.id;
  con.connect(function(err) {
    con.query(breakfastSQL, function (err, breakfasts) {
        if(err) throw err;
        res.send(JSON.stringify(breakfasts));
    });
  });
});

router.post('/rooms/services/:id', function(req, res, next){
  var serviceSQL = "SELECT * FROM Service WHERE HotelID = " + req.params.id;
  con.connect(function(err) {
    con.query(serviceSQL, function (err, services) {
        if(err) throw err;
        res.send(JSON.stringify(services));
    });
  });
});

router.get('/:id', function(req, res, next) {
    var roomList = [];
    sql = "SELECT * FROM `Room-Has` WHERE HotelID = " + req.params.id; //yay mysql injection
    con.connect(function(err) {
        getRoomReviews(sql, req, function(roomList){
           console.log(JSON.stringify(req.session.user));
            res.render('rooms', { title: 'Hulton Hotel Management',
                                  user: JSON.stringify(req.session.user),
                                  roomListing: JSON.stringify(roomList)
                                });
        });
    });
});

module.exports = router;
