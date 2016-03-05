var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var Users = require('./../models/users.js');

var that = {		
	admin : function(req, res, next) {
		res.render('admin', { title: 'Express' });
	},
	
	login : function(req, res, next) {
		var appname=__filename.split('\\').pop().split('.')[0];
		if(appname){
			//console.log('----'+appname+'----')
			res.redirect('/admin/login');
		}else{
			res.render('index', { title: 'Express' });
		}	
	},
	
	userform : function(req, res, next) {
		//if(querystring.parse(url.parse(req.url).query)['userclass']){
		//console.log('-----'+req.params.userclass+'-----');
		if(req.params.userclass){
			var wclass = req.params.userclass;			
		}else{
			var wclass = "一年级";
		}
		
		Users.find({"userclass" : wclass},function(error,docs){
			//console.log('-----'+docs+'-----');
			if(error){
				return console.log(error);
			}
			if(docs){
				res.json(docs);
			}else{
				res.json(null);
			}
		});

	},
	
	userformSelect : function(req, res, next){
		var doc = {username : 'snowpan', 
		   usernumber : '1012', 
		   userclass : '一年级',
		   usersex : 'female',
		   //userpassword : '123456'
		  };
		var user = new Users(doc);
		user.save(function(error) {
			if(error) {
				console.log(error);
			} else {
				//console.log('-----saved OK!-----');
			}
			// 关闭数据库链接.no close??????
			//Users.close();
		});
		res.render('index', { title: 'Express' });		
	},
	//
}

router.get('/login', that.admin);
router.get('/', that.login);
router.get('/userform/:userclass', that.userform);
router.get('/userform', that.userformSelect);

module.exports = router;


































/* GET home page. 
router.get('/login', function(req, res, next) {
	res.render('admin', { title: 'Express' });
});
router.get('/', function(req, res, next) {
	var appname=__filename.split('\\').pop().split('.')[0];
	//console.log('----'+adminurl+'----')
	//console.log('----'+__dirname+'----')
	//var view= path.join(__dirname, '..','views',appname);
	//res.render(view, { title: 'Express' });
	if(appname){
		console.log('----'+appname+'----')
		res.redirect('/admin/login');
	}else{
		res.render('index', { title: 'Express' });
	}	
});
router.get('/dd', function(req, res, next) {
	var doc = {username : 'snow', 
			   usernumber : '1011', 
			   userclass : '一年级',
			   usersex : 'female'
			  };
	var user = new Users(doc);
	user.save(function(error) {
		if(error) {
			console.log(error);
		} else {
			//console.log('-----saved OK!-----');
		}
		// 关闭数据库链接.no close??????
		//Users.close();
	});
	res.render('index', { title: 'Express' });
});
module.exports = router;
*/