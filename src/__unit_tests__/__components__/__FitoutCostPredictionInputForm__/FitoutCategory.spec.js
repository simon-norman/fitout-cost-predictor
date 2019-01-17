
import Vue from 'vue';
import FitoutCategory from '../../../components/FitoutCostPredictorInputForm/FitoutCategory.vue';
import fitoutCategoryStoreModule from '../../../store/modules/fitoutCategoryStoreModule';
import fitoutCostPredictorStoreModule from '../../../store/modules/fitoutCostPredictorStoreModule';
import ShallowComponentWrapperFactory from '../../__helpers__/ShallowComponentWrapperFactory';

jest.mock('../../../store/modules/fitoutCategoryStoreModule');

Vue.config.silent = true;

describe('FitoutCategory.vue', () => {
  let wrapper;
  let shallowComponentWrapperFactory;
  let vueTestWrapperElements;
  let stubbedVuexGetters;

  const populateCatABInputs = () => {
    wrapper.find('.isCatAAndBIncludedInput .v-input--selection-controls__ripple').trigger('click');
  };

  const setVueTestWrapperElements = () => {  
    vueTestWrapperElements = {
      componentToTest: FitoutCategory,
      vuexStoreStubs: {
        stubbedVuexMutations: fitoutCategoryStoreModule.mutations,
        stubbedVuexGetters,
      },
    };
  };

  const createWrapper = () => {
    shallowComponentWrapperFactory = new ShallowComponentWrapperFactory();
    wrapper = shallowComponentWrapperFactory.createWrapper(vueTestWrapperElements);
  };

  const createWrapperWithFitoutCategoryStubbed = (fitoutCategory) => {
    fitoutCategoryStoreModule.getters.getFitoutCategory = () => (fitoutCategory);
    stubbedVuexGetters = 
      Object.assign({}, fitoutCategoryStoreModule.getters, fitoutCostPredictorStoreModule.getters);

    setVueTestWrapperElements();

    createWrapper();
  };

  beforeEach(() => {
    jest.clearAllMocks();

    createWrapperWithFitoutCategoryStubbed({ isCatAIncluded: false, isCatBIncluded: false });
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
    it('should set the fitout category as invalid and then display an error, when form is set to dirty, if NEITHER Cat A and B are included', async () => {      
      jest.clearAllMocks();
      createWrapperWithFitoutCategoryStubbed({ isCatAIncluded: false, isCatBIncluded: false });
      
      wrapper.vm.$options.watch.fitoutCategory.call(wrapper.vm);
      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[1][1]).toBe(true);

      wrapper.vm.$options.watch.getAreFitoutCostInputsDirty.call(wrapper.vm, true);  
      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeTrue();
    });

    it('should set the fitout category as valid and not display an error, when form is set to dirty, if Cat A included', async () => {
      createWrapperWithFitoutCategoryStubbed({ isCatAIncluded: true, isCatBIncluded: false });

      wrapper.vm.$options.watch.fitoutCategory.call(wrapper.vm);
      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[1][1]).toBe(false);

      wrapper.vm.$options.watch.getAreFitoutCostInputsDirty.call(wrapper.vm, true);   
      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeFalse();
    });

    it('should set the fitout category as valid and not display an error, when form is set to dirty, if Cat B included', async () => {
      createWrapperWithFitoutCategoryStubbed({ isCatAIncluded: false, isCatBIncluded: true });

      wrapper.vm.$options.watch.fitoutCategory.call(wrapper.vm);
      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[1][1]).toBe(false);

      wrapper.vm.$options.watch.getAreFitoutCostInputsDirty.call(wrapper.vm, true);      
      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeFalse();
    });

    it('should set the fitout category as valid and not display an error, when form is set to dirty, if Cat A and B ARE BOTH included', async () => {
      createWrapperWithFitoutCategoryStubbed({ isCatAIncluded: true, isCatBIncluded: true });

      wrapper.vm.$options.watch.fitoutCategory.call(wrapper.vm);
      expect(fitoutCategoryStoreModule.mutations
        .UPDATE_IS_FITOUT_CATEGORY_INVALID.mock.calls[1][1]).toBe(false);

      wrapper.vm.$options.watch.getAreFitoutCostInputsDirty.call(wrapper.vm, true); 
      expect(wrapper.vm.$v.isEitherCatAOrBIncluded.$error).toBeFalse();
    });
  });
});
