# vue-actions

> utilities for vuex2


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

  on.success(actions.getProducts,(state,sssss)=>{
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