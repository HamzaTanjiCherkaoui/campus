'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Product = require('./product.model');

// Get list of products


exports.index = function(req, res) {

  if(req.query.category!=='')
  {
    var catquery = 
        {
          category :
                     {
                     _id:mongoose.Types.ObjectId(req.query.category)
                     }
        };

  }
  else
  catquery={};

  Product.find(catquery)
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .sort({
      type: req.query.orderDir
    })
    .populate('category')
    .exec(function(err, products) {
        Product.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.json(200, products);

        })
    });
};


// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//delete multiple products from the DB

exports.deletemultiple = function(req, res) {
  req.body.forEach(function(item) 
  {
     Product.findById(mongoose.Types.ObjectId(item), function (err, product) 
     {
    product.remove() 
      
      });

  });
 res.send(200, "products deleted !"); 
};
function handleError(res, err) {
  return res.send(500, err);
}