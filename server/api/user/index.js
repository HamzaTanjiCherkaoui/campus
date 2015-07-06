'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();


// activate resource
router.post('/activate/{activated}', auth.isAuthenticated(), controller.changePassword);

// profile resource
router.get('/register', controller.register);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/change_password', auth.isAuthenticated(), controller.changePassword);

// user resource
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
