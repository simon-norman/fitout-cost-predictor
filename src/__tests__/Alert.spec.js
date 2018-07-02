
import mockAxios from 'axios';
import testUtilsWrapperFactory from './helpers/test_utils_wrapper_factory';
import FitoutCostPredictor from '../components/FitoutCostPredictor.vue';

jest.mock('axios');

const createMutations = () => {
  const mutations = {
    UPDATE_ERROR_STATUS: jest.fn(() => ''),
  };
  return mutations;
};

const createGetters = () => {
  const getters = {
    getErrorMessage: () => 'error',
    getErrorStatus: () => true,
  };
  return getters;
};

describe('Alert.vue', () => {
  describe('Display alert', () => {
  });
});
