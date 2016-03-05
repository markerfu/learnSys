var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('./../models/users.js');

/* GET home page. */
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
