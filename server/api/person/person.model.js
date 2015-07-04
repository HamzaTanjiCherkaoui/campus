'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
	code: String,
	codeType: String,
	lastName: String,
	firstName: String,
	gender: Boolean,
	birthDay: Date,
	city: String,
	country: String,
	address: String,
	description: String,
	tel: String,
	type: String,
	status: String,
	is_archived: Boolean,
	is_banned: Boolean,
	updated: { type: Date, default: Date.now },
	researvations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Researvation'}],
	allocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Allocation'}]
});

module.exports = mongoose.model('Person', PersonSchema);