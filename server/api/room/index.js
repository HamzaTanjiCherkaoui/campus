'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('room.show'), controller.index);
router.get('/:id', auth.hasRole('room.show'), controller.show);
router.post('/', auth.hasRole('room.create'), controller.create);
router.put('/:id', auth.hasRole('room.update'), controller.update);
router.patch('/:id', auth.hasRole('room.update'), controller.update);
router.delete('/:id', auth.hasRole('room.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('room.delete'), controller.deletemultiple);

module.exports = router;