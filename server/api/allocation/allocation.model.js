'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var AllocationSchema = new Schema({
	type: Boolean, // room or person
	status: Boolean, // valid ?
	product  : {type : ObjectId, ref : 'Product'},
	person  : {type : ObjectId, ref : 'Person'},
	room  : {type : ObjectId, ref : 'Room'}
});

module.exports = mongoose.model('Allocation', AllocationSchema);