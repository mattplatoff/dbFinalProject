var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "hulton_hotels"
});

//REGION CALLBACKS
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

function checkValidity(data, callback){
	var match = 0;
	if(data.password==data.conf.confPassword) match=1;
	callback(match);
}

function registerUser(data, callback){
	var query = "INSERT INTO Customer (Name, Address, Phone_no, Email, Password) VALUES ('"+data.name+"','"+data.address+"',"+data.phone+",'"+data.email+"','"+data.password+"');"
	checkValidity(data, function(match){
		if(match) {con.query(query, function(err, rows){
			if (err) throw err;
			console.log("1 Record inserted");
			callback();
		});}
	});
};
//END REGION CALLBACKS

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hulton Hotel Management' });
});
router.get('/hotels', function(req, res, next) {
  var hotelList = [];
  sql = "SELECT * FROM Hotel";

  con.connect(function(err) {
    con.query(sql, function(err, hotelList){
      res.render('hotels', { title: 'Hulton Hotel Management', hotelListing: JSON.stringify(hotelList) });
  	});
  });
});

router.get('/rooms/:id', function(req, res, next) {
    var roomList = [];
    sql = "SELECT * FROM `Room-Has` WHERE HotelID = " + req.params.id; //yay mysql injection

    con.connect(function(err) {
      getRoomReviews(sql, req, function(roomList){
        res.render('rooms', { title: 'Hulton Hotel Management', roomListing: JSON.stringify(roomList)});
      });
    });
});

router.get('/myaccount', function(req, res, next) {
    res.render('myaccount', { title: 'Hulton Hotel Management' });
});

router.post('/registerUser', function(req, res, next) {
	registerUser(req.body, function(){
		res.render('index', {title: "Hulton Hotel Management"});
	});
});

module.exports = router;
