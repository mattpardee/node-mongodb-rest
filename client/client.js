/**
 * Restino REST library
 * 
 * @depends on jQuery
 */

var schema = {
	users: {
	    "name" : {
	    	type: 'String'
	    },
	    "email" : {
	    	type: 'String',
	    	unique: true
	    },
	    "updated" : {
	    	type: 'Date',
	    	default: Date.now
	    }
	}
};

var Restino = function() {

	var restOperations = {
		get: function() {

		},

		post: function(data) {

		}
	}

	var restObjects = {};

	for (var s in schema) {
		restObjects[s] = {
			schema : schema[s]
		}

		$.extend(restObjects[s], restOperations);
	}

	return restObjects;
}