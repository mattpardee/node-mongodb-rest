var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	schemaDefinitions = require('../schemas_definitions');

var schemasList = {};

var Schemas = function() {
	for (var s in schemaDefinitions) {
		schemasList[s] = mongoose.model(s, new Schema(schemaDefinitions[s]));
	}

	return schemasList;
};

module.exports = Schemas();