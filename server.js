/*
* @Author: wlwc0627
* @Date:   2019-04-23 17:46:57
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-24 23:04:46
*/
const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
//引入user.js
const user    = require('./router/api/user');
const profile = require('./router/api/profile');

//引用数据库
const db = require('./config/keys').mongoURI;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//连接数据库
mongoose.connect(db).then(() => {
	console.log("MongoDB Connected!");
}).catch(err => {
	console.log(err);
})

//passport 务必初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// app.get('/', (req,res) => {
// 	res.send("Hello Express");
// })

//使用user
app.use('/api/user', user);
app.use('/api/profile', profile);

const port    = o=process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is Running on port: ${port}`);
})