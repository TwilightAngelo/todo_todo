var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: false,
	},
	//???!!!!
})

module.exports = mongoose.model('Group', GroupSchema, 'groups');