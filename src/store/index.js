import { createStore } from 'vuex';

export default createStore({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
    }
  },
  actions: {}
})
