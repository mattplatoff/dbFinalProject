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
    console.log(console.log("req session = "+JSON.stringify(req.session.user)));
    if(1){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

//ADD DATES/FIX QUERY
//highest rated room type
function hrrt(data, callback){
	var resp = "Highest Rated Room Types (Per Hotel):\n";
	var query = "SELECT R.HotelID, MAX(R.Rating) AS Rating FROM (SELECT HotelID, Type, AVG(Rating) AS Rating FROM `review-writes` JOIN `room-has` USING (Room_no, HotelID) GROUP BY HotelID, Type) AS R GROUP BY hotelID;"
	con.query(query, function(err, result)
	{
		if(result.length == 0) callback("No data");
		else{
			result.forEach(function(record, index){
                resp += record['HotelID'] + "\n";
                console.log(resp); 
                if(result.length - 1 <= index) callback(resp);
            });
		}
	});
}

router.get('/', checkLogedIn, function(req, res, next) {
	if(1){
		res.render('stats', { title: 'Hulton Hotels Statistics' });
	}
	else{
		var err = new Error("Access denied!");
		next(err);
	}
});

router.post('/hrrt', function(req, res, next) {
	console.log("test");
	if(req.body.dateStart=="" || req.body.dateEnd=="")
	{
		res.send("No Dates Input");
	}
	else{
		hrrt(req.body, function(results){
			res.send(results);
		});
	}
});

router.post('/fbc', function(req, res, next) {
	console.log("test");
});

router.post('/hrbt', function(req, res, next) {
	console.log("test");
});

router.post('/hrst', function(req, res, next) {
	console.log("test");
});

module.exports = router;