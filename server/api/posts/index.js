'use strict';

var express = require('express');
var jwt = require('express-jwt');
var generalconfig = require('./../../generalconfig');

var auth = jwt({
    secret: generalconfig.secretJWTToken,
    userProperty: 'payload'
});

var controller = require('./posts.controller');
var router = express.Router();


// Securing posts-related endpoints with "auth" middleware
router.get('/', auth, controller.posts);
router.get('/allposts', controller.allposts);
router.get('/advancedSearch', controller.advancedSearch);
router.get('/auth/queryByDate/:dateFrom/:dateTo', auth, controller.queryByDateAuth);
router.get('/queryByDate/:dateFrom/:dateTo', controller.queryByDate);
router.get('/messages', auth, controller.messages);
router.put('/publishPost/:id', auth, controller.publishPost);
router.get('/:id', controller.post);
router.post('/', auth, controller.addpost);
router.put('/:id', auth, controller.updatepost);
router.delete('/:id', auth, controller.deletepost);

module.exports = router;
