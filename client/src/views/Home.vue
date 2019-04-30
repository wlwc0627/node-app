<template>
	<div class="home">
		<div class="container">
			<h1 class="title">米修在线</h1>
			<p class="lead">专注线上教育，用心做教育，用心做服务！</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	components: {}
}
</script>

<style scoped>
.home{
	width: 100%;
	height: 100%;
	background: url('../assets/showcase.jpg') no-repeat;
	background-size: 100% 100%;
}

.container{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding-top: 100px;
	background-color: rgba(0,0,0, .7);
	text-align: center;
	color: #000;
}

.title{
	font-size: 30px;
	font-weight: bold;
	color: #fff;
}

.lead{
	margin-top: 50px;
	font-size: 22px;
	color: #fff;
}
</style>
