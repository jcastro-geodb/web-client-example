import React, { Component } from 'react'
import { initializeStore } from '../store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state')
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (e) {
		return undefined
	}
}

const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch (e) {
	}
}

function getOrCreateStore(initialState) {
	if (isServer) {
		return initializeStore(initialState)
	}

	if (!window[__NEXT_REDUX_STORE__]) {
		let store = initializeStore(loadState())
		window[__NEXT_REDUX_STORE__] = store
		store.subscribe(() => saveState(store.getState()))
	}

	return window[__NEXT_REDUX_STORE__]
}

export default App => {
	return class AppWithRedux extends Component {
		static async getInitialProps(appContext) {
			const reduxStore = getOrCreateStore()

			appContext.ctx.reduxStore = reduxStore

			let appProps = {}
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext)
			}

			return {
				...appProps,
				initialReduxState: reduxStore.getState()
			}
		}

		constructor(props) {
			super(props)
			this.reduxStore = getOrCreateStore(props.initialReduxState)
		}

		render() {
			return <App {...this.props} reduxStore={this.reduxStore} />
		}
	}
}