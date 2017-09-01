import isFunction from 'lodash/isFunction';
import curry from 'lodash/curry';
import uniqueId from 'lodash/uniqueId';
import { hasMutation } from './mutation-creator'

const actionWith = function (commit, name, payload,context) {
  hasMutation(name) && commit.apply(context, [name, payload]);
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

export const actionCreator = (actionName, actionFunction)=> {
	const func = function (...args) {
		const { commit } = args[0];
		const originArgs = args.slice(1);

		if (isFunction(actionFunction)){

			const successActionName = `${actionName}__SUCCESS`;
			const failActionName = `${actionName}__FAIL`;
			const context = {
				actionName,
				successActionName,
				failActionName,
				originArgs
			};

			const result = actionFunction.apply(context, args);

			if (isPromise(result)) {
				actionWith(commit, actionName, originArgs[0]);
				result.then((res)=> {
					actionWith(commit, successActionName, res );
				}, (err)=> {
					actionWith(commit, failActionName, err );
				});
			} else {
				actionWith(commit, actionName, result );
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

