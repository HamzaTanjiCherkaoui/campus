'use strict';

var express = require('express');
var controller = require('./person.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('person.show'), controller.index);
router.get('/:id', auth.hasRole('person.show'), controller.show);
router.post('/', auth.hasRole('person.create'), controller.create);
router.put('/:id', auth.hasRole('person.update'), controller.update);
router.patch('/:id', auth.hasRole('person.update'), controller.update);
router.delete('/:id', auth.hasRole('person.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('person.delete'), controller.deletemultiple);

module.exports = router;