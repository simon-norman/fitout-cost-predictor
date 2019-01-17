import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import fitoutCategoryStoreModule from '../../store/modules/fitoutCategoryStoreModule';

describe('fitoutCategoryStoreModule.js', () => {
  let store;
  let storeElements;
  
  beforeEach(() => {
    storeElements = {
      storeModule: fitoutCategoryStoreModule,
      storeTestState: fitoutCategoryStoreModule.state,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should set to fitout category type A', () => {
      expect(store.state.storeModule.fitoutCategory.isCatAIncluded).toBe('');
      expect(store.state.storeModule.fitoutCategory.isCatBIncluded).toBe('');

      store.commit('UPDATE_CAT_A_INCLUDED');    

      expect(store.state.storeModule.fitoutCategory.isCatAIncluded).toBe(true);
      expect(store.state.storeModule.fitoutCategory.isCatBIncluded).toBe(false);
    });

    it('should set to fitout category type B', () => {
      store.commit('UPDATE_CAT_B_INCLUDED');    

      expect(store.state.storeModule.fitoutCategory.isCatAIncluded).toBe(false);
      expect(store.state.storeModule.fitoutCategory.isCatBIncluded).toBe(true);
    });

    it('should set to fitout category type A and B', () => {
      store.commit('UPDATE_CAT_AB_INCLUDED');    

      expect(store.state.storeModule.fitoutCategory.isCatAIncluded).toBe(true);
      expect(store.state.storeModule.fitoutCategory.isCatBIncluded).toBe(true);
    });

    it('should update if fitout category is valid', () => {
      expect(store.state.storeModule.isFitoutCategoryInvalid).toBe('');
      store.commit('UPDATE_IS_FITOUT_CATEGORY_INVALID', true);    
      expect(store.state.storeModule.isFitoutCategoryInvalid).toBe(true);
    });
  });

  describe('Getters returning expected data', () => {
    it('should return fitout category', () => {
      store.state.storeModule.fitoutCategory.isCatAIncluded = true;
      store.state.storeModule.fitoutCategory.isCatBIncluded = false;
      expect(store.getters.getFitoutCategory)
        .toEqual({ isCatAIncluded: true, isCatBIncluded: false }); 
    });

    it('should return that fitout category is valid', () => {
      store.state.storeModule.isFitoutCategoryInvalid = true;
      expect(store.getters.getIsFitoutCategoryInvalid).toBe(true); 
    });
  });
});
