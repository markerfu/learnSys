//user.js
var db = require('./mongoosedb');
var Schema = db.mongoose.Schema;
var scoreSchema = new Schema({
	scorename : {type : String},
	scorenum : {type : String,},
	scoreclass : {type : String},
	scorecls : {type : String},
	scoresex : {type : String},
	scorescoreNum : {type : Number,min: 0,max: 100},
	scorestemlist : {type : String},
	time : {type : Date,default: Date.now},
	scoretip : {type : String,}//为每张表单做个标记，获取单号时用（免除单号建立集合）
});
var Scores = db.mongoose.model("Scores",scoreSchema);
module.exports = Scores;