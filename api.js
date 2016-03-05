//admin api.js

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var modelutil = require('./../lib/modelUtil.js');
//var objectId = mongoose.Schema.Types.ObjectId;

module.exports = {
	registerRoutes : function(ns, app){
		console.log("registerRoutes");
		var express = require('express'),
		router = express.Router();
		//router.post('/:m',modelutil.requireModel,this.insertOne);
		//router.get('/:m/:id',modelutil.reuireModel,this.getOne);
		//router.get('/:m',modelutil.reuireModel,this.getMany);
		router.delet('/:m/:id', this.delOne);
		router.put('/:m/:id', this.updateOne);
		app.use(ns, router);
	},
	
	delOne : function(req, res, next){
		var id = req.params.id;
		var M = modelutil.requireModel(req.params.m);
		
		if(M&&id){
			M.findOneAndRemove({_id:id}).exec(function(err,doc){
				if(err){
					return res.json(modelutil.fail(err));
				}
				res.json(modelutil.success('delete ok',doc));
			});
		}else{
			var msg = req.params.m+":"+id+"delete fail";
			return res.json(modelutil.fail(msg));
		}
	},
	
	updateOne : function(req, res ,next){
		var id = req.params.id;
		var option = {};
		option['$set'] = _.omit(req.body,'_id');
		//{'$set':{req.body}}
		var M = modelutil.requireModel(req.params.m);
		
		if(M&&id){
			M.findOneAndUpdate(id,option).exec(function(err,doc){
				if(err){
					return res.json(modelutil.fail(err));
				}
				res.json(modelutil.success('update ok',doc));
			});
		}else{
			var msg = req.params.m+":"+id+"update fail";
			return res.json(modelutil.fail(msg));
		}
	},
		
}