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

router.get('/:id', function(req, res, next) {
    var roomList = [];
    sql = "SELECT * FROM `Room-Has` WHERE HotelID = " + req.params.id; //yay mysql injection

    con.connect(function(err) {
        getRoomReviews(sql, req, function(roomList){
			//create another callback for determining when rooms are booked
            res.render('rooms', { title: 'Hulton Hotel Management', roomListing: JSON.stringify(roomList)});
        });
    });
});

router.post('/reserve', function(req, res, next) {
    res.render('rooms', { title: 'Hulton Hotel Management');
});

module.exports = router;
