'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionCreator = undefined;

var _lodash = require('lodash');

var actionWith = function actionWith(dispatch, name, data) {
	dispatch.apply(null, (0, _lodash.flatten)([name, data]));
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

var actionCreator = exports.actionCreator = function actionCreator(actionName, actionFunction) {
	var func = function func() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _args$ = args[0];
		var dispatch = _args$.dispatch;
		var state = _args$.state;

		var originArgs = args.slice(1);
		if ((0, _lodash.isFunction)(actionFunction)) {
			var result = actionFunction.apply(state, args);

			if (isPromise(result)) {
				actionWith(dispatch, actionName);

				result.then(function (res) {
					actionWith(dispatch, actionName + '__SUCCESS', res);
					actionWith(dispatch, actionName + '__FINALLY', res, 'SUCCESS');
				}, function (err) {
					actionWith(dispatch, actionName + '__FAIL', err);
					actionWith(dispatch, actionName + '__FINALLY', err, 'FAIL');
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

var actionTypePrefixCreator = exports.actionTypePrefixCreator = (0, _lodash.curry)(function (prefix, actionName) {
	return prefix ? prefix + '-action--' + actionName : (0, _lodash.uniqueId)() + '-action--' + actionName;
});