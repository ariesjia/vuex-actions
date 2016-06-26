import {isFunction , curry , flatten , uniqueId} from 'lodash';

const actionWith = function (dispatch, name, data) {
	dispatch.apply(null, flatten([name, data]));
};

export const actionCreator = (actionName, actionFunction)=> {
	const func = function (...args) {
		const { dispatch, state } = args[0];
		const originArgs = args.slice(1);
		if (isFunction(actionFunction)) {
			const result = actionFunction.apply(state, args);

			if (result instanceof Promise) {
				actionWith(dispatch, actionName);

				result.then((res)=> {
					actionWith(dispatch, `${actionName}__SUCCESS`, res);
					actionWith(dispatch, `${actionName}__FINALLY`, res, 'SUCCESS');
				}, (err)=> {
					actionWith(dispatch, `${actionName}__FAIL`, err);
					actionWith(dispatch, `${actionName}__FINALLY`, err, 'FAIL');
				});

			} else {
				actionWith(dispatch, actionName, result);
			}

			return result;

		} else {
			actionWith(dispatch, actionName, originArgs);
		}
	};

	func.toString = function () {
		return actionName;
	};

	return func;

};

export const actionTypePrefixCreator = curry((prefix, actionName) => prefix ? `${prefix}-action--${actionName}` : `${uniqueId()}-action--${actionName}`);

