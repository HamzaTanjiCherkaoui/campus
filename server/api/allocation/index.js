'use strict';

var express = require('express');
var controller = require('./allocation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.hasRole('allocation.show'), controller.show);
router.post('/', auth.hasRole('allocation.create'), controller.create);
router.put('/:id', auth.hasRole('allocation.update'), controller.update);
router.patch('/:id', auth.hasRole('allocation.update'), controller.update);
router.delete('/:id', auth.hasRole('allocation.delete'), controller.destroy);

module.exports = router;