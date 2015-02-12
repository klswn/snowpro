// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the Resort model
var resortSchema = new Schema({
	name: String,
	city: String,
	temp: String,
	snow: String,
	id: String,
	img: String,
	weather: [
		{date: String, high: String, low: String, snow: String}
	],
	lifts: [
		{liftName: String}
	],
	trails: [
		{name: String, rating: String, status: String, groomed: String, lift: String}
	]
});

module.exports = mongoose.model('Resort', resortSchema);