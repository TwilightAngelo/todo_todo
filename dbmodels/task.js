var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: false,
	},
	description: {
		type: String,
		required: true,
		unique: false,
	},
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'group',
	}
});

module.exports = mongoose.model('Task', TaskSchema, 'tasks');