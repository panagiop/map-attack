'use strict';

var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: { type: String, unique: true },
	text: String,
	type_of_attack: String,
	loc: {
    	type: [],
    	index: '2d'
	},
	date: {type: 'Date', default: Date.now},
	isPublished: Boolean,
	__user : { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Posts', PostsSchema);
