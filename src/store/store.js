import Vue from 'vue';
import Vuex from 'vuex';
import alerts from './modules/alerts';
import buildingVolumeStoreModule from './modules/buildingVolumeStoreModule';
import fitoutCategoryStoreModule from './modules/fitoutCategoryStoreModule';
import fitoutCostPredictorStoreModule from './modules/fitoutCostPredictorStoreModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alerts,
    buildingVolumeStoreModule,
    fitoutCategoryStoreModule,
    fitoutCostPredictorStoreModule,
  },
});

