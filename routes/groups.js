var express = require('express');
var router = express.Router({mergeParams : true});
var Group = require('../dbmodels/group.js');

router.get('/', function(req, res, next) {
	Group.find({}, function(err, groups){
		if(err){
			next(err);
		} else {
			res.json(groups);
		}
	});
});

router.post('/', function(req, res, next) {

	var group = new Group({
			title: req.body.title
	});

	group.save(function(err, group){
		if(err) {
			next(err);
		} else {
			Group.find({}, function(err, groups){
				if(err){
					next(err);
				} else {
					res.json(groups);
				}
			});
		}
	});
});

router.delete('/:gid', function(req, res, next) {
	Group.remove({_id: req.params.gid}, function(err) {
		if (err) {
			next(err);
		} else {
			Group.find({}, function(err, groups){
				if(err){
					next(err);
				} else {
					res.json(groups);
				}
			});
		}
	});
}); 

module.exports = router;