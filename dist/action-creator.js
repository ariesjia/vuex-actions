'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionCreator = undefined;

var _lodash = require('lodash');

var actionWith = function actionWith(commit, name, payload) {
	commit.apply(null, [name, payload]);
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

var actionCreator = exports.actionCreator = function actionCreator(actionName, actionFunction) {
	var func = function func() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var commit = args[0].commit;

		var originArgs = args.slice(1);
		if ((0, _lodash.isFunction)(actionFunction)) {
			var result = actionFunction.apply(null, args);

			if (isPromise(result)) {
				actionWith(commit, actionName, originArgs[0]);

				result.then(function (res) {
					actionWith(commit, actionName + '__SUCCESS', res);
				}, function (err) {
					actionWith(commit, actionName + '__FAIL', err);
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

var actionTypePrefixCreator = exports.actionTypePrefixCreator = (0, _lodash.curry)(function (prefix, actionName) {
	return prefix ? prefix + '-action--' + actionName : (0, _lodash.uniqueId)() + '-action--' + actionName;
});