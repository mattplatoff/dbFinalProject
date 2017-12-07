DROP DATABASE hulton_hotels IF EXISTS;
CREATE DATABASE hulton_hotels;
USE hulton_hotels;

CREATE TABLE Hotel(
        HotelID int PRIMARY KEY, Phone_no varchar(10), Street varchar(30),
        City varchar(30), State varchar(30), Country varchar(30), ZIP int);

CREATE TABLE Users(UID int PRIMARY KEY AUTO_INCREMENT, Email varchar(50),
        Password varchar(25), account_type int);

CREATE TABLE Customer(
        CID int PRIMARY KEY AUTO_INCREMENT, Email varchar(50), Address varchar(50), Phone_no varchar(10),
        Name varchar(30), Password varchar(25));

CREATE TABLE CreditCard(
        Cnumber int PRIMARY KEY, BillingAddr varchar(50), Name varchar(30),
        SecCode int, Type varchar(20), ExpDate date, CID int,
        FOREIGN KEY (CID) REFERENCES Customer (CID));

CREATE TABLE Breakfast(
        HotelID int, bType varchar(30), Description varchar(30), bPrice int,
        PRIMARY KEY (HotelID, bType),
        FOREIGN KEY (HotelID) REFERENCES Hotel (HotelID));

CREATE TABLE Service(
        HotelID int, sType varchar(30), sCost int,
        PRIMARY KEY (HotelID, sType),
        FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID));

CREATE TABLE `Room-Has`(
        Room_no int, HotelID int, Price int, Capacity int, Floor_no int, 
        Description varchar(250), Type varchar(30), SDate date NULL, 
        EDate date NULL, Discount int NULL,
        FOREIGN KEY (HotelID) REFERENCES Hotel (HotelID),
        PRIMARY KEY (Room_no, HotelID));

CREATE TABLE `Review-Writes`(
        ReviewID int PRIMARY KEY, Rating double, TextComment varchar(250),
        CID int, sType varchar(30), bType varchar(30), Room_no int, HotelId int,
        FOREIGN KEY (HotelId, sType) REFERENCES Service (HotelID, sType),
        FOREIGN KEY (HotelId, bType) REFERENCES Breakfast (HotelID, bType),
        FOREIGN KEY (Room_no, HotelId) REFERENCES `Room-Has` (Room_no, HotelID));

CREATE TABLE `Reservation-Makes`(
        InvoiceNo int PRIMARY KEY, ResDate date, TotalAmt int, CID int, Cnumber int,
        FOREIGN KEY (Cnumber) REFERENCES CreditCard (Cnumber),
        FOREIGN KEY (CID) REFERENCES Customer (CID));

CREATE TABLE Includes(
        InvoiceNo int, HotelID int, bType varchar(30),
        FOREIGN KEY (InvoiceNo) REFERENCES `Reservation-Makes` (InvoiceNo),
        FOREIGN KEY (HotelID, bType) REFERENCES Breakfast (HotelID, bType),
        PRIMARY KEY (InvoiceNo, HotelID, bType));

CREATE TABLE Contains(
        InvoiceNo int, HotelID int, sType varchar(30),
        FOREIGN KEY (InvoiceNo) REFERENCES `Reservation-Makes` (InvoiceNo),
        FOREIGN KEY (HotelID, sType) REFERENCES Service (HotelID, sType),
        PRIMARY KEY (InvoiceNo, HotelID, sType));

CREATE TABLE Reserves(
        InvoiceNo int, HotelID int, Room_no int, outDate date, inDate date,
        FOREIGN KEY (InvoiceNo) REFERENCES `Reservation-Makes` (InvoiceNo),
        FOREIGN KEY (HotelID, Room_no) REFERENCES `Room-Has` (HotelID, Room_no),
        PRIMARY KEY (InvoiceNo, HotelID, Room_no));
