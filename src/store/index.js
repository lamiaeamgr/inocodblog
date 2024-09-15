import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('user'),
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    login({ commit }) {
      localStorage.setItem('user', 'user');
      commit('setLoginStatus', true);
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('setLoginStatus', false);
    },
  },
});
