# vue-actions

> utilities for vuex


## Installation

```bash
npm install vue-actions --save
```

### `actionCreator()`


```js
//  actions/ui.js

import { actionCreator , actionTypePrefixCreator } from 'vuex-actions';
import { uniqueId } from 'lodash';

const actionTypeCreator = actionTypePrefixCreator(uniqueId());

// === if you use webpack you can use filename as unique string === 
//const actionTypeCreator = actionTypePrefixCreator(__filename);

export const showToast = actionCreator(
	actionTypeCreator('SHOW_TOAST'), ({ dispatch, state },text,type)=>{
		return {
			text,
			loading : type == 'LOADING'
		}
	}
);

export const hideToast = actionCreator(
	actionTypeCreator('HIDE_TOAST')
);
```

### `mutationCreator()`

```js
//  modules/ui.js

import { mutationCreator } from 'vuex-actions';
import * as uiActions from '../actions/ui';

const state = {
	shouldShowToast : true
};

export default mutationCreator((on)=>{

	on(uiActions.showToast,(ui)=>{
		ui.shouldShowToast = true;
	});

	on(uiActions.hideToast,(ui)=>{
		ui.shouldShowToast = false;
	});

},state);
```


## async

```js
//  actions/user.js

export const login = actionCreator(
	actionTypeCreator('USER_LOGIN'),({ dispatch, state },username,password)=>{
		return userApi.login(username,password)
	}
);
```


```js
//  modules/user.js

import * as userActions from '../actions/user';

export default mutationCreator((on)=>{

	on(userActions.login,(state)=>{
		console.log('login');
	});

	on.success(userActions.login,(state,user)=>{
		console.log('login success',user);
		state.user = user;
	});
	
	on.fail(userActions.login,(state,err)=>{
        console.log('login fail',err);
    });

	on.finally(userActions.login,(state)=>{
		console.log('login finally');
	});

},{});
```


