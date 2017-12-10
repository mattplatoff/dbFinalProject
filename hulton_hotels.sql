-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: hulton_hotels
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Breakfast`
--

DROP TABLE IF EXISTS `Breakfast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Breakfast` (
  `HotelID` int(11) NOT NULL,
  `bType` varchar(30) NOT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `bPrice` int(11) DEFAULT NULL,
  PRIMARY KEY (`HotelID`,`bType`),
  CONSTRAINT `Breakfast_ibfk_1` FOREIGN KEY (`HotelID`) REFERENCES `Hotel` (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Breakfast`
--

LOCK TABLES `Breakfast` WRITE;
/*!40000 ALTER TABLE `Breakfast` DISABLE KEYS */;
INSERT INTO `Breakfast` VALUES (1,'Continental','WAFFLES',5),(1,'French','Crepes',5),(2,'Continental','WAFFLES',5),(3,'Continental','WAFFLES',5);
/*!40000 ALTER TABLE `Breakfast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contains`
--

DROP TABLE IF EXISTS `Contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contains` (
  `InvoiceNo` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `sType` varchar(30) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`InvoiceNo`,`HotelID`,`sType`),
  KEY `HotelID` (`HotelID`,`sType`),
  CONSTRAINT `Contains_ibfk_1` FOREIGN KEY (`InvoiceNo`) REFERENCES `Reservation-Makes` (`InvoiceNo`),
  CONSTRAINT `Contains_ibfk_2` FOREIGN KEY (`HotelID`, `sType`) REFERENCES `Service` (`HotelID`, `sType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contains`
--

LOCK TABLES `Contains` WRITE;
/*!40000 ALTER TABLE `Contains` DISABLE KEYS */;
INSERT INTO `Contains` VALUES (13,1,'Laundry',2),(14,1,'Laundry',2),(14,1,'Spa',1),(15,1,'Laundry',2),(15,1,'Spa',1),(16,1,'Laundry',2),(16,1,'Spa',1);
/*!40000 ALTER TABLE `Contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CreditCard`
--

DROP TABLE IF EXISTS `CreditCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CreditCard` (
  `Cnumber` int(11) NOT NULL,
  `BillingAddr` varchar(50) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `SecCode` int(11) DEFAULT NULL,
  `Type` varchar(20) DEFAULT NULL,
  `ExpDate` date DEFAULT NULL,
  `CID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Cnumber`),
  KEY `CID` (`CID`),
  CONSTRAINT `CreditCard_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `Customer` (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CreditCard`
--

LOCK TABLES `CreditCard` WRITE;
/*!40000 ALTER TABLE `CreditCard` DISABLE KEYS */;
INSERT INTO `CreditCard` VALUES (12121212,'14 Woodbridge New Brunswick','Jonah Wasserman',123,'MasterCard','2012-12-12',2),(12345978,'14 Woodbridge New Brunswick','Jonah Wasserman',123,'Visa','2012-12-12',2);
/*!40000 ALTER TABLE `CreditCard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Phone_no` varchar(10) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Password` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'test@test.com','123 Test Way','1115551234','Test','TEST'),(2,'jbw113@scarletmail.rutgers.edu','14 Woodbridge New Brunswick','1235551234','Jonah','password');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hotel`
--

DROP TABLE IF EXISTS `Hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hotel` (
  `HotelID` int(11) NOT NULL,
  `Phone_no` varchar(10) DEFAULT NULL,
  `Street` varchar(30) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `State` varchar(30) DEFAULT NULL,
  `Country` varchar(30) DEFAULT NULL,
  `ZIP` int(11) DEFAULT NULL,
  PRIMARY KEY (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hotel`
--

LOCK TABLES `Hotel` WRITE;
/*!40000 ALTER TABLE `Hotel` DISABLE KEYS */;
INSERT INTO `Hotel` VALUES (1,'7325551234','17 Mine Street','New Brunswick','New Jersey','United States',18901),(2,'7615551334','1 Ways Street','Ottowa','Ontario','Canada',23901),(3,'1835559081','298 Snowy Drive','Albany','New York','United States',38401);
/*!40000 ALTER TABLE `Hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Includes`
--

DROP TABLE IF EXISTS `Includes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Includes` (
  `InvoiceNo` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `bType` varchar(30) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`InvoiceNo`,`HotelID`,`bType`),
  KEY `HotelID` (`HotelID`,`bType`),
  CONSTRAINT `Includes_ibfk_1` FOREIGN KEY (`InvoiceNo`) REFERENCES `Reservation-Makes` (`InvoiceNo`),
  CONSTRAINT `Includes_ibfk_2` FOREIGN KEY (`HotelID`, `bType`) REFERENCES `Breakfast` (`HotelID`, `bType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Includes`
--

LOCK TABLES `Includes` WRITE;
/*!40000 ALTER TABLE `Includes` DISABLE KEYS */;
INSERT INTO `Includes` VALUES (16,1,'Continental',2);
/*!40000 ALTER TABLE `Includes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation-Makes`
--

DROP TABLE IF EXISTS `Reservation-Makes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservation-Makes` (
  `InvoiceNo` int(11) NOT NULL AUTO_INCREMENT,
  `ResDate` date DEFAULT NULL,
  `TotalAmt` int(11) DEFAULT NULL,
  `CID` int(11) DEFAULT NULL,
  `Cnumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`InvoiceNo`),
  KEY `Cnumber` (`Cnumber`),
  KEY `CID` (`CID`),
  CONSTRAINT `Reservation-Makes_ibfk_1` FOREIGN KEY (`Cnumber`) REFERENCES `CreditCard` (`Cnumber`),
  CONSTRAINT `Reservation-Makes_ibfk_2` FOREIGN KEY (`CID`) REFERENCES `Customer` (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation-Makes`
--

LOCK TABLES `Reservation-Makes` WRITE;
/*!40000 ALTER TABLE `Reservation-Makes` DISABLE KEYS */;
INSERT INTO `Reservation-Makes` VALUES (1,'2017-11-10',2160,2,12121212),(2,'2017-11-10',710,2,12121212),(3,'2017-11-10',4260,2,12121212),(4,'2017-11-10',3075,2,12345978),(5,'2017-11-10',2715,2,12121212),(6,'2017-11-10',15920,2,12121212),(7,'2017-11-10',310,2,12121212),(8,'2017-11-10',3110,2,12121212),(9,'2017-11-10',615,2,12121212),(10,'2017-11-10',1215,2,12345978),(11,'2017-11-10',2720,2,12121212),(12,'2017-11-10',660,2,12121212),(13,'2017-11-10',910,2,12121212),(14,'2017-11-10',3360,2,12121212),(15,'2017-11-10',660,2,12121212),(16,'2017-11-10',2760,2,12121212);
/*!40000 ALTER TABLE `Reservation-Makes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserves`
--

DROP TABLE IF EXISTS `Reserves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reserves` (
  `InvoiceNo` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `Room_no` int(11) NOT NULL,
  `outDate` date DEFAULT NULL,
  `inDate` date DEFAULT NULL,
  PRIMARY KEY (`InvoiceNo`,`HotelID`,`Room_no`),
  KEY `HotelID` (`HotelID`,`Room_no`),
  CONSTRAINT `Reserves_ibfk_1` FOREIGN KEY (`InvoiceNo`) REFERENCES `Reservation-Makes` (`InvoiceNo`),
  CONSTRAINT `Reserves_ibfk_2` FOREIGN KEY (`HotelID`, `Room_no`) REFERENCES `Room-Has` (`HotelID`, `Room_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserves`
--

LOCK TABLES `Reserves` WRITE;
/*!40000 ALTER TABLE `Reserves` DISABLE KEYS */;
INSERT INTO `Reserves` VALUES (1,1,2,'2017-12-13','2017-12-06'),(2,1,2,'2017-12-08','2017-12-06'),(2,1,3,'2017-12-08','2017-12-06'),(2,2,4,'2017-12-08','2017-12-06'),(3,1,2,'2017-12-21','2017-12-07'),(5,1,2,'2017-12-22','2017-12-13'),(6,1,2,'2017-12-29','2017-11-30'),(6,1,3,'2017-12-30','2017-12-06'),(7,1,2,'2017-12-22','2017-12-21'),(8,1,2,'2017-12-15','2017-12-05'),(9,1,2,'2017-12-07','2017-12-05'),(10,1,2,'2017-12-05','2017-12-04'),(10,1,3,'2017-12-07','2017-12-04'),(11,1,2,'2017-12-21','2017-12-20'),(11,1,3,'2017-12-22','2017-12-14'),(12,1,2,'2017-12-07','2017-12-06'),(12,1,3,'2017-12-07','2017-12-06'),(13,1,2,'2017-12-13','2017-12-12'),(13,1,3,'2017-12-14','2017-12-12'),(14,1,2,'2017-12-22','2017-12-12'),(14,1,3,'2017-12-07','2017-12-06'),(15,1,2,'2017-12-06','2017-12-05'),(15,1,3,'2017-12-06','2017-12-05'),(16,1,2,'2017-12-14','2017-12-06'),(16,1,3,'2017-12-06','2017-12-05');
/*!40000 ALTER TABLE `Reserves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review-Writes`
--

DROP TABLE IF EXISTS `Review-Writes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review-Writes` (
  `ReviewID` int(11) NOT NULL,
  `Rating` double DEFAULT NULL,
  `TextComment` varchar(250) DEFAULT NULL,
  `dateReviewed` DATE DEFAULT NULL,
  `CID` int(11) DEFAULT NULL,
  `sType` varchar(30) DEFAULT NULL,
  `bType` varchar(30) DEFAULT NULL,
  `Room_no` int(11) DEFAULT NULL,
  `HotelId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `HotelId` (`HotelId`,`sType`),
  KEY `HotelId_2` (`HotelId`,`bType`),
  KEY `Room_no` (`Room_no`,`HotelId`),
  CONSTRAINT `Review-Writes_ibfk_1` FOREIGN KEY (`HotelId`, `sType`) REFERENCES `Service` (`HotelID`, `sType`),
  CONSTRAINT `Review-Writes_ibfk_2` FOREIGN KEY (`HotelId`, `bType`) REFERENCES `Breakfast` (`HotelID`, `bType`),
  CONSTRAINT `Review-Writes_ibfk_3` FOREIGN KEY (`Room_no`, `HotelId`) REFERENCES `Room-Has` (`Room_no`, `HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review-Writes`
--

LOCK TABLES `Review-Writes` WRITE;
/*!40000 ALTER TABLE `Review-Writes` DISABLE KEYS */;
INSERT INTO `Review-Writes` VALUES (1,7.2,'It was pretty good. Great variety!', NOW(),1,NULL,'Continental',NULL,1),(2,5.3,'Lot of food. Not super good though.', NOW(),1,NULL,'Continental',NULL,1),(3,9,'Very clean and fluffy!', NOW(),1,'Laundry',NULL,NULL,2),(4,2,'yuck!', NOW(),1,'Laundry',NULL,NULL,2),(6,9.6,'Decent', NOW(),1,'Spa',NULL,NULL,1),(7,5.2,'Not a bad room for the price!', NOW(),1,NULL,NULL,1,1),(8,8.5,'Yummy!', NOW(),2,NULL,'French',NULL,1);
/*!40000 ALTER TABLE `Review-Writes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Room-Has`
--

DROP TABLE IF EXISTS `Room-Has`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Room-Has` (
  `Room_no` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `Price` int(11) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Floor_no` int(11) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Type` varchar(30) DEFAULT NULL,
  `SDate` date DEFAULT NULL,
  `EDate` date DEFAULT NULL,
  `Discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`Room_no`,`HotelID`),
  KEY `HotelID` (`HotelID`),
  CONSTRAINT `Room-Has_ibfk_1` FOREIGN KEY (`HotelID`) REFERENCES `Hotel` (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room-Has`
--

LOCK TABLES `Room-Has` WRITE;
/*!40000 ALTER TABLE `Room-Has` DISABLE KEYS */;
INSERT INTO `Room-Has` VALUES (1,1,100,2,1,'Cozy room for 2','Economy',NULL,NULL,NULL),(1,2,110,2,1,'Cozy room for 2','Economy',NULL,NULL,NULL),(1,3,110,2,1,'Cozy room for 2','Economy',NULL,NULL,NULL),(2,1,300,4,1,'Luxury room with spa access','Deluxe',NULL,NULL,NULL),(2,2,310,4,1,'Luxury room with spa access','Deluxe',NULL,NULL,NULL),(2,3,310,4,1,'Luxury room with spa access','Deluxe',NULL,NULL,NULL),(3,1,300,4,2,'Luxury room with spa access','Deluxe','2017-12-02','2017-12-29',210),(3,2,310,4,2,'Luxury room with spa access','Deluxe','2017-12-01','2017-12-05',220),(3,3,310,4,2,'Luxury room with spa access','Deluxe','2017-12-01','2017-12-29',220),(4,2,110,2,1,'Cozy room for 2','Economy',NULL,NULL,NULL),(5,2,310,4,1,'Luxury room with spa access','Deluxe',NULL,NULL,NULL),(6,2,310,4,2,'Luxury room with spa access','Deluxe','2017-12-01','2017-12-05',220),(7,3,110,2,1,'Cozy room for 2','Economy',NULL,NULL,NULL),(8,3,310,4,1,'Luxury room with spa access','Deluxe',NULL,NULL,NULL),(9,3,310,4,2,'Luxury room with spa access','Deluxe','2017-12-01','2017-12-29',220),(10,3,310,1,2,'Small, cozy single','Economy','2017-12-01','2017-12-29',80);
/*!40000 ALTER TABLE `Room-Has` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service` (
  `HotelID` int(11) NOT NULL,
  `sType` varchar(30) NOT NULL,
  `sCost` int(11) DEFAULT NULL,
  PRIMARY KEY (`HotelID`,`sType`),
  CONSTRAINT `Service_ibfk_1` FOREIGN KEY (`HotelID`) REFERENCES `Hotel` (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES (1,'Laundry',0),(1,'Massage',60),(1,'Spa',50),(2,'Laundry',0),(3,'Laundry',0),(3,'Massage',80);
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `account_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'jbw113@scarletmail.rutgers.edu','password',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-10 18:12:38
