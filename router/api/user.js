/*
* @Author: wlwc0627
* @Date:   2019-04-24 09:28:55
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-27 14:55:28
*/
//login、register
const express     = require('express');
const router      = express.Router();
const User        = require('../../model/User');
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const keys        = require('../../config/keys').secretOrKey;
//引入头像
const gravatar    = require('gravatar');

//引入passport
const passport    = require('passport');

router.get('/test',(req,res) => {
	res.json({msg: "success"});
});

router.post("/register", (req,res) => {
	//查看邮箱是否被注册
	User.findOne({email: req.body.email})
		.then(user => {
			if (user) {
				return res.status(400).json("邮箱已被注册");
			}else{
				const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

				const newUser = new User({
					name    : req.body.name,
					password: req.body.password,
					email   : req.body.email,
					avatar,
					identity: req.body.identity
				})

				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(newUser.password, salt, (err, hash) => {
				        if (err) throw err;
				        newUser.password = hash;

				        newUser.save()
				        	   .then(user => res.json(user))
				        	   .catch(err => console.log(err))
				    });
				});
			}
		})
});

//登录接口
router.post("/login", (req,res) => {
	const email    = req.body.email;
	const password = req.body.password;
	User.findOne({email})
		.then(user => {
			if(!user){
				return res.status(404).json("邮箱或密码错误")
			}

			//密码匹配
			bcrypt.compare(password, user.password)
				  .then(isMatch => {
				  	if(isMatch){
				  		const rule = {
				  			id      : user.id,
				  			name    : user.name,
				  			avatar  : user.avatar,
				  			identity: user.identity
				  		};
				  		jwt.sign(rule, keys, {expiresIn: 3600}, (err, token) => {
				  			if(err) throw err;
				  			res.json({
				  				success: true,
				  				token: 'Bearer ' + token
				  			});
				  		})
				  	}else{
				  		res.status(400).json("邮箱或密码错误")
				  	}
				  })
		})
});

//其他接口(用于测试token是否设置成功)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id      : req.user.id,
		name    : req.user.name,
		email   : req.user.email,
		identity: req.user.identity
	});
})


module.exports = router;