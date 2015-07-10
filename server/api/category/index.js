'use strict';

var express = require('express');
var controller = require('./category.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('category.show'), controller.index);
router.get('/:id', auth.hasRole('category.show'), controller.show);
router.post('/', auth.hasRole('category.create'), controller.create);
router.put('/:id', auth.hasRole('category.update'), controller.update);
router.patch('/:id', auth.hasRole('category.update'), controller.update);
router.delete('/:id', auth.hasRole('category.delete'), controller.destroy);

module.exports = router;