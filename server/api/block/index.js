'use strict';

var express = require('express');
var controller = require('./block.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('block.show'), controller.index);
router.get('/:id', auth.hasRole('block.show'), controller.show);
router.post('/', auth.hasRole('block.create'), controller.create);
router.put('/:id', auth.hasRole('block.update'), controller.update);
router.patch('/:id', auth.hasRole('block.update'), controller.update);
router.delete('/:id', auth.hasRole('block.delete'), controller.destroy);

module.exports = router;