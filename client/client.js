/**
 * Restino REST library
 * 
 * @requires jQuery
 * @requires requirejs
 */

var schema = require('../client/client.js');

var RestClient = function() {
	var Restino = function(route, parent_cb) {
		function ajax(options, cb) {
			$.ajax({
				url: route,
				data: options.data,
				type: options.type
			}).done(cb);
		};

		return {
			get: function(data) {
				ajax({ type: 'GET', data: data }, parent_cb);
			},

			post: function(data) {
				ajax({ type: 'POST', data: data }, parent_cb);
			}
		};
	}

	var restObjects = {},
		restino;

	for (var s in schema) {
		restino = new Restino('/' + s);
		restObjects[s] = {
			schema : schema[s]
		}

		$.extend(restObjects[s], restino);
	}

	return restObjects;
}