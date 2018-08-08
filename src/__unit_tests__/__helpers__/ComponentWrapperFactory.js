import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import { createVuexStore } from './vuexStoreFactory';

const _createConfiguredLocalVue = Symbol('createConfiguredLocalVue');

export default class ComponentWrapperFactory {
  constructor() {
    this[_createConfiguredLocalVue]();

    window.requestAnimationFrame = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  }

  [_createConfiguredLocalVue]() {
    this.configuredLocalVue = createLocalVue();
    this.configuredLocalVue.use(Vuetify);
    this.configuredLocalVue.use(Vuelidate);
    this.configuredLocalVue.use(Vuex);
  }

  createWrapper(vueTestWrapperElements) {
    if (vueTestWrapperElements.vuexStoreStubs) {
      this.store = createVuexStore(vueTestWrapperElements.vuexStoreStubs);
    }

    const wrapper = mount(vueTestWrapperElements.componentToTest, {
      store: this.store,
      localVue: this.configuredLocalVue,
    });

    if (vueTestWrapperElements.componentTestData) {
      wrapper.setData(vueTestWrapperElements.componentTestData);
    }

    return wrapper;
  }
}

