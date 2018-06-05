import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import curry from 'lodash/curry'
import uniqueId from 'lodash/uniqueId'
import reduce from 'lodash/reduce'
import camelCase from 'lodash/camelCase'
import toUpper from 'lodash/toUpper'
import {hasMutation} from './mutation-creator'

const actionWith = function (commit, name, payload, context) {
  hasMutation(name) && commit.apply(context, [name, payload])
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

export const actionNameCreator = curry((baseName, name) => toUpper(baseName ? `${baseName}/${name}` : name))

export const actionCreator = (actionName, actionFunction) => {
  const successActionName = `${actionName}__SUCCESS`
  const failActionName = `${actionName}__FAIL`

  const func = function (...args) {
    const {commit} = args[0]
    const originArgs = args.slice(1)
    if (isFunction(actionFunction)) {
      const context = {
        actionName,
        successActionName,
        failActionName,
        originArgs
      }
      const result = actionFunction.apply(context, args)
      if (isPromise(result)) {
        actionWith(commit, actionName, originArgs[0])
        result.then((res) => {
          actionWith(commit, successActionName, res)
        }, (err) => {
          actionWith(commit, failActionName, err)
        })
      } else {
        actionWith(commit, actionName, result)
      }

      return result

    } else {
      actionWith(commit, actionName, originArgs[0])
    }
  }

  func.actionName = actionName

  func.toString = function () {
    return actionName
  }

  return func
}

export const actionCreators = (map) => {
  const extract = (baseName, option, intial) => {
    return reduce(option, (result, func, name) => {
      const actionName = actionNameCreator(baseName)(name)
      if (isPlainObject(func)) {
        extract(actionName, func, result)
      } else {
        result[camelCase(actionName)] = actionCreator(actionName, func)
      }
      return result
    }, intial)
  }
  return extract('', map, {})
}
