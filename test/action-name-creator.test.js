import { actionNameCreator } from '../src/index'

describe('actionNameCreator test', () => {
  it('should get namespaced action name', () => {
    const namesapce = actionNameCreator('TEST')
    expect(namesapce('A')).toEqual('TEST/A')
  })

  it('should set action name to upper case', () => {
    const namesapce = actionNameCreator('test')
    expect(namesapce('A')).toEqual('TEST/A')
  })
})
