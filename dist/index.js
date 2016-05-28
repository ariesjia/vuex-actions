'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionCreator = undefined;

var _lodash = require('lodash');

var actionWith = function actionWith(dispatch, name, data) {
	dispatch.apply(null, (0, _lodash.flatten)([name, data]));
};

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
			var result = actionFunction.apply(state, originArgs);

			if (!result) {
				return false;
			}

			if (result instanceof Promise) {
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

	return Object.assign(func, {
		actionName: actionName
	});
};

var actionTypePrefixCreator = exports.actionTypePrefixCreator = (0, _lodash.curry)(function (prefix, actionName) {
	return prefix + '-action--' + actionName;
});
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionCreator = exports.mutationCreator = undefined;

var _mutationCreator = require('./mutation-creator');

var _mutationCreator2 = _interopRequireDefault(_mutationCreator);

var _actionCreator = require('./action-creator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mutationCreator = _mutationCreator2.default;
exports.actionCreator = _actionCreator.actionCreator;
exports.actionTypePrefixCreator = _actionCreator.actionTypePrefixCreator;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (actionFunction, state) {

	var mutations = {};

	function getActionName(actionCreator) {
		return (0, _lodash.isFunction)(actionCreator) ? actionCreator.actionName : actionCreator;
	}

	function mergeHandlers(actionName, handler) {
		return Object.assign(mutations, _defineProperty({}, actionName, handler));
	}

	function on(actionCreator, handler) {
		mergeHandlers(getActionName(actionCreator), handler);
	}

	var method = ['success', 'fail', 'finally'];

	(0, _lodash.forEach)(method, function (name) {
		on[name] = function (actionCreator, handler) {
			mergeHandlers(getActionName(actionCreator) + '__' + name.toUpperCase(), handler);
		};
	});

	actionFunction(on);

	return {
		state: state,
		mutations: mutations
	};
};
