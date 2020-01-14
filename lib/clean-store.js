import { initializeStore } from '../store'

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch (e) {
	}
}

export const cleanStore = () => {
	let store = initializeStore()
	saveState(store.getState())
	store.subscribe(() => saveState(store.getState()))
	window[__NEXT_REDUX_STORE__] = store
	window.location.reload(true)
}
