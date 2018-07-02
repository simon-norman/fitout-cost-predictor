
import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import Alert from '../components/Alert.vue';

jest.mock('axios');

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
  describe('Display alert', () => {
    it('should display error alert', async () => {
      const stubbedVuexMutations = createStubbedVuexMutations();
      const stubbedVuexGetters = createStubbedVuexGetters();
      const wrapper = testUtilsWrapperFactory.createWrapper(
        Alert, undefined, 
        stubbedVuexGetters, stubbedVuexMutations,
      );

      await wrapper.vm.$nextTick();

      expect(wrapper.find('#errorAlert').hasStyle('display', 'none')).toBe(false);
    });

    it('should not display error alert', async () => {
      const stubbedVuexMutations = createStubbedVuexMutations();
      const stubbedVuexGetters = createStubbedVuexGetters();
      stubbedVuexGetters.getErrorStatus = () => false;
      const wrapper = testUtilsWrapperFactory.createWrapper(
        Alert, undefined, 
        stubbedVuexGetters, stubbedVuexMutations,
      );

      await wrapper.vm.$nextTick();

      expect(wrapper.find('#errorAlert').hasStyle('display', 'none')).toBe(true);
    });
  });
});
