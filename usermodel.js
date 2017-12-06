var UserModel =  function(uid,email,account_type) {
    this.email=email;
    this.uid=uid;
    this.account_type=account_type;

}

UserModel.prototype.email="";
UserModel.prototype.uid=-1;
UserModel.prototype.account_type=-1;

module.exports=UserModel;