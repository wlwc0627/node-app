/*
* @Author: wlwc0627
* @Date:   2019-04-24 22:59:59
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-24 23:21:14
*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProfileSchema = new Schema({
	income: {
		type: String,
		required: true
	},
	expand: {
		type: String,
		required: true
	},
	cash: {
		type: String,
		required: true
	},
	describe: {
		type: String
	},
	type: {
		type: String
	},
	remark: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = Profile = mongoose.model('profile',ProfileSchema);