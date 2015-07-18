'use strict';

var _ = require('lodash');
var path = require('path');
var Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));
var Room = require(path.resolve('server', 'api/room/room.model'));

// Get list of reservations
exports.index = function(req, res) {
  Reservation.find(function (err, reservations) {
    if(err) { return handleError(res, err); }
    return res.json(200, reservations);
  });
};

// Get a single reservation
exports.show = function(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    if(err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    return res.json(reservation);
  });
};

// Creates a new reservation in the DB.
exports.create = function(req, res) {
  Reservation.create(req.body, function(err, reservation) {
    Room.findById(reservation.room, function (err, room) {
      if(err) { return handleError(res, err); }
      room.free = room.free - 1; 
      room.save();
      return res.json(201, reservation);
    });
  });
};

// Updates an existing reservation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reservation.findById(req.params.id, function (err, reservation) {
    if (err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    var updated = _.merge(reservation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reservation);
    });
  });
};

// Deletes a reservation from the DB.
exports.destroy = function(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    if(err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    reservation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}