import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import CostPredictor from '../components/CostPredictor.vue';

describe('CostPredictor.vue', () => {
  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(CostPredictor);
  
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });
});
