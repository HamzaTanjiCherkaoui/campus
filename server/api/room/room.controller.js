'use strict';

var _ = require('lodash');
var Room = require('./room.model');

// Get list of rooms
exports.index = function(req, res) {
  var keyword = new RegExp(req.query.keyword,'i');
  Room.find({name: {$regex:keyword}})
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .sort({name: req.query.orderDir})
    .populate('block')
    .exec(function(err, rooms) {
        Room.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.json(200, rooms);
        })
    });
};

// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id)
    .populate('block')
    .populate('reservations')
    .populate('person')
    .exec(function (err, room) {
      if(err) { return handleError(res, err); }
      if(!room) { return res.send(404); }
      return res.json(room);
    });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.json(201, room);
  });
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}