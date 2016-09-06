'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (actionFunction, state) {

	var mutations = {};

	function getActionName(actionCreator) {
		return (0, _lodash.isFunction)(actionCreator) && actionCreator.toString() ? actionCreator.toString() : actionCreator;
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