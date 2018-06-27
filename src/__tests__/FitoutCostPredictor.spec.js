
import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import FitoutCostPredictor from '../components/FitoutCostPredictor.vue';
import FitoutCostPredictorApi from '../api/fitoutCostPredictorApi';

jest.mock('../api/fitoutCostPredictorApi');

describe('FitoutCostPredictor.vue', () => {
  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(FitoutCostPredictor);
  
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Predict cost', () => {
    it('should display the predicted cost', () => {
      // mock api - post call to calculate cost and return calculated cost      
      // Load wrapper
      // populate fields with data
      // next tick
      // select to calculate cost
      // next tick
      // check that correct data sent to api
      // check that calculated cost displayed
    });
  });
});
