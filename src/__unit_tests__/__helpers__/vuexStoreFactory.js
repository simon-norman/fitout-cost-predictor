import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const createVuexStore = (vuexStoreStubs) => {
  const store = new Vuex.Store({
    state: {},
    mutations: vuexStoreStubs.stubbedVuexMutations, 
    actions: vuexStoreStubs.stubbedVuexActions,
    getters: vuexStoreStubs.stubbedVuexGetters,
  });
  return store;
};

module.exports = {
  createVuexStore,
};
