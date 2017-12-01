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

User.prototype.room_no = -1;
User.prototype.price = -1;
User.prototype.capacity =-1;
User.prototype.floor_no = -1;
User.prototype.description = "";
User.prototype.type = "Economy";
User.prototype.discount = -1;
User.prototype.s_date = -1;
User.prototype.e_date = -1;

}
