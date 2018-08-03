
import Vue from 'vue';
import testUtilsWrapperFactory from '../../__helpers__/test_utils_wrapper_factory';
import FitoutCategory from '../../../components/FitoutCostPredictorInputForm/FitoutCategory.vue';
import fitoutCategoryStoreModule from '../../../store/modules/fitoutCategoryStoreModule';

jest.mock('../../../store/modules/fitoutCategoryStoreModule');

Vue.config.silent = true;

describe('FitoutCategory.vue', () => {
  let wrapper;
  let stubbedVuexMutations;
  let vueTestWrapperElements;
  let costPredictionFloorInputs;

  const populateCatABInputs = () => {
    wrapper.find('.isCatAAndBIncludedInput .v-input--selection-controls__ripple').trigger('click');
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    fitoutCategoryStoreModule.getters.getFitoutCategory = 
      () => ({ isCatAIncluded: true, isCatBIncluded: true });

    vueTestWrapperElements = {
      componentToTest: FitoutCategory,
      vuexStoreStubs: {
        stubbedVuexMutations: fitoutCategoryStoreModule.mutations,
        stubbedVuexGetters: fitoutCategoryStoreModule.getters,
      },
    };

    wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Update Vuex store with fitout category', () => {
    it('should update the Vuex store with the fitout category', async () => {
      populateCatABInputs();

      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_CAT_AB_INCLUDED.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Validate fitout category input', () => {
    it('should set the fitout category as invalid', async () => {
      jest.clearAllMocks();

      fitoutCategoryStoreModule.getters.getFitoutCategory = 
      () => ({ isCatAIncluded: false, isCatBIncluded: false });

      wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);

      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[0][1]).toBe(true);
    });

    it('should set the fitout category as valid', async () => {
      populateCatABInputs();
      
      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[0][1]).toBe(false);
    });

    it('should display invalid floor area and floor height error message if inputs set to dirty', async () => {
      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeFalse();

      wrapper.vm.$options.watch.getAreFitoutCategoryInputsDirty.call(wrapper.vm, true); 

      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeFalse();
    });
  });
});
