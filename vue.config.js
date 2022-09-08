const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports={
	devServer:{
		proxy:{
			'^/api': {
				// target: 'http://localhost:5000/',
				target: 'https://my-json-server.typicode.com/Nami5011/Nami5011.github.io/',
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: { '^/api' : '/' }
			}
		}
	},
	publicPath: "./"
}