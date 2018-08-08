import { shallowMount } from '@vue/test-utils';
import ComponentWrapperFactory from './ComponentWrapperFactory';
import { createVuexStore } from './vuexStoreFactory';

export default class ShallowComponentWrapperFactory extends ComponentWrapperFactory {
  createWrapper(vueTestWrapperElements) {
    if (vueTestWrapperElements.vuexStoreStubs) {
      this.store = createVuexStore(vueTestWrapperElements.vuexStoreStubs);
    }

    const wrapper = shallowMount(vueTestWrapperElements.componentToTest, {
      store: this.store,
      localVue: this.configuredLocalVue,
    });

    if (vueTestWrapperElements.componentTestData) {
      wrapper.setData(vueTestWrapperElements.componentTestData);
    }

    return wrapper;
  }
}
