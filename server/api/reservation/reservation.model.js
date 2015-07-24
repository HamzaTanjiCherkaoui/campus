'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    path = require('path'),
    Room = require(path.resolve('server', 'api/room/room.model'));

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

/**
 * hooks
 */
ReservationSchema
  .post('remove', function(entity) {
    if(entity.status){ 
        Room.findById(entity.room, function (err, room) {
            room.free = room.free + 1;  
            room.save();
        })
    }
  });



module.exports = mongoose.model('Reservation', ReservationSchema);