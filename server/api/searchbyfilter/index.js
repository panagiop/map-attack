'use strict';

var express = require('express');
var jwt = require('express-jwt');
var generalconfig = require('./../../generalconfig'); 

var auth = jwt({
    secret: generalconfig.secretJWTToken,
    userProperty: 'payload'
});

var controller = require('./search.controller');
var router = express.Router();

// Securing posts-related endpoints with "auth" middleware
router.get('/:filtername', controller.posts); 
router.get('/auth/:filtername', auth, controller.postsLoggedIn); 

module.exports = router;  