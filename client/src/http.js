/*
* @Author: wlwc0627
* @Date:   2019-04-25 18:01:11
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-27 14:53:49
*/
import axios from 'axios';
import { Message,Loading } from 'element-ui';
import router from './router';

let loading;
function startLoading() {
	loading = Loading.service({
		lock: true,
		text: "正在加载中...",
		background: 'rgba(0,0,0, .7)'
	});
}

function endLoading() {
	loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
	// 加载动画
	startLoading();

	if (localStorage) {
		//设置请求 header
		config.headers.Authorization = localStorage.eleToken;
	}
	return config;
}, error => {
	return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(response => {
	// 结束动画
	endLoading();
	return response;
},error => {
	endLoading();
	// 错误提示
	Message.error(error.response.data);

	//获取错误状态码
	const { status } = error.response;
	if(status == 401) {
		Message.error(" Token已失效，请重新登录！");
		//清除token
		localStorage.removeItem("eleToken");

		//跳转回登录页
		router.push('/login');
	}

	return Promise.reject(error);
})

export default axios;