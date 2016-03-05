var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var _ = require('underscore');
var async = require('async');
var querystring = require('querystring');
var Users = require('./../models/users.js');
var Scores = require('./../models/scores.js');

var rout = function(){	
	router.put('/test', that.test);
	
	router.get('/', that.login);
	router.get('/login', that.admin);
	router.post('/login', that.postAdmin);
	
	router.get('/shouye', that.firstPage);
	
	router.get('/user/:user_num',that.userGet);
	router.post('/user',that.userPost);
	router.delete('/user/:id',that.userDelet);
	
	router.get('/score/:scorestem',that.scoreGet);
	router.post('/score',that.scorePost);
	
	router.get('/jdgue',that.jdgueGet);
}
var that = {
	
	test : function(req, res, next){
		var name = req.body.name;
		console.log("++++"+name+"++++")
		res.json({say:"hello,man"});
	},
	
	firstPage : function(req, res, next){
		//console.log(req.url)
		res.render('firstpage');
	},
	
	admin : function(req, res, next){
		res.render('admin', { title: '学生信息管理' });
	},
	
	login : function(req, res, next){
		var appname=__filename.split('\\').pop().split('.')[0];
		if(appname){
			//console.log('----'+appname+'----')
			res.redirect('/admin/login');
		}else{
			res.redirect('/index');
		}	
	},
	
	postAdmin : function(req, res, next){
		//登陆验证
	},
	
	userGet : function(req, res, next){
		var cls = querystring.parse(url.parse(req.url).query)['cls']||"class1";
		var pager = querystring.parse(url.parse(req.url).query)['pager'];
		var user_num = req.params.user_num?req.params.user_num:0;
			
		pager = Number(pager);
		if(pager<0){
			pager = Math.abs(pager);
			user_num.toString();
			//console.log('----->>>>'+user_num+'<<<<-----')
			//多取一条作为分页显示判断依据
			pager = pager;
			//console.log('----->>>>'+pager+'<<<<-----')
			//Users.find({'usercls' : cls}).lt('usernum', user_num).sort({'usernum':1}).limit(pager).exec(function(error,docs){	
			Users.find({'usercls' : cls}).sort({'usernum':-1}).lt('usernum', user_num).limit(pager).exec(function(err,docs){
				docs.reverse();
				//console.log('----->'+docs+'<-----')
				if(err){
					return console.log(err);
				}
				if(docs){
					res.json(docs);
				}else{
					res.json(null);
				}
			});
			return;
		}else{		
			user_num.toString();
			//多取一条作为分页显示判断依据
			//pager = Number(pager)+1;
			pager = pager?pager+1:null;
			//console.log('----->>>>'+pager+'<<<<-----')
			Users.find({'usercls' : cls}).gt('usernum', user_num).sort({'usernum':1}).limit(pager).exec(function(err,docs){	
				//console.log('----->'+user_num+'<-----')
				if(err){
					return console.log(err);
				}
				if(docs){
					res.json(docs);
				}else{
					res.json(null);
				}
			});
		}
		
		/*
		Users.find({"usercls" : cls},function(error,docs){
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
		*/
	},
	
	userPost : function(req, res, next){
		/*
		//序列化接受参数传递
		var username = req.body['username'];
		console.log('-----'+username+'-----')
		return;
		*/
		var doc = {username : req.body.username, 
		    usersex : req.body.usersex,
		    usernum : req.body.usernum, 
		    userclass : req.body.userclass,
			usercls : req.body.usercls,
		    userpassword : '000000',
		   };
		   
		if(req.body._id){
			//console.log("---"+req.body._id+"---")
			var userid = req.body._id;
			doc.userid = userid;
			doc['$set'] = _.omit(req.body,'_id');

			//var user = new Users(doc);
			//update
			Users.findOneAndUpdate({_id:userid},doc).exec(function(err,docs){
				if(err){
					console.log(err);
					return;
				}
				res.json(docs);
			});
		}else{
			var user = new Users(doc);
			user.save(function(err,docs) {//返回的即是保存的对象
				if(err) {
					console.log(err);
					return;
				}
				//console.log('-----'+docs+'-----');
				res.json(docs);
				// 关闭数据库链接.no close??????
				//Users.close();
			});
			//res.render('index', { title: 'Express' });
		}
	},
	
	userDelet : function(req, res, next){
		var id = req.params.id;
		//console.log('----->'+id+'<-----');
		Users.findOneAndRemove({_id:id}).exec(function(err,doc){
			if(err){
				return res.json({rst:'not delete'});
			}
			//console.log('----->'+doc+'<-----');
			res.json({data:doc});
		});
	},
	
	scoreGet : function(req, res, next){
		//var scorestem_text = req.params.scorestem?req.params.scorestem:null;
		var scorestem_text = req.params.scorestem;
		var cls = querystring.parse(url.parse(req.url).query)['cls'];
		
		//console.log("---"+scorestem_text+"---")
		if(scorestem_text=="null"){						
			//=================waterfall方法=============================
			async.waterfall([
				function(callback){
					Scores.find({"scorecls" : cls, "scoretip" : "scoretip"},{"scorestemlist" : true}).sort({"time":-1}).exec(function(err,listdocs){
						//var lastdoc = listdocs[0].scorestemlist;						
						if(listdocs==""){
							//console.log("---"+"listdocs"+"---")							
							return res.json(null);
						}
						callback(err,listdocs);
						//console.log("---"+listdocs+"---")
					});
				},
				function(listdocs,callback){
					//console.log("--->>>"+listdocs[0].scorestemlist+"<<<---")
					//Scores.find({"scorecls" : cls, "scorestemlist" : listdocs[0].scorestemlist},{}).sort({"scorescoreNum":-1}).exec(function(err,datadocs){
					//	datadocs.splice(-1,1);
					Scores.find({"scorecls" : cls, "scorestemlist" : listdocs[0].scorestemlist},{}).sort({"scorescoreNum":-1}).exec(function(err,datadocs){
						//datadocs.splice(0,1);
						datadocs.splice(-1,1);
						callback(err,datadocs,listdocs);
						//callback(err,datadocs.splice(-1,1),listdocs);
						//console.log("--->>>"+datadocs+"<<<---")
					});
				}
			],function(err,docs,listdocs){				
				//console.log("--->>>"+docs+"<<<---"+listdocs+"----")
				//console.log("--->>>"+docs+"----")
				return res.json({"listdocs":listdocs, "docs":docs});
			});
			
		}else{
			
			Scores.find({'scorestemlist' : scorestem_text, "scorecls" : cls},{}).sort({"scorescoreNum":-1}).exec(function(err,docs){
				if(err){
					return console.log(err);
				}				
				docs.splice(-1,1);
				//console.log("---"+docs+"---")
				res.json(docs);
			});
			
			/*							
			var map = function(){
				emit(this.scorenum,{amount:this.scorescoreNum,count:1})
			}
			var reduce = function(key,vals){
				var val = 0, count = 0;
				for(var i=1;i<vals.length;i++){
					val += isNaN(vals[i].amount)?0:Number(vals[i].amount);
					count++;
				}
				return {amount:val,count:count};
			}
			
			//Scores.mapReduce(
			mongoose.model("Scores").mapReduce(
				map,
				reduce,
				//{out:'temp'},
				function(err,items){					
					console.log(items)
					return;
				}
			)
				
			*/
		}
	},
	
	scorePost : function(req, res, next){
		var scorestem_text = req.body.scorestem_text;
		var doc = JSON.parse(req.body.datas);
		
		//console.log("---"+scorestem_text+"---");		
		doc.forEach(function(item,index){
			var scores = new Scores(item);
			scores.save(function(err,docs){
				if(err){
					return console.log(err);
				}
			});
		});
		return res.json(doc);
		/*
		Scores.save(doc).then(function(err,docs){
			if(err){
				return console.log(err);
			}
			res.json(docs);
			console.log("---"+docs+"---");
		});
		*/		
	},
	
	jdgueGet : function(req, res, next){
		var cls = querystring.parse(url.parse(req.url).query)['cls'];
		var data=[{name:'vivian'},];
		
		if(cls=="class1"){
			data=[{name:'panden'},];
		}
		if(cls=="class2"){
			data=[{name:'胡二狗'},];
		}
		if(cls=="class3"){
			data=[{name:'vivipo'},];
		}
		if(cls=="class4"){
			data=[{name:'潘小莲'},];
		}
		
		res.json(data);
		//console.log('----'+cls+'----')
	},
	
	
	
}

rout();

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