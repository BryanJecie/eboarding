const path = require("path");

const APP_NAME = process.env.VUE_APP_NAME || 'My Profile'
const title = `Med4care ~ ${APP_NAME}`;

// const titleName = $appName

module.exports = {
	runtimeCompiler: true,

	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = title;
			return args
		});

		config.resolve.alias.set('@src', path.join(__dirname + '/src/'));
	}
}
