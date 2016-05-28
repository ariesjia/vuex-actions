import {isFunction , curry , flatten} from 'lodash';

const actionWith = function (dispatch, name, data) {
	dispatch.apply(null, flatten([name, data]));
};

export const actionCreator = (actionName, actionFunction)=> {
	const func = function (...args) {
		const { dispatch, state } = args[0];
		const originArgs = args.slice(1);
		if (isFunction(actionFunction)) {
			const result = actionFunction.apply(state, originArgs);

			if(!result){
				return false;
			}

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

	return Object.assign(func, {
		actionName
	});
};

export const actionTypePrefixCreator = curry((prefix, actionName) => `${prefix}-action--${actionName}`);

