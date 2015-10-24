"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var generalconfig = require('./../../generalconfig'); 

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    created: Date,
    __posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }]
    /*
    profileImg: { data: Buffer, contentType: String }
    */
}); 

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _userId: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, generalconfig.secretJWTToken);
};

module.exports = mongoose.model('User', UserSchema);
