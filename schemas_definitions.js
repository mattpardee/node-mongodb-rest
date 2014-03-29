/**
 * Schema definitions
 */

module.exports = {
	users: {
	    "name"    : {
	    	type: 'String'
	    },
	    "email"   : {
	    	type: 'String',
	    	unique: true
	    },
	    "updated" : {
	    	type: 'Date',
	    	default: Date.now
	    }
	}
}