
import Vue from 'vue';
import testUtilsWrapperFactory from '../../__helpers__/test_utils_wrapper_factory';
import BuildingVolume from '../../../components/FitoutCostPredictorInputForm/BuildingVolume.vue';
import buildingVolumeStoreModule from '../../../store/modules/buildingVolumeStoreModule';

jest.mock('../../../store/modules/buildingVolumeStoreModule');

Vue.config.silent = true;

describe('BuildingVolume.vue', () => {
  let wrapper;
  let vueTestWrapperElements;
  let costPredictionFloorInputs;

  const populateFloorSizeInputs = () => {
    wrapper.find('#floorAreaInput').setValue(costPredictionFloorInputs.floorArea);
    wrapper.find('#floorHeightInput').setValue(costPredictionFloorInputs.floorHeight);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    costPredictionFloorInputs = {
      floorArea: '10000',
      floorHeight: '2.5',
    };

    vueTestWrapperElements = {
      componentToTest: BuildingVolume,
      vuexStoreStubs: {
        stubbedVuexMutations: buildingVolumeStoreModule.mutations,
        stubbedVuexGetters: buildingVolumeStoreModule.getters,
      },
    };

    wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Update Vuex store with building volume', () => {
    it('should update the Vuex store with the building volume', async () => {
      populateFloorSizeInputs();

      const indexOfFinalCallToUpdateVolume = buildingVolumeStoreModule.mutations
        .UPDATE_BUILDING_VOLUME_VALUE.mock.calls.length - 1;

      expect(buildingVolumeStoreModule.mutations
        .UPDATE_BUILDING_VOLUME_VALUE.mock.calls[indexOfFinalCallToUpdateVolume][1]).toBe(25000);
    });
  });

  describe('Validate building dimensions inputs', () => {
    const getFinalCallMadeToUpdateVolumeValidStatus = () => {
      const indexOfFinalUpdateCall = buildingVolumeStoreModule.mutations
        .UPDATE_IS_BUILDING_VOLUME_INVALID.mock.calls.length - 1;

      const finalCall = buildingVolumeStoreModule.mutations
        .UPDATE_IS_BUILDING_VOLUME_INVALID.mock.calls[indexOfFinalUpdateCall];

      return finalCall;
    }; 

    it('should set the building volume as invalid', async () => {
      expect(buildingVolumeStoreModule.mutations
        .UPDATE_IS_BUILDING_VOLUME_INVALID.mock.calls[0][1]).toBe(true);

      costPredictionFloorInputs.floorArea = 9999.9999;
      costPredictionFloorInputs.floorHeight = 2.49;
  
      populateFloorSizeInputs();
      
      expect(getFinalCallMadeToUpdateVolumeValidStatus()[1]).toBe(true);
    });

    it('should set the building volume as valid', async () => {
      populateFloorSizeInputs();
      
      expect(getFinalCallMadeToUpdateVolumeValidStatus()[1]).toBe(false);
    });

    it('should display invalid floor area and floor height error message if inputs set to dirty', async () => {
      expect(wrapper.vm.$v.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.floorHeight.$error).toBeFalse();

      wrapper.vm.$options.watch.getAreVolumeInputsDirty.call(wrapper.vm, true); 

      expect(wrapper.vm.$v.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.floorHeight.$error).toBeTrue();
    });
  });
});
