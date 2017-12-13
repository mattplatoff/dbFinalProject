-- CREATE TABLE Customer(
--         CID int PRIMARY KEY AUTO_INCREMENT, Email varchar(50), Address varchar(50), Phone_no int,
--         Name varchar(30), Password varchar(25));

INSERT INTO Customer(CID, Email, Address, Phone_no, Name, Password) VALUES (var_CID, var_Email, var_Address, var_Phone_no, var_Name, var_Password);

INSERT INTO CreditCard(Cnumber, BillingAddr, Name, SecCode, Type, ExpDate, CID) VALUES (var_Cnumber, var_BillingAddr, var_Name, var_SecCode, var_Type, var_ExpDate, var_CID);

INSERT INTO `Review-Writes`(ReviewID, Rating, TextComment, CID, sType, bType, Room_no, HotelId) VALUES (var_ReviewID, var_Rating, var_TextComment, var_CID, var_sType, var_bType, var_Room_no, var_HotelId);

INSERT INTO `Reservation-Makes`(InvoiceNo, ResDate, TotalAmt, CID, Cnumber) VALUES (var_InvoiceNo, var_ResDate, var_TotalAmt, var_CID, var_Cnumber)

INSERT INTO Includes(InvoiceNo, HotelID, bType) VALUES (var_InvoiceNo, var_HotelID, var_bType);

INSERT INTO Contains(InvoiceNo, HotelID, sType) VALUES (var_InvoiceNo, var_HotelID, var_sType);

INSERT INTO Reserves(InvoiceNo, HotelID, Room_no, outDate, inDate) VALUES (var_InvoiceNo, var_HotelID, var_Room_no, var_outDate, var_inDate);

--For a given time period (begin date and end date) compute the highest rated
--room type for each hotel.

SELECT * R.HotelId
	From `Review-Writes` R
	WHERE R.sType=NULL AND R.bType=NULL and R.Rating= MAX(Rating)
	GROUP BY R.HotelId limit 3
	R.dateReviewed BETWEEN var_StartDate AND var_EndDate;

	--For a given time period (begin date and end date) compute the 5 best
	--customers (in terms of money spent in reservations).

SELECT C1.name
FROM (SELECT CID, SUM(TotalAmt) 
	 FROM `Reservation-Makes` R WHERE R.ResDate BETWEEN '2017-01-01' AND '2017-12-31' 
	 GROUP BY CID ORDER BY TotalAmt) AS C, Customer C1 WHERE C.CID=C1.CID limit 5

	--For a given time period (begin date and end date) compute the highest rated
	--breakfast type across all hotels.

SELECT B.bType
FROM Breakfast B INNER JOIN `Review-Writes` R 
ON B.bType = R.bType AND B.HotelID=R.HotelID
WHERE R.totalAmt = MAX(totalAmt) AND R.sType=NULL AND R.Room_no=NULL
R.dataReviewed BETWEEN var_StartDate AND var_EndDate;

--For a given time period (begin date and end date) compute the highest rated
--service type across all hotels

SELECT S.sType
FROM Service S INNER JOIN `Review-Writes` R 
ON S.sType = R.sType AND S.HotelID=R.HotelID
WHERE R.totalAmt = MAX(totalAmt) AND R.bType=NULL AND R.Room_no=NULL
R.dataReviewed BETWEEN var_StartDate AND var_EndDate;




	


-- <CREATE TABLE Breakfast(
--         HotelID int, bType varchar(30), Description varchar(30), bPrice int,
--         PRIMARY KEY (HotelID, bType),
--         FOREIGN KEY (HotelID) REFERENCES Hotel (HotelID));

-- CREATE TABLE `Review-Writes`(
--         ReviewID int PRIMARY KEY, Rating double, TextComment varchar(250), dateReviewed DATE,
--         CID int, sType varchar(30), bType varchar(30), Room_no int, HotelId int,
--         FOREIGN KEY (HotelId, sType) REFERENCES Service (HotelID, sType),
--         FOREIGN KEY (HotelId, bType) REFERENCES Breakfast (HotelID, bType),
--         FOREIGN KEY (Room_no, HotelId) REFERENCES `Room-Has` (Room_no, HotelID));

-- CREATE TABLE `Reservation-Makes`(
--         InvoiceNo int PRIMARY KEY, ResDate date, TotalAmt int, CID int, Cnumber int,
--         FOREIGN KEY (Cnumber) REFERENCES CreditCard (Cnumber),
--         FOREIGN KEY (CID) REFERENCES Customer (CID));

-- CREATE TABLE Includes(
--         InvoiceNo int, HotelID int, bType varchar(30),
--         FOREIGN KEY (InvoiceNo) REFERENCES `Reservation-Makes` (InvoiceNo),
--         FOREIGN KEY (HotelID, bType) REFERENCES Breakfast (HotelID, bType),
--         PRIMARY KEY (InvoiceNo, HotelID, bType));

-- CREATE TABLE Customer(
--         CID int PRIMARY KEY AUTO_INCREMENT, Email varchar(50), Address varchar(50), Phone_no int,
--         Name varchar(30), Password varchar(25));

-- CREATE TABLE `Room-Has`(
--         Room_no int, HotelID int, Price int, Capacity int, Floor_no int, 
--         Description varchar(250), Type varchar(30), SDate date NULL, 
--         EDate date NULL, Discount int NULL,
--         FOREIGN KEY (HotelID) REFERENCES Hotel (HotelID),
--         PRIMARY KEY (Room_no, HotelID));
-- CREATE TABLE Service(
--         HotelID int, sType varchar(30), sCost int,
--         PRIMARY KEY (HotelID, sType),
--         FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID));