import Vue from 'vue';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
import alerts from '../../store/modules/alerts';

Vue.use(Vuex);

const createAlertsStoreTestState = () => {
  const alertsStoreTestState = {
    errorStatus: false,
    errorMessage: 'noerror',  
  };
  return alertsStoreTestState;
};

const createVuexStore = () => {
  const clonedAlertsModule = cloneDeep(alerts);
  clonedAlertsModule.state = createAlertsStoreTestState();
  const store = new Vuex.Store({
    modules: {
      clonedAlertsModule,
    },
  });
  return store;
};

describe('alerts.js', () => {  
  describe('Mutations updating correctly', () => {
    it('should update alert status', () => {
      const store = createVuexStore();
      expect(store.state.clonedAlertsModule.errorStatus).toBe(false);
      store.commit('UPDATE_ERROR_STATUS', true);    
      expect(store.state.clonedAlertsModule.errorStatus).toBe(true);
    });

    it('should update alert message', () => {
      const store = createVuexStore();
      expect(store.state.clonedAlertsModule.errorMessage).toBe('noerror');
      store.commit('UPDATE_ERROR_MESSAGE', 'error');    
      expect(store.state.clonedAlertsModule.errorMessage).toBe('error');
    });

    it('should get alert status', () => {
      const store = createVuexStore();
      expect(store.getters.getErrorStatus).toBe(false); 
    });

    it('should get alert message', () => {
      const store = createVuexStore();
      expect(store.getters.getErrorMessage).toBe('noerror'); 
    });
  });
});
