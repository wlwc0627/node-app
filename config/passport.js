/*
* @Author: wlwc0627
* @Date:   2019-04-24 18:07:54
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-24 18:34:41
*/
const JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt;
const mongoose      = require('mongoose');
const keys          = require('./keys').secretOrKey;
const User          = mongoose.model("user");
const opts          = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey    = keys;

module.exports = passport => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	   console.log(jwt_payload);
	   User.findById(jwt_payload.id)
	   	   .then(user => {
	   	   	if(user){
	   	   		return done(null, user);
	   	   	}

	   	   	return done(null,false);
	   	   })
	   	   .catch(err => console.log(err))
	}));
}