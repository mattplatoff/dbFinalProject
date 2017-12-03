INSERT INTO Hotel(HotelID, Phone_no, Street, City, State, Country, ZIP)

 VALUES(001, 6095551111, '666 Delafield St.', 'New Brunswick', 'New Jersey','United States', 08888),

 (002, 6095552222, '45 Central Ave', 'Pittsburg', 'Pensylvania', 'United States', 09999),

 (003, 6095553333, '77 Woodbridge', 'San Fransisco', 'California','United States', 01010);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(001, 'Continental', 'Waffles', 0);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(001, 'English', 'Just tea', 1);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(001, 'Italian', 'Pizza', 2);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(001, 'American', 'B-sandy', 3);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(001, 'French', 'Croissant', 5);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(002, 'Continental', 'Waffles', 0);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(002, 'English', 'Just tea', 1);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(002, 'Italian', 'Pizza', 2);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(002, 'American', 'B-sandy', 3);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(002, 'French', 'Croissant', 5);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(003, 'Continental', 'Waffles', 0);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(003, 'English', 'Just tea', 1);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(003, 'Italian', 'Pizza', 2);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(003, 'American', 'B-sandy', 3);

INSERT INTO Breakfast(HotelID, bType, Description, bPrice) VALUES(003, 'French', 'Croissant', 5);

INSERT INTO Service (HotelID, sType, sCost) VALUES(001, 'Laundy', 3);

INSERT INTO Service (HotelID, sType, sCost) VALUES(001, 'Airport pick-up', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(001, 'Airport drop-off', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(001, 'Parking', 2);

INSERT INTO Service (HotelID, sType, sCost) VALUES(001, 'Valet', 5);

INSERT INTO Service (HotelID, sType, sCost) VALUES(002, 'Laundy', 3);

INSERT INTO Service (HotelID, sType, sCost) VALUES(002, 'Airport pick-up', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(002, 'Airport drop-off', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(002, 'Parking', 2);

INSERT INTO Service (HotelID, sType, sCost) VALUES(002, 'Valet', 5);

INSERT INTO Service (HotelID, sType, sCost) VALUES(003, 'Laundy', 3);

INSERT INTO Service (HotelID, sType, sCost) VALUES(003, 'Airport pick-up', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(003, 'Airport drop-off', 10);

INSERT INTO Service (HotelID, sType, sCost) VALUES(003, 'Parking', 2);

INSERT INTO Service (HotelID, sType, sCost) VALUES(003, 'Valet', 5); 

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(01, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(02, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(03, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(04, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(05, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(10, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(11, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(12, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(13, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(14, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 001);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(01, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(02, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(03, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(04, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(05, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(10, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(11, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(12, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(13, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(14, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 002);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(01, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(02, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(03, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(04, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(05, 100, 2, 1, 'Standard room, dont expect much', 'economy', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 33, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(10, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(11, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(12, 200, 4, 2, 'Two whole queen sized beds!', 'double', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 35, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(13, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 003);

INSERT INTO `Room-Has` (Room_no, Price, Capacity, Floor_no, Description, Type, SDate, EDate, Discount, HotelID) VALUES(14, 999, 6, 2, 'The ultimate in luxury, for high rollers only!', 'suite', '2018-09-06 00:00:01', '2018-10-06 23:59:59', 40, 003);
