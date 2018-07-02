
import mockAxios from 'axios';
import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import FitoutCostPredictor from '../components/FitoutCostPredictor.vue';

jest.mock('axios');

const createMutations = () => {
  const mutations = {
    UPDATE_ERROR_MESSAGE: jest.fn(() => ''),
    UPDATE_ERROR_STATUS: jest.fn(() => ''),
  };
  return mutations;
};

describe('FitoutCostPredictor.vue', () => {
  const costPredictionParameters = {
    floorArea: '100',
    floorHeight: '1.5',
  };

  const calculatedCostPrediction = { 
    cost: 10000, 
    predictionAccuracy: '65%', 
  };

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockAxios.get.mockClear();

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: calculatedCostPrediction,
      }));
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);
  
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Predict cost', () => {
    it('should call the cost predictor API with the data (e.g. floor area) needed to make prediction', async () => {
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);

      wrapper.find('#floorAreaInput').setValue(costPredictionParameters.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionParameters.floorHeight);

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      
      expect(mockAxios.get.mock.calls[0][1]).toEqual(costPredictionParameters);
    });

    it('should display the predicted cost and accuracy returned by the API', async () => {
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);

      wrapper.find('#floorAreaInput').setValue(costPredictionParameters.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionParameters.floorHeight);

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      
      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(calculatedCostPrediction.cost)).toBeTruthy();
      expect(wrapper.find('#displayedPredictionAccuracy').element.textContent.includes(calculatedCostPrediction.predictionAccuracy)).toBeTruthy();
    });

    it('should display error message and not call the prediction API if FLOOR AREA is not inputted', async () => {
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeFalse();

      wrapper.find('#floorHeightInput').setValue(costPredictionParameters.floorHeight);

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      
      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeTrue();
    });

    it('should display error message and not call the prediction API if FLOOR HEIGHT is not inputted', async () => {
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeFalse();

      wrapper.find('#floorAreaInput').setValue(costPredictionParameters.floorHeight);

      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      
      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorHeight.$error).toBeTrue();
    });

    it('should activate alert if error from calling api, by updating vuex store', async () => {
      mockAxios.get.mockImplementation(() =>
        Promise.reject());
      const mutations = createMutations();
      const wrapper = 
        testUtilsWrapperFactory.createWrapper(FitoutCostPredictor, undefined, undefined, mutations);

      wrapper.find('#floorAreaInput').setValue(costPredictionParameters.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionParameters.floorHeight);
  
      await wrapper.vm.$nextTick();
  
      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1]).toEqual(wrapper.vm.errorMessage);
    });
  });
});
