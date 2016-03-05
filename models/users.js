//user.js
var db = require('./mongoosedb');
var Schema = db.mongoose.Schema;
var userSchema = new Schema({
	username : {type : String},
	usernum : {type : String,},
	userclass : {type : String},
	usercls : {type : String},
	usersex : {type : String},
	userpassword : {type : String,default: "000000"},
	time : {type : Date,default: Date.now}
});
var Users = db.mongoose.model("Users",userSchema);
module.exports = Users;