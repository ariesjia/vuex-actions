import flushPromises from 'flush-promises'
import { actionCreator, mapPending } from '../src/index'

const Defer = () => {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return {
    promise,
    resolve,
    reject
  }
}


describe.skip('mapPending test', () => {
  it('should get pending status is true when action is promise and is in pending status', () => {
    const actionName = 'testAction'
    const defer = Defer()
    const action = actionCreator(actionName, () => {
      return defer.promise
    })
    const commit = jest.fn()
    action({commit})
    expect(mapPending({
      loading: action
    }).loading()).toEqual(true)
  })

  it('should get pending status is false when action is promise and is in complete status', async () => {
    const actionName = 'testAction'
    const defer = Defer()
    const action = actionCreator(actionName, () => {
      return defer.promise
    })
    const commit = jest.fn()
    action({commit})
    defer.resolve()
    await flushPromises()
    expect(mapPending({
      loading: action
    })).toEqual({
      loading: false
    })
  })

  it('should get pending status is false when action is promise and is in reject status', async () => {
    const actionName = 'testAction'
    const defer = Defer()
    const action = actionCreator(actionName, () => {
      return defer.promise
    })
    const commit = jest.fn()
    action({commit})
    defer.reject()
    await flushPromises()
    expect(mapPending({
      loading: action
    })).toEqual({
      loading: false
    })
  })

  it('should get pending status is false when action is not promise ', () => {
    const actionName = 'testAction'
    const action = actionCreator(actionName)
    const commit = jest.fn()
    action({commit})
    expect(mapPending({
      loading: action
    })).toEqual({
      loading: false
    })
  })
})
