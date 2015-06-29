/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/config', require('./api/config'));
  app.use('/api/allocations', require('./api/allocation'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/reservations', require('./api/reservation'));
  app.use('/api/rooms', require('./api/room'));
  app.use('/api/blocks', require('./api/block'));
  app.use('/api/persons', require('./api/person'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
