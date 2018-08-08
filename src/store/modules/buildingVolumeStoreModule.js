
const mutations = {
  UPDATE_FLOOR_AREA: (state, payload) => {
    state.floorArea.areaValue = payload;
  },

  UPDATE_AVERAGE_FLOOR_HEIGHT: (state, payload) => {
    state.averageFloorHeight.heightValue = payload;
  },

  UPDATE_IS_BUILDING_VOLUME_INVALID: (state, payload) => {
    state.isBuildingVolumeInvalid = payload;
  },

  UPDATE_ARE_VOLUME_INPUTS_DIRTY: (state, payload) => {
    state.areVolumeInputsDirty = payload;
  },
};
  
const getters = {
  getAverageFloorHeightValue: state => state.averageFloorHeight.heightValue,

  getAverageFloorHeightUnit: state => state.averageFloorHeight.heightUnit,

  getFloorAreaValue: state => state.floorArea.areaValue,

  getFloorAreaUnit: state => state.floorArea.areaUnit,

  getIsBuildingVolumeInvalid: state => state.isBuildingVolumeInvalid,

  getAreVolumeInputsDirty: state => state.areVolumeInputsDirty,
};
  
const state = {
  floorArea: {
    areaValue: '',
    areaUnit: 'sq_ft',
  },

  averageFloorHeight: {
    heightValue: '',
    heightUnit: 'm',
  },

  isBuildingVolumeInvalid: '',
  areVolumeInputsDirty: '',
};  
  
export default {
  state,
  mutations,
  getters,
};
  
