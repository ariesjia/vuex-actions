import isArray from 'lodash/isArray'
import mapValues from 'lodash/mapValues'

let Vue
let store

class Store {
	constructor() {
		if (!Vue && typeof window !== 'undefined' && window.Vue) {
			install(window.Vue)
		}

		const silent = Vue.config.silent
		Vue.config.silent = true
		this._vm = new Vue({
			data: {
				$$pending: {}
			},
		})
		Vue.config.silent = silent
	}
}

const prototypeAccessors = { state: { configurable: true } }

prototypeAccessors.state.get = function () { return this._vm._data.$$pending }

prototypeAccessors.state.set = function (value) {
	this._vm._data.$$pending = value
}

Object.defineProperties( Store.prototype, prototypeAccessors )

const init = () => {
	store = new Store(Vue)
}

const checkInstalled = () => {
	if(!store) {
		if (!Vue && typeof window !== 'undefined' && window.Vue) {
			install(window.Vue)
			return true
		} else {
			console.error('[vue-actions]: please use "Vue.install(vueActions)" to install first')
		}
	}
	return !!store
}

export const setPending = (actionName, status) => {
	if(checkInstalled()) {
		store._vm.$set(
			store._vm._data.$$pending, actionName, status
		)
	}
}

const getPending = (state) => (actionName) => {
	return !!state[actionName]
}

export default function(config) {
	return mapValues(config, (item) => {
		return () => {
			const state = store.state
			if(isArray(item)) {
				return item.some(getPending(state))
			}
			else {
				return getPending(state)(item)
			}
		}
	})
}

export const install =  (_Vue) => {
	if (install.installed && Vue === _Vue) {
		return false
	}

	Vue = _Vue

	install.installed = true

	init()

	Object.defineProperty(Vue.prototype, '$vueActions', {
		get () {return {
			pending: store
		}}
	})
}
