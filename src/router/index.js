import Vue from 'vue';
import Router from 'vue-router';
import FitoutCostPredictor from '@/components/FitoutCostPredictorInputForm/FitoutCostPredictor.vue';
import BuildingVolume from '@/components/FitoutCostPredictorInputForm/BuildingVolume.vue';
import Alert from '@/components/Alert.vue';
import Header from '@/components/Header.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FitoutCostPredictor',
      components: { default: FitoutCostPredictor, alert: Alert, header: Header },
    },
    {
      path: '/test',
      name: 'BuildingVolume',
      components: { default: BuildingVolume },
    },
  ],
});
