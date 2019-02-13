import flattenDeep from 'lodash/flattenDeep'
import { getActionName } from './action-name'

const mutationNames = []

export const hasMutation = actionName => mutationNames.includes(actionName)

export default (actionFunction) => {

	let mutations = {}

	function mergeHandlers(actionCreators, type, handler) {
		const mapper = actions => {
			return actions.map(actionCreator => {
				const actionName = getActionName(actionCreator, type)
				mutationNames.push(actionName)
				return { [actionName]: handler }
			})
		}
		return Object.assign(mutations, ...([actionCreators] |> flattenDeep |> mapper))
	}

	function on(actionCreators, handler){
    mergeHandlers(actionCreators, '', handler)
	}

	const method = ['success', 'fail', 'finally']

	method.forEach((name)=> {
		on[name] = (actionCreators, handler)=> {
			mergeHandlers(actionCreators, name, handler)
		}
	})

	actionFunction(on)
	return mutations
}