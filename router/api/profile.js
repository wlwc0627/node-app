/*
* @Author: wlwc0627
* @Date:   2019-04-24 23:05:19
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-24 23:57:18
*/
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const Profile  = require('../../model/Profile');     

router.get('/test', (req,res) => {
	res.json({msg: "success"});
});

//添加信息接口(私有接口，需要验证 token 才可添加信息)
router.post('/add', passport.authenticate('jwt', { session: false }), (req,res) => {
	const profileFileds = {};

	//查看所添加的信息是否完整
	if(req.body.type) profileFileds.type = req.body.type;
	if(req.body.income) profileFileds.income = req.body.income;
	if(req.body.expand) profileFileds.expand = req.body.expand;
	if(req.body.cash) profileFileds.cash = req.body.cash;
	if(req.body.remark) profileFileds.remark = req.body.remark;
	if(req.body.describe) profileFileds.describe = req.body.describe;

	new Profile(profileFileds).save().then(profile => res.json(profile));
});

//获取所有信息
router.get("/", passport.authenticate('jwt', { session: false }), (req,res) => {
	Profile.find()
		   .then(profile => {
		   	if(!profile){
		   		res.status(404).json("暂无信息");
		   	}
		   	//查询数据成功则返回所有数据
		   	res.json(profile);
		   })
		   .catch(err => res.status(404).json(err));
});

//获取单条信息
router.get("/:id", passport.authenticate('jwt', { session: false }), (req,res) => {
	Profile.findOne({_id:req.params.id})
		   .then(profile => {
		   	if(!profile){
		   		res.status(404).json("暂无信息");
		   	}
		   	
		   	res.json(profile);
		   })
		   .catch(err => res.status(404).json(err));
});

//编辑单条信息
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
	const profileFileds = {};

	//查看所添加的信息是否完整
	if(req.body.type) profileFileds.type = req.body.type;
	if(req.body.income) profileFileds.income = req.body.income;
	if(req.body.expand) profileFileds.expand = req.body.expand;
	if(req.body.cash) profileFileds.cash = req.body.cash;
	if(req.body.remark) profileFileds.remark = req.body.remark;
	if(req.body.describe) profileFileds.describe = req.body.describe;

	Profile.findOneAndUpdate(
		{_id:req.params.id},
		{$set:profileFileds},
		{new: true}
		).then(profile => res.json(profile));
});

//删除信息接口
router.delete(
	"/delete/:id", 
	passport.authenticate('jwt', { session: false }), 
	(req,res) => {
		Profile.findOneAndDelete({_id:req.params.id})
		       .then(profile => {
		   	      profile.save().then(profile => res.json(profile));
		        })
		       .catch(err => res.status(404).json("删除信息失败！"));
});

module.exports = router;