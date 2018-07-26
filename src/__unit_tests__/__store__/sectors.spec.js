import Vue from 'vue';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
import sectors from '../../store/modules/sectors';

Vue.use(Vuex);

const testSectors = ['Retail', 'Financial services', 'Healthcare'];
const testSectorsInAlphabeticalOrder = ['Financial services', 'Healthcare', 'Retail'];

const sectorsStoreTestState = {
  sectors: testSectors,
};

const createVuexStore = () => {
  const clonedSectorsModule = cloneDeep(sectors);
  clonedSectorsModule.state = sectorsStoreTestState;

  const store = new Vuex.Store({
    modules: {
      clonedSectorsModule,
    },
  });
  return store;
};

describe('sectors.js', () => {  
  describe('Getters passing data', () => {
    it('should get list of sectors in alphabetical order', () => {
      const store = createVuexStore();
      expect(store.getters.getSectors).toEqual(testSectorsInAlphabeticalOrder);
    });
  });
});
