import sectors from '../../store/modules/sectors';
import { createStandaloneVuexStore } from '../__helpers__/standaloneVuexStoreFactory';

describe('sectors.js', () => {
  let testSectors;
  let storeElements;

  beforeEach(() => {
    testSectors = ['Retail', 'Financial services', 'Healthcare'];

    storeElements = {
      storeModule: sectors,
      storeTestState: {
        sectors: testSectors,
      },
    };
  });

  describe('Getters passing data', () => {
    it('should get list of sectors in alphabetical order', () => {
      const store = createStandaloneVuexStore(storeElements);
      expect(store.getters.getSectors).toEqual(testSectors.sort());
    });
  });
});
