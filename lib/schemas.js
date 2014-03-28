var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Schemas = function() {
	var UserSchema = new Schema({
	    "name"    : { type: 'String' },
	    "email"   : { type: 'String' },
	    "updated" : { type: 'Date', default: Date.now }
	});

	return {
		'userSchema': UserSchema,
		'users': mongoose.model('User', UserSchema)
	}
};

module.exports = Schemas();