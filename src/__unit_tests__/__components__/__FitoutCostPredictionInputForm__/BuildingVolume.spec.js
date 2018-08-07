
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
    wrapper.find('#averageFloorHeightInput').setValue(costPredictionFloorInputs.averageFloorHeight);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    
    costPredictionFloorInputs = {
      floorArea: 10000,
      averageFloorHeight: 2.5,
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

  describe('Update Vuex store with building dimensions', () => {
    it('should update the Vuex store with the floor area', async () => {
      populateFloorSizeInputs();

      const indexOfFinalCallToUpdateVolume = buildingVolumeStoreModule.mutations
        .UPDATE_FLOOR_AREA.mock.calls.length - 1;

      expect(buildingVolumeStoreModule.mutations
        .UPDATE_FLOOR_AREA.mock.calls[indexOfFinalCallToUpdateVolume][1]).toBe('10000');
    });

    it('should update the Vuex store with the average floor height', async () => {
      populateFloorSizeInputs();

      const indexOfFinalCallToUpdateVolume = buildingVolumeStoreModule.mutations
        .UPDATE_AVERAGE_FLOOR_HEIGHT.mock.calls.length - 1;

      expect(buildingVolumeStoreModule.mutations
        .UPDATE_AVERAGE_FLOOR_HEIGHT.mock.calls[indexOfFinalCallToUpdateVolume][1]).toBe('2.5');
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
      buildingVolumeStoreModule.getters.getFloorAreaValue = 
        () => (9999.99999);

      buildingVolumeStoreModule.getters.getAverageFloorHeightValue = 
        () => (2.49999999);

      wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
  
      populateFloorSizeInputs();
      
      expect(getFinalCallMadeToUpdateVolumeValidStatus()[1]).toBe(true);
    });

    it('should set the building volume as valid', async () => {
      buildingVolumeStoreModule.getters.getFloorAreaValue = 
        jest.fn(() => (costPredictionFloorInputs.floorArea));

      buildingVolumeStoreModule.getters.getAverageFloorHeightValue = 
        jest.fn(() => (costPredictionFloorInputs.averageFloorHeight));

      wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      
      populateFloorSizeInputs();
      
      expect(getFinalCallMadeToUpdateVolumeValidStatus()[1]).toBe(false);
    });

    it('should display invalid floor area and floor height error message if inputs set to dirty', async () => {
      expect(wrapper.vm.$v.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.averageFloorHeight.$error).toBeFalse();

      wrapper.vm.$options.watch.getAreVolumeInputsDirty.call(wrapper.vm, true); 

      expect(wrapper.vm.$v.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.averageFloorHeight.$error).toBeTrue();
    });
  });
});
