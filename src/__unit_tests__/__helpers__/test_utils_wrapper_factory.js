import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';

// Stub out Window.requestAnimationFrame, which is called when Vuetify components
// mounted as part of the test. This is because JSDOM does not implement requestAnimationFrame
window.requestAnimationFrame = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

const createVuexStore = (vuexStoreStubs) => {  
  const store = new Vuex.Store({
    state: {},
    mutations: vuexStoreStubs.stubbedVuexMutations, 
    actions: vuexStoreStubs.stubbedVuexActions,
    getters: vuexStoreStubs.stubbedVuexGetters,
  });
  return store;
};

const createdConfiguredLocalVue = () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
  localVue.use(Vuex);
  return localVue;
};

const createWrapper = (vueTestWrapperElements) => {
  let store;

  const configuredLocalVue = createdConfiguredLocalVue();

  if (vueTestWrapperElements.vuexStoreStubs) {
    store = createVuexStore(vueTestWrapperElements.vuexStoreStubs);
  }

  const wrapper = mount(vueTestWrapperElements.componentToTest, {
    store,
    localVue: configuredLocalVue,
  });

  if (vueTestWrapperElements.componentTestData) {
    wrapper.setData(vueTestWrapperElements.componentTestData);
  }
  return wrapper;
};

module.exports = {
  createWrapper,
};
