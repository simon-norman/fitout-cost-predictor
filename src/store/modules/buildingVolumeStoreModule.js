
const mutations = {
  UPDATE_BUILDING_VOLUME_VALUE: (state, payload) => {
    state.buildingVolumeValue = payload;
  },

  UPDATE_IS_BUILDING_VOLUME_INVALID: (state, payload) => {
    state.isBuildingVolumeInvalid = payload;
  },

  UPDATE_ARE_VOLUME_INPUTS_DIRTY: (state, payload) => {
    state.areVolumeInputsDirty = payload;
  },
};
  
const getters = {
  getBuildingVolumeValue: state => state.buildingVolumeValue,

  getBuildingVolumeUnit: state => state.buildingVolumeUnit,

  getIsBuildingVolumeInvalid: state => state.isBuildingVolumeInvalid,

  getAreVolumeInputsDirty: state => state.areVolumeInputsDirty,
};
  
const state = {
  buildingVolumeValue: '',
  buildingVolumeUnit: 'Cubic foot',
  isBuildingVolumeInvalid: '',
  areVolumeInputsDirty: '',
};  
  
export default {
  state,
  mutations,
  getters,
};
  
