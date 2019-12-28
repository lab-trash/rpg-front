import Vue from 'vue';
import Vuex from 'vuex';
import AuthenticationStore from './containers/Users/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthenticationStore,
  },
});
