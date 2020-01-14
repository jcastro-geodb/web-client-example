const withCSS = require('@zeit/next-css')
function HACK_removeMinimizeOptionFromCssLoaders(config) {
	console.warn('HACK: Removing `minimize` option from `css-loader` entries in Webpack config')
	config.module.rules.forEach(rule => {
		if (Array.isArray(rule.use)) {
			rule.use.forEach(u => {
				if (u.loader === 'css-loader' && u.options) {
					delete u.options.minimize
				}
			})
		}
	})
}

module.exports = withCSS({
	publicRuntimeConfig: {
		LOGIN_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/login`,
		IS_DEVELOPER_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/isDeveloper`,
		DEVELOPER_REQUEST_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/developerRequest`,
		DEVELOPER_REQUEST_PURPOSES_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/developerRequestPurposes`,
		ACTIVE_NODES_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/nodes`,
		NODE_INFO_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/nodeInfo`,
		APPLICATION_UPLOAD_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/uploadApplication`,
		GET_APPLICATIONS_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/getAllApplications`,
		GET_APPLICATION_LICENSE_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/getApplicationLicense`,
		GET_PURCHASED_APPLICATIONS_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/getApplicationLicensesByUser`,
		APPLICATION_INFO_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/applicationInfo`,
		APPLICATION_UPDATE_URL: `http://localhost:${process.env.PORT_APPSTORE_BACKEND}/updateApplication`,
	},
	webpack(config) {
		HACK_removeMinimizeOptionFromCssLoaders(config)
		return config
	},
})
