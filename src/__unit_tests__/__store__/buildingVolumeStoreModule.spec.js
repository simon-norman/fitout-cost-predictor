import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import buildingVolumeStoreModule from '../../store/modules/buildingVolumeStoreModule';

describe('buildingVolume.js', () => {
  let store;
  let storeElements;
  
  beforeEach(() => {
    storeElements = {
      storeModule: buildingVolumeStoreModule,
      storeTestState: buildingVolumeStoreModule.state,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should update and get average floor height', () => {
      expect(store.getters.getAverageFloorHeightValue).toBe('');
      store.commit('UPDATE_AVERAGE_FLOOR_HEIGHT', 3);    
      expect(store.getters.getAverageFloorHeightValue).toBe(3);
    });

    it('should update and get floor area', () => {
      expect(store.getters.getFloorAreaValue).toBe('');
      store.commit('UPDATE_FLOOR_AREA', 30000);    
      expect(store.getters.getFloorAreaValue).toBe(30000);
    });

    it('should update if building volume is valid', () => {
      expect(store.state.storeModule.isBuildingVolumeInvalid).toBe('');
      store.commit('UPDATE_IS_BUILDING_VOLUME_INVALID', true);    
      expect(store.state.storeModule.isBuildingVolumeInvalid).toBe(true);
    });
  });

  describe('Getters returning expected data', () => {
    it('should return if building volume form is dirty', () => {
      store.state.storeModule.areVolumeInputsDirty = true;
      expect(store.getters.getAreVolumeInputsDirty).toBe(true); 
    });

    it('should return building area unit', () => {
      store.state.storeModule.floorArea.areaUnit = 'sq_ft';
      expect(store.getters.getFloorAreaUnit).toBe('sq_ft'); 
    });

    it('should return floor height unit', () => {
      store.state.storeModule.averageFloorHeight.heightUnit = 'ft';
      expect(store.getters.getAverageFloorHeightUnit).toBe('ft'); 
    });

    it('should return building volume is valid', () => {
      store.state.storeModule.isBuildingVolumeInvalid = true;
      expect(store.getters.getIsBuildingVolumeInvalid).toBe(true); 
    });
  });
});
