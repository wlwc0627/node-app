<template>
	<el-row class="menu_page">
	  <el-col>
	    <el-menu 
	      class="el-menu-vertical-demo"
		  background-color="324057"
		  text-color="#fff"
		  active-text-color="#409eff">
		  	<router-link to="/index">
		  		<el-menu-item index="0">
		  			<img src="../assets/home.png" alt="" class="iconfont">
		  			<span slot="title">首页</span>
		  		</el-menu-item>
		  	</router-link>
		  	<el-submenu index="1">
                <template slot="title">
                	<img src="../assets/money.png" alt="" class="iconfont">
                	<span slot="title">资金管理</span>
                </template>
                <router-link to="/index/fundlist">
                    <el-menu-item index="1-1">资金流水</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                	<img src="../assets/info.png" alt="" class="iconfont">
                	<span slot="title">信息管理</span>
                </template>
				<router-link to="/index/infoshow">
                	<el-menu-item index="2-1">个人信息</el-menu-item>
            	</router-link>
            </el-submenu>
	    </el-menu>
	  </el-col>
	</el-row>
</template>

<script>
export default{
	name: 'LeftMenu'
}
</script>

<style scoped>
.menu_page{
	position: fixed;
	top: 60px;
	left: 0;
	width: 200px;
	bottom: 0;
	background: #324057;
	z-index: 9;
	box-sizing: border-box;
	overflow: hidden;
}

.el-menu-vertical-demo{
	background-color: #324057;
	width: 200px;
	overflow: hidden;
}

.el-submenu__title{
	width: 200px;
}

.iconfont{
	width: 15px;
	height: 15px;
	margin-right: 6px;
}

a{
	text-decoration: none;
}

.el-menu--inline .el-menu-item {
	padding-left: 60px !important;
	background-color: #324888;	
}
</style>