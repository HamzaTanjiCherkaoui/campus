'use strict';

var _ = require('lodash');
var Room = require('./room.model');
var Block = require('./../block/block.model');
var mongoose = require('mongoose');

// Get list of rooms
exports.index = function(req, res) {
  var keyword = {$regex: new RegExp(req.query.keyword,'i')};
  var where = [{name: keyword}];
  if(req.query.block){
    where.push({block: {_id: mongoose.Types.ObjectId(req.query.block)}});
  }
  if(req.query.isFree == 1){
    where.push({free: {$gt : 0}});
  }else if(req.query.isFree == 2) {
    where.push({free: {$lte : 0}});
  }
  Room.find({$and: where})
    .sort([[req.query.orderBy, req.query.orderDir]])
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .populate('block')
    .exec(function(err, rooms) {
        Room.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
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

//delete multiple products from the DB
exports.deletemultiple = function(req, res) {
  var ids = req.body.ids.map(function(id){
    return mongoose.Types.ObjectId(id);
  });
  Room.remove({ _id: { $in: ids } }, function (err) {
    if(err) { return handleError(res, err); }
    res.send(204);
  });
};

//delete multiple products from the DB
exports.addmultiple = function(req, res) {
  var data = req.body.data;
  Block.create({
    name: data.name,
    type: data.type,
    floors: data.floors.length
  }, function(err, block) {
    if(err) { return handleError(res, err); }
    data.floors.forEach(function(floor){
      for (var i = 1; i <= floor.rooms; i++) {
        var room = new Room({
          name: block.name + floor.number + i,
          floor: floor.number,
          capacity: floor.capacity,
          free: floor.capacity,
          block: block._id
        });
        room.save();
      }
    });
    return res.json(201, block);
  
  });
};

function handleError(res, err) {
  return res.send(500, err);
}