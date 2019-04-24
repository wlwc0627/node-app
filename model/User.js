/*
* @Author: wlwc0627
* @Date:   2019-04-24 09:45:09
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-24 18:39:46
*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	identity: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = User = mongoose.model('user',UserSchema);