'use strict';

var express = require('express');
// var passport = require('passport');
var User = require('../api/users/users.model');

// Passport Configuration
// require('./local/config/passport');

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;