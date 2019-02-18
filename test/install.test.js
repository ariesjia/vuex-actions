import Vue from 'vue'
import vueActions from '../src/index'

describe('install', () => {
  it('should get $vueActions when install vueActions', () => {
    Vue.use(vueActions)
    const instance = new Vue()
    expect(instance.$vueActions).toBeDefined()
    expect(instance.$vueActions.pending).toBeDefined()
    expect(instance.$vueActions.pending.state).toEqual({})
  })
})
