'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReservationSchema = new Schema({
	datePayement: { type: Date, default: Date.now },
	dateFrom: { type: Date, default: Date.now },
	dateTo: Date,
	status: Boolean,
	price: Number,
	person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Reservation', ReservationSchema);