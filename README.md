# vue-actions

> utilities for vuex2


## Installation

```bash
npm install vue-actions --save
```

### `actionCreator()`


```js
// store/modules/ui.js

import { actionCreator , mutationCreator } from 'vue-actions'
const SET_PROGRESS = 'SET_PROGRESS'


const state = {
	shouldShowButton : true,
	progress : 0
};

const getters = {
	progress: state => state.progress
}

const setProgress = actionCreator('SET_PROGRESS',function({ commit }){

	const actionName = this.successActionName;

	return new Promise((resolve,reject)=>{
		window.setTimeout(()=>{
			resolve(40)
		},1000);
		window.setTimeout(()=>{
			commit(actionName,60)
		},2000)
		window.setTimeout(()=>{
			commit(actionName,100)
		},3000)
	})
});

export const actions = {
	setProgress
};

export const mutations = mutationCreator((on)=>{

	on(setProgress,(state,sssss)=>{
		state.progress = sssss
	});

	on.success(setProgress,(state,sssss)=>{
		console.log('setProgress success',sssss)
		state.progress = sssss
	});

});

export default {
	state,
	getters,
	actions,
	mutations
}

```