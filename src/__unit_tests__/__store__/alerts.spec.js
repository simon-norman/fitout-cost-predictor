import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';
import alerts from '../../store/modules/alerts';

describe('alerts.js', () => {
  let store;
  let errorStoreTestState;
  let storeElements;
  
  beforeEach(() => {
    errorStoreTestState = {
      errorStatus: false,
      errorMessage: 'noerror',  
    };

    storeElements = {
      storeModule: alerts,
      storeTestState: errorStoreTestState,
    };

    store = createStandaloneVuexStore(storeElements);
  });

  describe('Mutations updating correctly', () => {
    it('should update alert status', () => {
      expect(store.state.storeModule.errorStatus).toBe(false);
      store.commit('UPDATE_ERROR_STATUS', true);    
      expect(store.state.storeModule.errorStatus).toBe(true);
    });

    it('should update alert message', () => {
      expect(store.state.storeModule.errorMessage).toBe('noerror');
      store.commit('UPDATE_ERROR_MESSAGE', 'error');    
      expect(store.state.storeModule.errorMessage).toBe('error');
    });

    it('should get alert status', () => {
      expect(store.getters.getErrorStatus).toBe(false); 
    });

    it('should get alert message', () => {
      expect(store.getters.getErrorMessage).toBe('noerror'); 
    });
  });
});
