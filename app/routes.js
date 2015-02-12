var Resort = require('./models/resort');

module.exports = function(app) {

	// server routes ===========================================================
	

	// get api call
	app.get('/api/resorts', function(req, res) {

		console.log('normal get');
		
		Resort.find(function(err, resorts) {

			if (err) {
				console.log('error');
				res.send(err);
			}

			res.json(resorts);

		});
	});

	app.get('/api/resorts/:id', function(req, res) {

		console.log('findbyId');

		Resort.findOne({'id' : req.params.id}, function (err, resort) {
			
			if (err) {
				console.log('error');
				res.send(err);
			}
			
			res.json(resort);
		});
	});

	app.post('/api/resorts', function(req, res) {
		
		var resort = new Resort();

		resort.name = req.body.name;
		resort.city = req.body.city;
		resort.id 	= req.body.id;

		resort.save(function(err, product) {
			if (err) {
				res.send(err);
			}
			res.json(product);
		});

	});


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};