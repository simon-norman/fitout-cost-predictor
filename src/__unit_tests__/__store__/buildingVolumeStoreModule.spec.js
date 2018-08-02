import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import buildingVolumeStoreModule from '../../store/modules/buildingVolumeStoreModule';

describe('buildingVolume.js', () => {
  let store;
  let buildingVolumeStoreTestState;
  let storeElements;
  
  beforeEach(() => {
    buildingVolumeStoreTestState = {
      buildingVolumeUnit: 'Cubic foot',
      buildingVolumeValue: 20000,  
    };

    storeElements = {
      storeModule: buildingVolumeStoreModule,
      storeTestState: buildingVolumeStoreTestState,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should update building volume', () => {
      expect(store.state.storeModule.buildingVolumeValue).toBe(20000);
      store.commit('UPDATE_BUILDING_VOLUME_VALUE', 30000);    
      expect(store.state.storeModule.buildingVolumeValue).toBe(30000);
    });

    /*     it('should get alert status', () => {
      expect(store.getters.getErrorStatus).toBe(false); 
    }); */
  });
});
