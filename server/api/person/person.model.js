'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
	code: {type:String,visible:true},
	codeType: String,
	familyName: String,
	first_name: String,
	country: String,
	niveau_etude: String,
	description: String,
	birthday: Date,
	address: String,
	city: String,
	type: String,
	status: String,
	is_archived: Boolean,
	is_banned: Boolean,
	updated: { type: Date, default: Date.now },
	researvations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Researvation'}],
	allocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Allocation'}]
});

module.exports = mongoose.model('Person', PersonSchema);