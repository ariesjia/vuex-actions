import isFunction from 'lodash/isFunction'

export function getActionName(actionCreator, type) {
  const name = isFunction(actionCreator) ? actionCreator.toString() : actionCreator
  return `${name}${type ? ('__'+type).toUpperCase(): ''}`
}