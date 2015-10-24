'use strict';

module.exports = {
	db: process.env.MONGO_URL || 'localhost/mapattack',
	secretJWTToken: process.env.secretJWTToken || 'Basd!6$@@d01S*'
}