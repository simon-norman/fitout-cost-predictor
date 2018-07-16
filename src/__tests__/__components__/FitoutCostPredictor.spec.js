
import Vue from 'vue';
import mockAxios from 'axios';
import testUtilsWrapperFactory from '../__helpers__/test_utils_wrapper_factory';
import FitoutCostPredictor from '../../components/FitoutCostPredictor.vue';

jest.mock('axios');
Vue.config.silent = true;

const createStubbedVuexMutations = () => {
  const stubbedMutations = {
    UPDATE_ERROR_MESSAGE: jest.fn(() => ''),
    UPDATE_ERROR_STATUS: jest.fn(() => ''),
  };
  return stubbedMutations;
};

describe('FitoutCostPredictor.vue', () => {
  let costPredictionFloorInputs;
  let calculatedCostPrediction;
  let costPredictionApiParameters;
  let vueTestWrapperElements;

  beforeEach(() => {
    costPredictionFloorInputs = {
      floorArea: '1000',
      floorHeight: '2.5',
    };

    costPredictionApiParameters = {
      buildingVolume: parseFloat(costPredictionFloorInputs.floorArea) * 
      parseFloat(costPredictionFloorInputs.floorHeight),
      isCatAIncluded: true,
      isCatBIncluded: true,
    };

    calculatedCostPrediction = { 
      cost: 1.53163151335624657245, 
      predictionAccuracy: '65%', 
    };

    vueTestWrapperElements = {
      componentToTest: FitoutCostPredictor,
      componentTestData: {
        fitoutPredictionParameters: {
          floorArea: '',
          floorHeight: '',
          isCatAIncluded: true,
          isCatBIncluded: true,
        },
      },
      vuexStoreStubs: { 
        stubbedVuexMutations: createStubbedVuexMutations(), 
      },
    };

    mockAxios.post.mockClear();

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: calculatedCostPrediction,
      }));
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
  
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Predict cost', () => {
    it('should call the cost predictor API with the data (e.g. floor area) needed to make prediction', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
      await wrapper.vm.$nextTick();

      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      expect(mockAxios.post.mock.calls[0][1]).toEqual(costPredictionApiParameters);
    });

    it('should display the predicted cost and accuracy returned by the API, correctly formatted in £m', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      
      wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
      await wrapper.vm.$nextTick();
      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      
      const costToTwoDecimals = Number.parseFloat(calculatedCostPrediction.cost).toFixed(2);
      const costFullyFormatted = `£${costToTwoDecimals}m`;

      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(costFullyFormatted)).toBeTruthy();
    });

    it('should display the predicted cost in £k if it is less than 1 million', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      calculatedCostPrediction.cost = 0.99497789798713598718310930;

      wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
      await wrapper.vm.$nextTick();
      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      
      const costFormattedInThousands = Number.parseFloat(calculatedCostPrediction.cost) * 1000;
      const costThreeSignificantFigures = costFormattedInThousands.toPrecision(3);
      const costFullyFormatted = `£${costThreeSignificantFigures}k`;

      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(costFullyFormatted)).toBeTruthy();
    });

    it('should display error message and not call api if FLOOR AREA or FLOOR HEIGHT are not inputted', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorHeight.$error).toBeFalse();

      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      
      expect(mockAxios.post).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorHeight.$error).toBeTrue();
    });

    it('should display error message and not call api if FLOOR AREA or FLOOR HEIGHT are below minimum values', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorHeight.$error).toBeFalse();

      wrapper.find('#floorHeightInput').setValue(2.49);
      wrapper.find('#floorAreaInput').setValue(999.99);
      await wrapper.vm.$nextTick();
      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      
      expect(mockAxios.post).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.fitoutPredictionParameters.floorHeight.$error).toBeTrue();
    });

    it('should display error message and not call api if BOTH Cat A and Cat B options are NOT selected', async () => {
      vueTestWrapperElements.componentTestData.fitoutPredictionParameters.isCatAIncluded = false;
      vueTestWrapperElements.componentTestData.fitoutPredictionParameters.isCatBIncluded = false;
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);

      wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
      wrapper.find('#calculateCostPrediction').trigger('click');
      await wrapper.vm.$nextTick();
      
      expect(mockAxios.post).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutPredictionParameters.isCatAIncluded.$error).toBeTrue();
      expect(wrapper.vm.$v.fitoutPredictionParameters.isCatBIncluded.$error).toBeTrue();
    });

    it('should activate alert if error from calling api, by updating vuex store', async () => {
      mockAxios.post.mockImplementation(() => Promise.reject());
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);

      wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
      wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
  
      await wrapper.vm.$nextTick();
  
      wrapper.find('#calculateCostPrediction').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(vueTestWrapperElements.vuexStoreStubs
        .stubbedVuexMutations.UPDATE_ERROR_STATUS.mock.calls[0][1])
        .toEqual(true);

      expect(vueTestWrapperElements.vuexStoreStubs
        .stubbedVuexMutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1])
        .toEqual(wrapper.vm.errorMessage);
    });
  });
});
