
import Vue from 'vue';
import ComponentWrapperFactory from './../__helpers__/ComponentWrapperFactory';
import Alert from '../../components/Alert.vue';

jest.mock('axios');
Vue.config.silent = true;

const createStubbedVuexMutations = () => {
  const stubbedMutations = {
    UPDATE_ERROR_STATUS: jest.fn(() => ''),
  };
  return stubbedMutations;
};

const createStubbedVuexGetters = () => {
  const stubbedGetters = {
    getErrorMessage: () => 'error',
    getErrorStatus: () => true,
  };
  return stubbedGetters;
};

describe('Alert.vue', () => {
  let vueTestWrapperElements;
  let componentWrapperFactory;
  let wrapper;

  beforeEach(() => {
    vueTestWrapperElements = {
      componentToTest: Alert,
      vuexStoreStubs: { 
        stubbedVuexGetters: createStubbedVuexGetters(), 
        stubbedVuexMutations: createStubbedVuexMutations(), 
      },
    };

    componentWrapperFactory = new ComponentWrapperFactory();

    wrapper = componentWrapperFactory.createWrapper(vueTestWrapperElements);
  });

  describe('Display alert', () => {
    it('should display error alert', async () => {
      await wrapper.vm.$nextTick();

      expect(wrapper.find('#errorAlert').element.style.display).toBe('');
    });

    it('should not display error alert', async () => {
      vueTestWrapperElements.vuexStoreStubs.stubbedVuexGetters.getErrorStatus = () => false;
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#errorAlert').element.style.display).toBe('none');
    });
  });
});
