'use strict';

var _ = require('lodash');
var path = require('path');
var Config = require(path.resolve('server', 'api/config/config.model'));

// Get list of config
exports.index = function(req, res) {
  Config.find(function (err, config) {
    if(err) { return res.send(500, err); }
    return res.json(200, config);
  });
};

// Updates an existing config in the DB.
exports.update = function(req, res) {
  if(req.file){
    req.body.logo = 'uploads/' + req.file.filename;
  }
  Object.keys(req.body).forEach(function(item){
    Config.findOne({key: item}, function (err, entity) {
      entity.value = req.body[item];
      entity.save();
    });
  });
  return res.send(204);  
};