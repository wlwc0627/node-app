<template>
	<div class="head-nav">
		<el-row type="flex">
		    <el-col :span="6" class="logo-container">
		    	<img src="../assets/logo.jpg" class="logo" alt="">
		  	    <span class="title">米修在线后台管理系统</span>
		    </el-col>
		    <el-col :span="6" class="user">
		    	<div class="userinfo">
		    		<img class="avatar" :src="user.avatar" alt="">
		    		<div class="welcome">
		    			<p class="name comename">欢迎</p>
		    			<p class="name avatarname">{{user.name}}</p>
		    		</div>
		    		<span class="username">
		    			<el-dropdown trigger="click" @command="setDialogInfo">
						  <span class="el-dropdown-link">
						    <i class="el-icon-caret-bottom el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="info">个人中心</el-dropdown-item>
						    <el-dropdown-item command="logout">退出</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
		    		</span>
		    	</div>
		    </el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'HeadNav',
	component: {},
	computed: {
		user() {
			return this.$store.getters.user;
		}
	},
	methods: {
		setDialogInfo(item) {
			switch(item) {
				case "info": 
					this.showInfoList();
					break;
				case "logout": 
					this.logout();
					break;
			}
		},

		//用户个人中心展示
		showInfoList () {
			console.log("用户个人中心展示");
		},

		//退出登录
		logout () {
			// 清除 token
			localStorage.removeItem('eleToken');

			// 设置 vuex store
			this.$store.dispatch("clearCurrentState");

			// 跳转回登录页
			this.$router.push('/login');
		}
	}
}
</script>

<style scoped>
.head-nav{
	position: relative;
	width: 100%;
	height: 60px;
	min-width: 600px;
	background: #324057;
	color: #fff;
	border-bottom: #1f2d3d;
	box-sizing: border-box;
}

.logo-container{
	line-height: 50px;
	min-width: 400px;
	margin-left: 10px;
}

.logo{
	width: 40px;
	height: 40px;
	display: inline-block;
	margin-right: 10px;
	vertical-align: middle;
	border-radius: 5px;
}

.title{
	vertical-align: middile;
	font-size: 20px;
}

.userinfo{
	position: absolute;
	width: 200px;
	height: 50px;
	right: 20px;
	top: 5px;
	text-align: center;
}

.avatar{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	vertical-align: middle;
	display: inline-block;
	margin-right: 10px;
}

.welcome{
	display: inline-block;
	width: auto;
	vertical-align: middle;
	padding: 0 5px;
}

.name{
	line-height: 23px;
	text-align: center;
	font-size: 14px;
}

.comename{
	font-size: 12px;
}

.avatarname{
	color: #409eff;
	font-weight: bold;
}

.username{
	cursor: pointer;
	margin-right: 5px;
}

.el-icon--right{
	color: #fff;
}
</style>
