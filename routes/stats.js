var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "dbproj.cep2q1dc92rr.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "password",
  database: "hulton_hotels"
});

function checkLogedIn(req, res,next){
    console.log(console.log("req session = "+JSON.stringify(req.session.user)));
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

//highest rated room type
function hrrt(data, callback){
	var resp = "Highest Rated Room Types (Per Hotel):\n";
	var query = "SELECT R.HotelID, R.Type, MAX(R.Rating) AS Rating FROM (SELECT HotelID, Type, AVG(Rating) AS Rating FROM `review-writes` JOIN `room-has` USING (Room_no, HotelID) WHERE dateReviewed BETWEEN '"+data.dateStart.substring(0,10)+"' AND '"+data.dateEnd.substring(0,10)+"' GROUP BY HotelID, Type) AS R GROUP BY hotelID;"
	con.query(query, function(err, result)
	{
		if(result.length == 0) callback("No data");
		else{
			result.forEach(function(record, index){
                resp += "Hotel(ID): " + record['HotelID'] + " -- Room Type: " + record['Type'] + " -- Avg Rating: " + record['Rating'] + "\n";
                console.log(resp); 
                if(result.length - 1 <= index) callback(resp);
            });
		}
	});
}

//5 best customers
function fbc(data, callback){
	var resp = "5 Best Customers:\n";
	var query="SELECT C1.name FROM (SELECT CID, SUM(TotalAmt) FROM `reservation-makes` R WHERE R.ResDate BETWEEN '"+data.dateStart.substring(0,10)+"' AND '"+data.dateEnd.substring(0,10)+"' GROUP BY CID ORDER BY TotalAmt) AS C, customer C1 WHERE C.CID=C1.CID limit 5";
	con.query(query, function(err, result)
	{
		if(result.length == 0) callback("No data");
		else{
			result.forEach(function(record, index){
                resp += (index+1) + ". " + record['name'] + "\n";
                console.log(resp); 
                if(result.length - 1 <= index){
                	if(index < 4) resp += "(No other customers)";
                	callback(resp);
                }
            });
		}
	});
}

//highest rated breakfast type
function hrbt(data, callback){
	var resp = "Highest Rated Breakfast Type:\n";
	var query = "SELECT B.bType, B.HotelID FROM breakfast B JOIN `review-writes` R ON B.bType = R.bType AND B.HotelID=R.HotelID WHERE R.dateReviewed BETWEEN '"+data.dateStart.substring(0,10)+"' AND '"+data.dateEnd.substring(0,10)+"' AND R.Rating = (SELECT MAX(Rating) FROM `review-writes` WHERE bType IS NOT NULL);";
	con.query(query, function(err, result)
	{
		if(result.length == 0) callback("No data");
		else{
			result.forEach(function(record, index){
                resp += "Hotel(ID): " + record['HotelID'] + " -- Breakfast Type: " + record['bType'] + "\n";
                console.log(resp); 
                if(result.length - 1 <= index) callback(resp);
            });
		}
	});
}

//highest rated service type
function hrst(data, callback){
	var resp = "Highest Rated Service Type:\n";
	var query = "SELECT S.sType, S.HotelID FROM service S JOIN `review-writes` R ON S.sType = R.sType AND S.HotelID=R.HotelID WHERE R.dateReviewed BETWEEN '"+data.dateStart.substring(0,10)+"' AND '"+data.dateEnd.substring(0,10)+"' AND R.Rating = (SELECT MAX(Rating) FROM `review-writes` WHERE sType IS NOT NULL);";
	con.query(query, function(err, result)
	{
		if(result.length == 0) callback("No data");
		else{
			result.forEach(function(record, index){
                resp += "Hotel(ID): " + record['HotelID'] + " -- Service Type: " + record['sType'] + "\n";
                console.log(resp); 
                if(result.length - 1 <= index) callback(resp);
            });
		}
	});
}

router.get('/', checkLogedIn, function(req, res, next) {
	if(req.session.user.account_type == 1){
		res.render('stats', { title: 'Hulton Hotels Statistics' });
	}
	else{
		var err = new Error("Access denied!");
		next(err);
	}
});

router.post('/hrrt', function(req, res, next) {
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
	if(req.body.dateStart=="" || req.body.dateEnd=="")
	{
		res.send("No Dates Input");
	}
	else{
		fbc(req.body, function(results){
			res.send(results);
		});
	}
});

router.post('/hrbt', function(req, res, next) {
	if(req.body.dateStart=="" || req.body.dateEnd=="")
	{
		res.send("No Dates Input");
	}
	else{
		hrbt(req.body, function(results){
			res.send(results);
		});
	}
});

router.post('/hrst', function(req, res, next) {
	if(req.body.dateStart=="" || req.body.dateEnd=="")
	{
		res.send("No Dates Input");
	}
	else{
		hrst(req.body, function(results){
			res.send(results);
		});
	}
});

module.exports = router;