/*
* @Author: wlwc0627
* @Date:   2019-04-25 18:20:54
* @Last Modified by:   wlwc0627
* @Last Modified time: 2019-04-25 18:49:39
*/
const path  = require('path');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
	baseUrl: '/',				//根域上下文目录
	outputDir: 'dist',			//构建输出目录
	assetsDir: 'assets',		//静态资源目录
	lintOnSave: false,			//是否开启 eslint 保存检测
	runtimeCompiler: true,		//运行时版本是否需要编译
	transpileDependencies: [],  //默认babel-loader忽略node_modules，这里可增加例外的依赖包名
	productionSourceMap: true,  //是否生成 SourceMap 文件，false 将提高构建速度
	configureWebpack: config => {
		if(debug){
			config.devtool = 'cheap-module-eval-source-map'
		}
	},
	chainWebpack: config => {},
	parallel: require('os').cpus().length > 1,  //构建时开启多进程处理babel编译
	pluginOptions: {
		//第三方插件配置
	},
	pwa: {
		//单页插件相关配置
	},
	devServer: {
		open: true,
		host: 'localhost',
		port: '8080',
		https: false,
		hotOnly: false,
		proxy: {		//配置跨域
			'/api': {
				target: 'http://localhost:5000/api/',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		before: app => { }
	}

}