'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

var ReservationSchema = new Schema({
	datePayement: { type: Date, default: Date.now },
	dateFrom: { type: Date, default: Date.now },
	dateTo: Date,
	status: { type: Boolean, default: true },
	price: Number,
	person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person', childPath:"reservations"},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', childPath:"reservations"}
});

ReservationSchema.plugin(relationship, { relationshipPathName: ['person', 'room'] });

module.exports = mongoose.model('Reservation', ReservationSchema);