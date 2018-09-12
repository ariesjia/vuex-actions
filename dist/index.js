'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionTypePrefixCreator = exports.actionNameCreator = exports.actionCreators = exports.actionCreator = exports.mutationCreator = undefined;

var _mutationCreator = require('./mutation-creator');

var _mutationCreator2 = _interopRequireDefault(_mutationCreator);

var _actionCreator = require('./action-creator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionTypePrefixCreator = function actionTypePrefixCreator() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	console.warn('vuex-actions: this methods is depleted');
	_actionCreator.actionNameCreator.call.apply(_actionCreator.actionNameCreator, [undefined].concat(args));
};

exports.mutationCreator = _mutationCreator2.default;
exports.actionCreator = _actionCreator.actionCreator;
exports.actionCreators = _actionCreator.actionCreators;
exports.actionNameCreator = _actionCreator.actionNameCreator;
exports.actionTypePrefixCreator = actionTypePrefixCreator;