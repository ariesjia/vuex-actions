import {isFunction , curry , flatten , uniqueId} from 'lodash';

const actionWith = function (dispatch, name, data) {
	dispatch.apply(null, flatten([name, data]));
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

export const actionCreator = (actionName, actionFunction)=> {
	const func = function (...args) {
		const { dispatch, state } = args[0];
		const originArgs = args.slice(1);
		if (isFunction(actionFunction)) {
			const result = actionFunction.apply(state, args);

			if (isPromise(result)) {
				actionWith(dispatch, actionName);

				result.then((res)=> {
					actionWith(dispatch, `${actionName}__SUCCESS`, [res , originArgs] );
					actionWith(dispatch, `${actionName}__FINALLY`, [res, 'SUCCESS' , originArgs]);
				}, (err)=> {
					actionWith(dispatch, `${actionName}__FAIL`,[err , originArgs]);
					actionWith(dispatch, `${actionName}__FINALLY`, [err, 'FAIL' , originArgs]);
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

