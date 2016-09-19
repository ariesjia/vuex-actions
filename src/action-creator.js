import {isFunction , curry , flatten , uniqueId} from 'lodash';

const actionWith = function (commit, name, payload) {
	commit.apply(null, [name, payload]);
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

export const actionCreator = (actionName, actionFunction)=> {
	const func = function (...args) {
		const { commit } = args[0];
		const originArgs = args.slice(1);
		if (isFunction(actionFunction)) {
			const result = actionFunction.apply(null, args);

			if (isPromise(result)) {
				actionWith(commit, actionName,originArgs[0]);

				result.then((res)=> {
					actionWith(commit, `${actionName}__SUCCESS`, res );
			}, (err)=> {
					actionWith(commit, `${actionName}__FAIL`,err );
				});

			} else {
				actionWith(commit, actionName, result);
			}

			return result;

		} else {
			actionWith(commit, actionName, originArgs[0]);
		}
	};

	func.toString = function () {
		return actionName;
	};

	return func;

};

export const actionTypePrefixCreator = curry((prefix, actionName) => prefix ? `${prefix}-action--${actionName}` : `${uniqueId()}-action--${actionName}`);

