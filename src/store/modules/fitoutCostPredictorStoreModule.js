
const mutations = {
  UPDATE_FITOUT_COST_INPUTS_DIRTY: (state, payload) => {
    state.areFitoutCostInputsDirty = payload;
  },
};
    
const getters = {
  getAreFitoutCostInputsDirty: state => state.areFitoutCostInputsDirty,
};
    
const state = {
  areFitoutCostInputsDirty: '',
};  
    
export default {
  state,
  mutations,
  getters,
};
  
