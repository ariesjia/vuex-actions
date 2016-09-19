import { isFunction , forEach } from 'lodash';

export default (actionFunction)=> {

	let mutations = {};

	function getActionName(actionCreator) {
		return isFunction(actionCreator) && actionCreator.toString() ? actionCreator.toString() : actionCreator
	}

	function mergeHandlers(actionName, handler) {
		return Object.assign(mutations, {
			[actionName]: handler
		});
	}

	function on(actionCreator, handler) {
		mergeHandlers(getActionName(actionCreator), handler);
	}

	const method = ['success', 'fail', 'finally'];

	forEach(method, (name)=> {
		on[name] = (actionCreator, handler)=> {
			mergeHandlers(`${getActionName(actionCreator)}__${name.toUpperCase()}`, handler);
		};
	});

	actionFunction(on);

	return mutations;

};