'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: String,
  floor: { type: Number, min: 0},
  capacity: { type: Number, min: 0},
  free: { type: Number, min: 0},
  block: {type: mongoose.Schema.Types.ObjectId, ref: 'Block'},
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}]
});

RoomSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Virtuals
 */
RoomSchema
	.virtual('isFree')
	.get( function () {
		return (this.free > 0);
	});


module.exports = mongoose.model('Room', RoomSchema);