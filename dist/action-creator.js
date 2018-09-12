'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionCreators = exports.actionCreator = exports.actionNameCreator = undefined;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _toUpper = require('lodash/toUpper');

var _toUpper2 = _interopRequireDefault(_toUpper);

var _mutationCreator = require('./mutation-creator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionWith = function actionWith(commit, name, payload, context) {
  (0, _mutationCreator.hasMutation)(name) && commit.apply(context, [name, payload]);
};

function isPromise(val) {
  return val && typeof val.then === 'function';
}

var actionNameCreator = exports.actionNameCreator = (0, _curry2.default)(function (baseName, name) {
  return (0, _toUpper2.default)(baseName ? baseName + '/' + name : name);
});

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
  func.successActionName = successActionName;
  func.failActionName = failActionName;

  func.toString = function () {
    return actionName;
  };

  return func;
};

var actionCreators = exports.actionCreators = function actionCreators(map) {
  var extract = function extract(baseName, option, intial) {
    return (0, _reduce2.default)(option, function (result, func, name) {
      var actionName = actionNameCreator(baseName)(name);
      if ((0, _isPlainObject2.default)(func)) {
        extract(actionName, func, result);
      } else {
        result[(0, _camelCase2.default)(baseName + '/' + (0, _kebabCase2.default)(name))] = actionCreator(actionName, func);
      }
      return result;
    }, intial);
  };
  return extract('', map, {});
};