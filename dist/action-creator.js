'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionCreator = undefined;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _mutationCreator = require('./mutation-creator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionWith = function actionWith(commit, name, payload, context) {
	(0, _mutationCreator.hasMutation)(name) && commit.apply(context, [name, payload]);
};

function isPromise(val) {
	return val && typeof val.then === 'function';
}

var actionCreator = exports.actionCreator = function actionCreator(actionName, actionFunction) {
	var successActionName = actionName + '__SUCCESS';
	var failActionName = actionName + '__FAIL';

	var func = function func() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var commit = args[0].commit;

		var originArgs = args.slice(1);
		if ((0, _isFunction2.default)(actionFunction)) {
			var context = {
				actionName: actionName,
				successActionName: successActionName,
				failActionName: failActionName,
				originArgs: originArgs
			};
			var result = actionFunction.apply(context, args);
			if (isPromise(result)) {
				actionWith(commit, actionName, originArgs[0]);
				result.then(function (res) {
					actionWith(commit, successActionName, res);
				}, function (err) {
					actionWith(commit, failActionName, err);
				});
			} else {
				actionWith(commit, actionName, result);
			}

			return result;
		} else {
			actionWith(commit, actionName, originArgs[0]);
		}
	};

	func.actionName = actionName;

	func.toString = function () {
		return actionName;
	};

	return func;
};

var actionTypePrefixCreator = exports.actionTypePrefixCreator = (0, _curry2.default)(function (prefix, actionName) {
	return prefix ? prefix + '-action--' + actionName : (0, _uniqueId2.default)() + '-action--' + actionName;
});