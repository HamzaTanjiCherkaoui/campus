'use strict';

var _ = require('lodash');
var Allocation = require('./allocation.model');
var mongoose = require('mongoose');
// Get list of allocations
exports.index = function(req, res) {
  Allocation.find().populate('person').populate('product').exec(function (err, allocations) {
    if(err) { return handleError(res, err); }
    return res.json(200, allocations);
  });
};

//get by the product id
exports.byproduct = function(req, res) {
 Allocation.find( {
      product :{_id:mongoose.Types.ObjectId(req.query.productId)}
    },function (err, allocation) {
    if(err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    return res.json(allocation);
  });
};

// Get a single allocation
exports.show = function(req, res) {
  Allocation.findById(req.params.id, function (err, allocation) {
    if(err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    return res.json(allocation);
  });
};

// Creates a new allocation in the DB.
exports.create = function(req, res) {
  Allocation.create(req.body, function(err, allocation) {
    if(err) { return handleError(res, err); }
    return res.json(201, allocation);
  });
};

// Updates an existing allocation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Allocation.findById(req.params.id, function (err, allocation) {
    if (err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    var updated = _.merge(allocation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, allocation);
    });
  });
};

// Deletes a allocation from the DB.
exports.destroy = function(req, res) {
  Allocation.findById(req.params.id, function (err, allocation) {
    if(err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    allocation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}