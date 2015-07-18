'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/config/config.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));

var router = express.Router();

router.get('/', auth.hasRole('config.show'), controller.index);
router.get('/:id', auth.hasRole('config.show'), controller.show);
router.post('/', auth.hasRole('config.create'), controller.create);
router.put('/:id', auth.hasRole('config.update'), controller.update);
router.patch('/:id', auth.hasRole('config.update'), controller.update);
router.delete('/:id', auth.hasRole('config.delete'), controller.destroy);

module.exports = router;