
const mutations = {
  UPDATE_CAT_A_INCLUDED: (state) => {
    state.fitoutCategory.isCatAIncluded = true;
    state.fitoutCategory.isCatBIncluded = false;
  },

  UPDATE_CAT_B_INCLUDED: (state) => {
    state.fitoutCategory.isCatAIncluded = false;
    state.fitoutCategory.isCatBIncluded = true;
  },

  UPDATE_CAT_AB_INCLUDED: (state) => {
    state.fitoutCategory.isCatAIncluded = true;
    state.fitoutCategory.isCatBIncluded = true;
  },

  UPDATE_IS_FITOUT_CATEGORY_INVALID: (state, payload) => {
    state.isFitoutCategoryInvalid = payload;
  },

  UPDATE_FITOUT_CATEGORY_INPUTS_DIRTY: (state, payload) => {
    state.areFitoutCategoryInputsDirty = payload;
  },
};
  
const getters = {
  getAreFitoutCategoryInputsDirty: state => state.areFitoutCategoryInputsDirty,

  getIsFitoutCategoryInvalid: state => state.isFitoutCategoryInvalid,

  getFitoutCategory: state => state.fitoutCategory,
};
  
const state = {
  fitoutCategory: {
    isCatAIncluded: '',
    isCatBIncluded: '',
  },
  isFitoutCategoryInvalid: '',
  areFitoutCategoryInputsDirty: '',
};  
  
export default {
  state,
  mutations,
  getters,
};
  
