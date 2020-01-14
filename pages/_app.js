import App from 'next/app'
import React from 'react'

import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'

// import drizzle functions and contract artifact
import { DrizzleContext } from 'drizzle-react'
import { Drizzle, generateStore } from 'drizzle'
import Addition from '../contracts/Addition.json'

// let drizzle know what contracts we want
const drizzleOptions = {
	contracts: [Addition],
	web3: {
		block: false,
		fallback: {
			type: 'ws',
			url: 'ws://127.0.0.1:9545',
		},
	},
}

// setup the drizzle store and drizzle
const drizzleStore = generateStore(drizzleOptions)
const drizzle = new Drizzle(drizzleOptions, drizzleStore)

class MyApp extends App {
	render() {
		const { Component, pageProps, reduxStore } = this.props
		return (
			<DrizzleContext.Provider drizzle={drizzle}>
				<Provider store={reduxStore}>
					<Component {...pageProps} />
				</Provider>
			</DrizzleContext.Provider>
		)
	}
}

export default withReduxStore(MyApp)
