import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import toUpper from 'lodash/toUpper'
import { hasMutation } from './mutation-creator'
import { getActionName } from './action-name'

const actionWith = function (commit, name, payload, context) {
  console.log(payload)
  hasMutation(name) && commit.apply(context, [name, payload])
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

export const actionNameCreator = curry((baseName, name) => toUpper(baseName ? `${baseName}/${name}` : name))

export const actionCreator = (actionName, actionFunction) => {
  const successActionName = getActionName(actionName, 'success')
  const failActionName = getActionName(actionName, 'fail')
  const finallyActionName = getActionName(actionName, 'finally')

  const func = function (...args) {
    const context = args[0]
    const { commit } = context
    const originArgs = args.slice(1)
    if (isFunction(actionFunction)) {
      const actionContext = {
        actionName,
        successActionName,
        failActionName,
        originArgs
      }
      const result = actionFunction.apply(actionContext, args)
      if (isPromise(result)) {
        actionWith(commit, actionName, originArgs[0])
        result.then((res) => {
          actionWith(commit, successActionName, res)
          actionWith(commit, finallyActionName, res)
        }, (err) => {
          actionWith(commit, failActionName, err)
          actionWith(commit, finallyActionName, err)
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
  func.successActionName = successActionName
  func.failActionName = failActionName

  func.toString = function () {
    return actionName
  }

  return func
}

export const actionCreators = (map) => {
  const extract = (baseName, option, intial) => {
    return reduce(option, (result, func, name) => {
      const actionName = name |> baseName |> actionNameCreator
      if (isPlainObject(func)) {
        extract(actionName, func, result)
      } else {
        result[camelCase(`${baseName}/${kebabCase(name)}`)] = actionCreator(actionName, func)
      }
      return result
    }, intial)
  }
  return extract('', map, {})
}
