//modelUtil.js

var path = require('path');
var fs = require('fs');

module.exports = {
	//requireModel : function(req, res, next){
	requireModel : function(M){
		//判断model模块是否存在
		//var m = req.params.m;
		var mfile = path.join(__dirname,'..',path.sep,models,path.sep,M+'.js');
		//var mfile = path.join(__dirname,'../',models+'/',m+'.js');
		if(fs.existsSync(mfile)){
			return reuire(mfile);
		}else{		
			var msg = "model:"+req.params.m+" does not exist!";
			//相应空值时的信息
			var rst = result(false,msg);
			res.json(rst);
			return null;
		}
		next();		
	},
	//mfile存在时的异常判断，
	success : function(msg, data){
		return result(true,msg,data);
	},
	fail : function(msg, data){
		return result(false,msg,data);
	},
}

//定义result(boolean,msg)
function result(success, msg, data){
	//
	var rst = {};
	rst.success = success;
	rst.msg = msg;
	rst.data = data||[];
	return rst;
}

