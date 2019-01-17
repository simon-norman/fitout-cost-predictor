
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
};
  
const getters = {
  getFitoutCategory: state => state.fitoutCategory,

  getIsFitoutCategoryInvalid: state => state.isFitoutCategoryInvalid,
};
  
const state = {
  fitoutCategory: {
    isCatAIncluded: '',
    isCatBIncluded: '',
  },
  isFitoutCategoryInvalid: '',
};  
  
export default {
  state,
  mutations,
  getters,
};
  
