var restify  = require('restify'),
	mongoose = require('mongoose'),
	schemas  = require('./lib/schemas'),
	config   = require('./configs/development.js');

/**
 * Set up mongoose
 */
mongoose.connection.on('error', 
	console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
    console.log('MongoDB connection opened');
});

var m = mongoose.connect("mongodb://" + config.db.mongo.host + ":"
			+ config.db.mongo.port + "/" + config.db.mongo.db_name);

var server = restify.createServer();

server.use(restify.gzipResponse());
server.use(restify.bodyParser());

if (config.CORS) {
	server.use(
		function crossOrigin(req,res,next){
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			return next();
		}
	);
}

/**
 * GET (list) all
 */
server.get('/:collection', function(req, res, next) {
	var collection = req.params.collection;

	if (schemas[collection]) {
		schemas[collection].find(function(err, users) {
			res.send(users);
			next();
		});
	}
	else {
		next();
	}
});

/**
 * GET single record
 */
server.get('/:collection/:id', function(req, res, next) {
	var collection = req.params.collection;
	if (!schemas[collection]) {
		return next();
	}

	schemas[collection].findOne({
		_id: req.params.id
	}, function(err, obj) {
		res.send(obj);
		next();
	});
});

/**
 * POST to collection
 */
server.post('/:collection', function(req, res, next) {
	var collection = req.params.collection;
	if (!schemas[collection]) {
		return next();
	}

	var newObject = new schemas[collection](req.body);
	newObject.save(function(err, obj) {
		res.send(obj);
		next();
	});
});

server.listen(8080, '0.0.0.0', function() {
  console.log('%s listening at %s', server.name, server.url);
});