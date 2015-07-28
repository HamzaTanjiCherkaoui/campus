'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    Allocation = require(path.resolve('server', 'api/allocation/allocation.model')),
    Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));

var PersonSchema = new Schema({
	code: {type:String,visible:true},
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
	isArchived: Boolean,
	isBanned: Boolean,
	updated: { type: Date, default: Date.now },
	reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
	allocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Allocation'}]
});


PersonSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Virtuals
 */
PersonSchema
	.virtual('created')
	.get( function () {
		return this._id.getTimestamp();
	});

PersonSchema
	.virtual('fullName')
	.get( function () {
		return this.firstName + ' ' + this.lastName;
	});

/**
 * hooks
 */
PersonSchema
  	.post('remove', function(entity) {
        Allocation.remove({ _id: { $in: entity.allocations } }).exec();
        Reservation.remove({ _id: { $in: entity.reservations } }).exec();
  	});

module.exports = mongoose.model('Person', PersonSchema);