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

const createWrapper = (componentToTest, stubbedActions, stubbedGetters, stubbedMutations) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
  localVue.use(Vuex);

  
  const store = new Vuex.Store({
    state: {},
    actions: stubbedActions,
    getters: stubbedGetters,
    mutations: stubbedMutations,
  });
    

  const wrapper = mount(componentToTest, {
    store,
    localVue,
  });
    
  return wrapper;
};

module.exports = {
  createWrapper,
};
