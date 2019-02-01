import { actionCreator , mutationCreator } from '../src/index'

describe('actionNameCreator test', () => {

  it('should get action name by actionName field', () => {
    const actionName = 'actionName'
    const action = actionCreator(actionName)
    expect(action.actionName).toEqual(actionName)
  })

  it('should pass arguments when payload creator is null', () => {
    const actionName = 'actionName'
    const action = actionCreator(actionName)
    mutationCreator((on) => {
      on(action, state => state)
    })
    const commit = jest.fn()
    const actionValue = 1
    action({commit}, actionValue)
    expect(commit).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith(actionName, actionValue)
  });


})
