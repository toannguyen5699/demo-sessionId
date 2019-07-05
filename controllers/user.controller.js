var User = require('../models/user.model');
var db = require('../db');
var shortid = require('shortid');
var multer  = require('multer');

module.exports.index = async function(req, res) {
	var users= await User.find();
		res.render('users/index', {
		users: users
	});
		
};

module.exports.search = async function(req, res){
	var q = req.query.q;
	var users = await User.find();
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	/*res.render('users/search', {
		users: matchedUsers
	});*/
		res.render('users/search', {
		users: matchedUsers
	});
};

module.exports.create = async function(req, res) {
	res.render('users/create');
};

module.exports.get = async function(req, res) {
	var id = req.params.id;
	var users = await User.find(); 
	var matchedUser = users.filter(function(user) {
		return user.id.id !== -1;
	});
		res.render('users/view', {
		users: matchedUser
	});
};

module.exports.postCreate = async function(req,res) {
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	var users = await User.find();
	var user = new User({
		name: req.body.name, 
		phone: req.body.phone,
		avatar: req.body.avatar 
	});
	user.save();
	res.redirect('/users');
};