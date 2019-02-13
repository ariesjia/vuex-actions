import mapValues from 'lodash/mapValues'

export const pendingActions = {}

export const setPending = (actionName, status) => {
	pendingActions[actionName] = status
	return pendingActions
}

export const getPending = (actionName) => {
	return !!pendingActions[actionName]
}

export default function(config) {
	return mapValues(config, (item) => {
		if(Array.isArray(item)) {
			return item.some(getPending)
		}
		else {
			return getPending(item)
		}
	})
}