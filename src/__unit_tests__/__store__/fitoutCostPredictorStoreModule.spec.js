import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import fitoutCostPredictorStoreModule from '../../store/modules/fitoutCostPredictorStoreModule';

describe('fitoutCategoryStoreModule.js', () => {
  let store;
  let storeElements;
  
  beforeEach(() => {
    storeElements = {
      storeModule: fitoutCostPredictorStoreModule,
      storeTestState: fitoutCostPredictorStoreModule.state,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should set and get fitout cost inputs dirty status', () => {
      store.commit('UPDATE_FITOUT_COST_INPUTS_DIRTY', true);    
      expect(store.getters.getAreFitoutCostInputsDirty).toBe(true); 
    });
  });
});
