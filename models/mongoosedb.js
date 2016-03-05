//mongoose connect mongodb

var mongoose = require('mongoose');
//指定Mongo的数据库名为scorepan
mongoose.connect('mongodb://localhost/scorepan');
/*
mongoose.connect('mongodb://localhost/scorepan',function(err){
	if(err){
		return err;
	}
});
*/
//mongoose.connect('mongodb://localhost:27017/scorepan');
exports.mongoose = mongoose;
//此处不能用module.exports = mongoose;