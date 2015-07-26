'use strict';

var _ = require('lodash');
var path = require('path');
var Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));
var Room = require(path.resolve('server', 'api/room/room.model'));

// Get list of reservations
exports.index = function(req, res) {
  req.query = _.merge({page: 1, perPage: 20, keyword : '', orderBy: 'datePayement', orderDir:'asc'}, req.query);
  var keyword = {$regex: new RegExp(req.query.keyword, 'i')};
  Reservation.find()
    .sort([[req.query.orderBy, req.query.orderDir]])
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .populate('person')
    .populate('room')
    .exec(function(err, reservations) {
      if(err) { return handleError(res, err); }
      reservations = reservations.filter(function (entity) {
        return (entity.person.firstName.indexOf(req.query.keyword) != -1) || (entity.person.lastName.indexOf(req.query.keyword) != -1)
          || (entity.room.name.indexOf(req.query.keyword) != -1) || (entity.price === Number.parseFloat(req.query.keyword))
      });
      Reservation.count().exec(function(err, count) {
        res.setHeader('pages', Math.ceil( count / req.query.perPage ));
        res.setHeader('count', count);
        res.json(200, reservations);
      })
    });
};

// Get a single reservation
exports.show = function(req, res) {
  Reservation.findById(req.params.id)
    .populate('room')
    .populate('person')
    .exec(function (err, reservation) {
      if(err) { return handleError(res, err); }
      if(!reservation) { return res.send(404); }
      var blockPath = {
        path: 'room.block',
        model: 'Block'
      };
      Reservation.populate(reservation, blockPath, function (err, reservation) {
        return res.json(reservation);
      });
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