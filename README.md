# vue-actions

> utilities for vuex2

![travis-ci](https://travis-ci.org/ariesjia/vuex-actions.svg?branch=master)

## Installation

```bash
npm install vue-actions --save
```

### `actionCreator()`

```js
// store/modules/products.js
import { actionCreator , mutationCreator } from 'vue-actions'

const state = {
  list : []
};

const getters = {}

export const actions = {
  getProducts: actionCreator('GET_PRODUCTS', ({ commit }, payload) => {
    return ProductAPI.getList({
      pageSize: payload.size,
      pageIndex: payload.index
    }) // API return promise
  })
};

export const mutations = mutationCreator((on)=>{
  on(actions.getProducts,(state, )=>{
    state.list = []
  });

  on.success(actions.getProducts,(state,res)=>{
    console.log('get products success', res)
    state.list = res.data || []
  });

  on.fail(actions.getProducts,(state,sssss)=>{
    console.log('get products fail',sssss)
  });
});

export default {
  state,
  getters,
  actions,
  mutations
}

```


### `mapPending` version >= 2.3.0


```js

import vueActions from 'vue-actions'
import { actions } from '@/store/modules/user'
import { mapPending } from 'vue-actions'

Vue.use(vueActions)  // install vueActions first

// ...
computed: {
  ...mapPending({
    userloading: actions.loadUser,
    userloading: [actions.loadUser, actions.register],
  }),
},
// ...

```

