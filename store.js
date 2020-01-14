import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// INITIAL STATE
const initialState = {
	applications: [
		{
			name: 'Time!',
			brief: 'Current timestamp',
			description: 'You can sell your watch',
			link: 'http://localhost:3002/files/value-time.js',
		},
		{
			name: 'Button',
			brief: 'OMG, a button',
			description: 'Click, click, click',
			link: 'http://localhost:3002/files/component-button.js',
		},
		{
			name: 'Centered button',
			brief: 'Just in the middle of the container',
			description: 'The button, now centered',
			link: 'http://localhost:3002/files/component-centered-button.js',
		},
	],
	purchasedApplications: [],
	isIdentified: false,
	isDeveloper: false,
	isDeveloperRequestSubmitted: undefined,
	drizzle: undefined,
	drizzleState: undefined,
	activeNodes: [],
	nodeInfos: [],
}

// ACTION TYPES
export const actionTypes = {
	SET_IDENTIFIED: 'SET_IDENTIFIED',
	PURCHASE: 'PURCHASE',
	SET_USER_ID: 'SET_USER_ID',
	SET_DEVELOPER: 'SET_DEVELOPER',
	SET_DEVELOPER_REQUEST_SUBMITTED: 'SET_DEVELOPER_REQUEST_SUBMITTED',
	SET_ACTIVE_NODES: 'SET_ACTIVE_NODES',
	SET_NODE_INFOS: 'SET_NODE_INFOS',
	SET_APPLICATION_URL_SUFFIX: 'SET_APPLICATION_URL_SUFFIX',
	SET_APPLICATIONS: 'SET_APPLICATIONS',
	SET_DRIZZLE: 'SET_DRIZZLE',
	SET_DRIZZLE_STATE: 'SET_DRIZZLE_STATE',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IDENTIFIED:
			return Object.assign({}, state, { isIdentified: action.isIdentified })

		case actionTypes.PURCHASE:
			var newPurchasedApplications = [...new Set(state.purchasedApplications.concat(action.application))]
			return Object.assign({}, state, { purchasedApplications: newPurchasedApplications })

		case actionTypes.SET_DEVELOPER:
			return Object.assign({}, state, { isDeveloper: action.isDeveloper })

		case actionTypes.SET_USER_ID:
			return Object.assign({}, state, { userID: action.userID })

		case actionTypes.SET_DEVELOPER_REQUEST_SUBMITTED:
			return Object.assign({}, state, { isDeveloperRequestSubmitted: action.isDeveloperRequestSubmitted })

		case actionTypes.SET_ACTIVE_NODES:
			return Object.assign({}, state, { activeNodes: action.activeNodes })

		case actionTypes.SET_NODE_INFOS:
			return Object.assign({}, state, { nodeInfos: action.nodeInfos })

		case actionTypes.SET_APPLICATION_URL_SUFFIX:
			return Object.assign({}, state, { applicationURLSuffix: action.applicationURLSuffix })

		case actionTypes.SET_APPLICATIONS:
			return Object.assign({}, state, { applications: action.applications })

		case actionTypes.SET_DRIZZLE:
			return Object.assign({}, state, { drizzle: action.drizzle })

		case actionTypes.SET_DRIZZLE_STATE:
			return Object.assign({}, state, { drizzleState: action.drizzleState })

		default:
			return state
	}
}

// ACTIONS
export const login = () => {
	return { type: actionTypes.SET_IDENTIFIED, isIdentified: true }
}

export const logout = () => {
	return { type: actionTypes.SET_IDENTIFIED, isIdentified: false }
}

export const purchase = application => {
	return { type: actionTypes.PURCHASE, application: application }
}

export function setUserID(userID) {
	return { type: actionTypes.SET_USER_ID, userID: userID }
}

export function setDeveloper(isDeveloper) {
	return { type: actionTypes.SET_DEVELOPER, isDeveloper: isDeveloper }
}

export function setDeveloperRequestSubmitted(isDeveloperRequestSubmitted) {
	return { type: actionTypes.SET_DEVELOPER_REQUEST_SUBMITTED, isDeveloperRequestSubmitted: isDeveloperRequestSubmitted }
}

export function setActiveNodes(activeNodes) {
	return { type: actionTypes.SET_ACTIVE_NODES, activeNodes: activeNodes }
}

export function setNodeInfos(nodeInfos) {
	return { type: actionTypes.SET_NODE_INFOS, nodeInfos: nodeInfos }
}

export function setApplicationURLSuffix(applicationURLSuffix) {
	return { type: actionTypes.SET_APPLICATION_URL_SUFFIX, applicationURLSuffix: applicationURLSuffix }
}

export function setApplications(applications) {
	return { type: actionTypes.SET_APPLICATIONS, applications: applications }
}

export function setDrizzle(drizzle) {
	return { type: actionTypes.SET_DRIZZLE, drizzle: drizzle }
}

export function setDrizzleState(drizzleState) {
	return { type: actionTypes.SET_DRIZZLE_STATE, drizzleState: drizzleState }
}

// INIT STORE
export const initializeStore = (state = initialState) => {
	return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
