'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();


// activate resource
router.post('/activate/:activated', auth.hasRole('user.update'), controller.activate);

// profile resource
router.get('/register', controller.register);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/change_password', auth.isAuthenticated(), controller.changePassword);

// user resource
router.get('/', auth.hasRole('user.show'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('user.create'), controller.create);
router.put('/:id', auth.hasRole('user.update'), controller.update);
router.delete('/:id', auth.hasRole('user.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('user.delete'), controller.deletemultiple);
router.post('/authorize', auth.hasRole('user.update'), controller.authorize);

module.exports = router;
