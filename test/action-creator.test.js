import { actionCreator , mutationCreator } from '../src/index'

describe('actionNameCreator test', () => {

  it('should get action name by actionName field', () => {
    const actionName = 'actionName'
    const action = actionCreator(actionName)
    expect(action.actionName).toEqual(actionName)
  })

  it('should pass action dispatch arguments when payload creator is null', () => {
    const actionName = 'testAction'
    const action = actionCreator(actionName)
    mutationCreator((on) => {
      on(action, state => state)
    })
    const commit = jest.fn()
    const actionValue = 1
    action({commit}, actionValue)
    expect(commit).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith(actionName, actionValue)
  })

  it('should return function result when payload creator is function', () => {
    const actionName = 'testFunctionAction'
    const actionValue = {
      type: 'test'
    }
    const action = actionCreator(actionName, function(context, payload) {
      return actionValue.type + payload
    })
    mutationCreator((on) => {
      on(action, state => state)
    })
    const commit = jest.fn()
    const actionArgument = 'xxxx'
    action({commit}, actionArgument)
    expect(commit).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith(actionName, actionValue.type + actionArgument)
  })

  it('should access state in action creator function', () => {
    const actionName = 'testFunctionAction'
    const action = actionCreator(actionName, function(context, payload) {
      return context.state.value * 2 * payload
    })
    const commit = jest.fn()
    const mockState = { value : 2 }
    mutationCreator((on) => {
      on(action, state => state)
    })
    action({commit, state: mockState}, 2)
    expect(commit).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith(actionName, 8)
  })

  it('should access getter in action creator function', () => {
    const actionName = 'testFunctionAction'
    const action = actionCreator(actionName, function(context) {
      return context.getters.name
    })
    const commit = jest.fn()
    const mockGetters = {
      name: Object.defineProperties({}, {
        get() {
          return 'Hello Word'
        }
      })
    }
    mutationCreator((on) => {
      on(action, state => state)
    })
    action({commit, getters: mockGetters}, 'xxxx')
    expect(commit).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith(actionName, mockGetters.name)
  })

})
