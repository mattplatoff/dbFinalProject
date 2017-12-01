/** user.js **/

var RoomModel = function (room_no, price, capacity, floor_no, description, type, discount, s_date, e_date) {
  this.room_no = room_no;
  this.price = price;
  this.capacity = capacity;
  this.floor_no = floor_no;
  this.description = description;
  this.type = type;
  this.discount = discount;
  this.s_date = s_date;
  this.e_date = e_date;
}

RoomModel.prototype.room_no = -1;
RoomModel.prototype.price = -1;
RoomModel.prototype.capacity =-1;
RoomModel.prototype.floor_no = -1;
RoomModel.prototype.description = "";
RoomModel.prototype.type = "Economy";
RoomModel.prototype.discount = -1;
RoomModel.prototype.s_date = -1;
RoomModel.prototype.e_date = -1;

module.exports = RoomModel;
