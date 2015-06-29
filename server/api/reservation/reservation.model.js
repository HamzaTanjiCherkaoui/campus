'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReservationSchema = new Schema({
	date_payement: { type: Date, default: Date.now },
	date_from: { type: Date, default: Date.now },
	date_to: Date,
	status: Boolean,
	price: Number,
	person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Reservation', ReservationSchema);