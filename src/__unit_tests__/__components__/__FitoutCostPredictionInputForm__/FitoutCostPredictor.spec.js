
import Vue from 'vue';
import mockAxios from 'axios';
import ShallowComponentWrapperFactory from '../../__helpers__/ShallowComponentWrapperFactory';
import FitoutCostPredictor from '../../../components/FitoutCostPredictorInputForm/FitoutCostPredictor.vue';
import fitoutCostPredictorStoreModule from '../../../store/modules/fitoutCostPredictorStoreModule';
import alerts from './../../../store/modules/alerts';

jest.mock('./../../../store/modules/alerts');
jest.mock('../../../store/modules/fitoutCostPredictorStoreModule');
jest.mock('axios');

Vue.config.silent = true;

describe('FitoutCostPredictor.vue', () => {
  let wrapper;
  let shallowComponentWrapperFactory;
  let calculatedCostPrediction;
  let costPredictionParametersExpectedToBePassedToApi;
  let vueTestWrapperElements;

  const stubbedVuexGetters = {
    getFloorAreaValue: () => 100000,
    getFloorAreaUnit: () => 'sq_m',
    getAverageFloorHeightValue: () => 3,
    getAverageFloorHeightUnit: () => 'm',
    getIsBuildingVolumeInvalid: () => false,
    getFitoutCategory: () => ({ isCatAIncluded: true, isCatBIncluded: false }),
    getIsFitoutCategoryInvalid: () => false,
  };

  const calculateCostPrediction = async () => {
    wrapper.find('#calculateCostPrediction').trigger('click');
    await wrapper.vm.$nextTick();
  };

  beforeEach(() => {
    costPredictionParametersExpectedToBePassedToApi = {
      floorArea: {
        areaValue: stubbedVuexGetters.getFloorAreaValue(),
        areaUnit: stubbedVuexGetters.getFloorAreaUnit(),
      },

      averageFloorHeight: {
        heightValue: stubbedVuexGetters.getAverageFloorHeightValue(),
        heightUnit: stubbedVuexGetters.getAverageFloorHeightUnit(),
      },
      
      isCatAIncluded: stubbedVuexGetters.getFitoutCategory().isCatAIncluded,
      isCatBIncluded: stubbedVuexGetters.getFitoutCategory().isCatBIncluded,
    };

    calculatedCostPrediction = { 
      cost: 1.53163151335624657245,
    };

    vueTestWrapperElements = {
      componentToTest: FitoutCostPredictor,
      vuexStoreStubs: {
        stubbedVuexGetters,
        stubbedVuexMutations: fitoutCostPredictorStoreModule.mutations,
      },
    };

    shallowComponentWrapperFactory = new ShallowComponentWrapperFactory();

    wrapper = shallowComponentWrapperFactory.createWrapper(vueTestWrapperElements);

    jest.clearAllMocks();

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: calculatedCostPrediction,
      }));
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Predict cost', () => {
    it('should call the cost predictor API with the data (e.g. building volume) needed to make prediction', async () => {
      await calculateCostPrediction();

      expect(mockAxios.post.mock.calls[0][1])
        .toEqual(costPredictionParametersExpectedToBePassedToApi);
    });

    it('should display the predicted cost returned by the API, correctly formatted in £m', async () => {
      await calculateCostPrediction();
      
      const costToTwoDecimals = Number.parseFloat(calculatedCostPrediction.cost).toFixed(2);
      const costFullyFormatted = `£${costToTwoDecimals}m`;
      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(costFullyFormatted)).toBeTruthy();
    });

    it('should display the predicted cost in £k if it is less than 1 million', async () => {
      calculatedCostPrediction.cost = 0.99497789798713598718310930;

      await calculateCostPrediction();
      
      const costFormattedInThousands = Number.parseFloat(calculatedCostPrediction.cost) * 1000;
      const costThreeSignificantFigures = costFormattedInThousands.toPrecision(3);
      const costFullyFormatted = `£${costThreeSignificantFigures}k`;
      expect(wrapper.find('#displayedCostPrediction').element.textContent.includes(costFullyFormatted)).toBeTruthy();
    });
  });

  describe('Prediction parameters form validation', () => {    
    it('should set prediction form dirty status to true when user selects to calculate cost', async () => {
      await calculateCostPrediction();
      
      expect(fitoutCostPredictorStoreModule
        .mutations.UPDATE_FITOUT_COST_INPUTS_DIRTY.mock.calls[0][1]).toBeTrue();
    });

    it('should set prediction form dirty status to false when cost calculated successfully', async () => {
      await calculateCostPrediction();
      
      expect(fitoutCostPredictorStoreModule
        .mutations.UPDATE_FITOUT_COST_INPUTS_DIRTY.mock.calls[1][1]).toBeFalse();
    });
  });

  describe('Handle errors', () => {
    it('should activate alert if error from calling api, by updating vuex store', async () => {
      mockAxios.post.mockImplementation(() => Promise.reject(new Error('error')));
      wrapper = shallowComponentWrapperFactory.createWrapper(vueTestWrapperElements);

      await calculateCostPrediction();

      expect(alerts.mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(alerts.mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1]);
    });

    it('should throw error and activate alert if api returns an invalid cost value', async () => {
      calculatedCostPrediction.cost = 'invalid data - not a number';
  
      await calculateCostPrediction();

      expect(alerts.mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(alerts.mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1]);
    });

    it('should throw error if api returns cost value less than 10k', async () => {
      calculatedCostPrediction.cost = '0.00999';
  
      await calculateCostPrediction();

      expect(alerts.mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(alerts.mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1]);
    });
  });
});
