import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import buildingVolumeStoreModule from '../../store/modules/buildingVolumeStoreModule';

describe('buildingVolume.js', () => {
  let store;
  let buildingVolumeStoreTestState;
  let storeElements;
  
  beforeEach(() => {
    storeElements = {
      storeModule: buildingVolumeStoreModule,
      storeTestState: buildingVolumeStoreModule.state,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should update building volume', () => {
      expect(store.state.storeModule.buildingVolumeValue).toBe('');
      store.commit('UPDATE_BUILDING_VOLUME_VALUE', 30000);    
      expect(store.state.storeModule.buildingVolumeValue).toBe(30000);
    });

    it('should update if building volume is valid', () => {
      expect(store.state.storeModule.isBuildingVolumeInvalid).toBe('');
      store.commit('UPDATE_IS_BUILDING_VOLUME_INVALID', true);    
      expect(store.state.storeModule.isBuildingVolumeInvalid).toBe(true);
    });
  });

  describe('Getters returning expected data', () => {
    it('should return if building volume form is dirty', () => {
      buildingVolumeStoreModule.state.areVolumeInputsDirty = true;
      expect(store.getters.getAreVolumeInputsDirty).toBe(true); 
    });

    it('should return building volume value', () => {
      buildingVolumeStoreModule.state.buildingVolumeValue = 10000;
      expect(store.getters.getBuildingVolumeValue).toBe(10000); 
    });

    it('should return building volume unit', () => {
      buildingVolumeStoreModule.state.buildingVolumeUnit = 'Cubic metre';
      expect(store.getters.getBuildingVolumeUnit).toBe('Cubic metre'); 
    });

    it('should return building volume is valid', () => {
      buildingVolumeStoreModule.state.isBuildingVolumeInvalid = true;
      expect(store.getters.getIsBuildingVolumeInvalid).toBe(true); 
    });
  });
});
