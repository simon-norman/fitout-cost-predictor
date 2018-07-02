
const mutations = {
  UPDATE_ERROR_MESSAGE: (state, payload) => {
    state.errorMessage = payload;
  },

  UPDATE_ERROR_STATUS: (state, payload) => {
    state.errorStatus = payload;
  },
};

const getters = {
  getErrorMessage: state => state.errorMessage,

  getErrorStatus: state => state.errorStatus,
};

const state = {
  errorStatus: false,
  errorMessage: '',
};  

export default {
  state,
  mutations,
  getters,
};
