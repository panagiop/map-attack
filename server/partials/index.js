'use strict';

var express = require('express');
var controller = require('./partials.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/partials/:api/:name', controller.partials);

module.exports = router;