
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
    costPredictionFloorInputs = {
      floorArea: '10000',
      floorHeight: '2.5',
    };

    vueTestWrapperElements = {
      componentToTest: BuildingVolume,
    };

    wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
  });

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Update Vuex store with building volume', () => {
    it.only('should update the Vuex store with the building volume', async () => {
      populateFloorSizeInputs();
      debugger;
      expect(buildingVolumeStoreModule.mutations
        .UPDATE_BUILDING_VOLUME_VALUE.mock.calls[0][1]).toEqual(true);
    });
  });

/*   describe('Prediction parameters form validation', () => {
    it('should display error message and not call api if FLOOR AREA 
    or FLOOR HEIGHT are not inputted', async () => {
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorHeight.$error).toBeFalse();
      
      populateCatABInputs();
      populateSectorInput();

      await calculateCostPrediction();

      expect(mockAxios.post).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorHeight.$error).toBeTrue();
    });

    it('should display error message and not call api 
    if FLOOR AREA or FLOOR HEIGHT are below minimum values', async () => {
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorArea.$error).toBeFalse();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorHeight.$error).toBeFalse();

      costPredictionFloorInputs.floorArea = 999.9999;
      costPredictionFloorInputs.floorHeight = 2.49;
      fullyPopulatePredictionForm();

      await calculateCostPrediction();
      
      expect(mockAxios.post).not.toHaveBeenCalled();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorArea.$error).toBeTrue();
      expect(wrapper.vm.$v.fitoutCostPredictionInputs.floorHeight.$error).toBeTrue();
    });
  }); */
});
