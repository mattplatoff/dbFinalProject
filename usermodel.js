var UserModel =  function(name,email,address,phonenumber) {
    this.name=name;
    this.email=email;
    this.address=address;
    this.phonenumber=phonenumber;
}

UserModel.prototype.name="";
UserModel.prototype.email="";
UserModel.prototype.address="";
UserModel.prototype.phonenumber="";

module.exports=UserModel;