import Vue from 'vue';
import Router from 'vue-router';
import FitoutCostPredictor from '@/components/FitoutCostPredictor.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FitoutCostPredictor',
      component: FitoutCostPredictor,
    },
  ],
});
