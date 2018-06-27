
import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import FitoutCostPredictor from '../components/FitoutCostPredictor.vue';
import FitoutCostPredictorApi, { mockGetFitoutCostPrediction } from '../api/fitoutCostPredictorApi';

jest.mock('../api/fitoutCostPredictorApi');

const fitoutCostPredictorApi = new FitoutCostPredictorApi();

describe('FitoutCostPredictor.vue', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockGetFitoutCostPrediction.mockClear();
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(FitoutCostPredictor);
  
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Predict cost', () => {
    it('should call the cost predictor API with the data (e.g. floor area) needed to make prediction', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(FitoutCostPredictor);
      const costPredictionParameters = {
        floorArea: '100',
        floorHeight: '1.5',
      };

      wrapper.find('#floorAreaInput').setValue(costPredictionParameters.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionParameters.floorHeight);

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      
      expect(mockGetFitoutCostPrediction)
        .toHaveBeenCalledWith(costPredictionParameters);
    });

    it('should display the predicted cost and accuracy', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(FitoutCostPredictor);

      const floorAreaInput = wrapper.find('#floorAreaInput');
      floorAreaInput.setValue('100');
      const floorHeightInput = wrapper.find('#floorHeightInput');
      floorHeightInput.setValue('1.5');

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();

      // get stubbed cost prediction and prediction accuracy from mocked prediction API, 
      // in order to check that these data are displaying to the user
      const { cost, predictionAccuracy } = fitoutCostPredictorApi.getFitoutCostPrediction().data;
      
      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(cost)).toBeTruthy();
      expect(wrapper.find('#displayedPredictionAccuracy').element.textContent.includes(predictionAccuracy)).toBeTruthy();
    });
  });
});
