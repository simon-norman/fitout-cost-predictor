
const mutations = {
  UPDATE_BUILDING_VOLUME_VALUE: (state, payload) => {
    state.buildingVolumeValue = payload;
  },
};
  
/* const getters = {
  getErrorMessage: state => state.errorMessage,
  
  getErrorStatus: state => state.errorStatus,
}; */
  
const state = {
  buildingVolumeValue: '',
  buildingVolumeUnit: 'Cubic foot',
};  
  
export default {
  state,
  mutations,
/*   getters, */
};
  
