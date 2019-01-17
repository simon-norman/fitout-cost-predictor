import Vuex from 'vuex';
import Vue from 'vue';
import { cloneDeep } from 'lodash';

Vue.use(Vuex);

const createStandaloneVuexStore = (storeElements) => {
  const storeModule = cloneDeep(storeElements.storeModule);
  storeModule.state = storeElements.storeTestState;

  const store = new Vuex.Store({
    modules: {
      storeModule,
    },
  });
  return store;
};

module.exports = {
  createStandaloneVuexStore,
};
