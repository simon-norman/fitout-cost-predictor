import Vue from 'vue';
import Vuex from 'vuex';
import alerts from './modules/alerts';
import sectors from './modules/sectors';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alerts,
    sectors,
  },
});

