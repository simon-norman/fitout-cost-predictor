import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';
import {
  Vuetify,
  VApp,
  VAlert,
  VNavigationDrawer,
  VCheckbox,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VTextField,
  VGrid,
  VToolbar,
  transitions,
} from 'vuetify';

import App from './App.vue';
import router from './router';
import { store } from './store/store';

import '../static/assets/css/cost_predictor.css';
import '../node_modules/vuetify/src/stylus/app.styl';
import './assets/stylus/main.styl';

Vue.use(Vuelidate);

const isProduction = process.env.NODE_ENV === 'production';

Vue.use(VueAnalytics, {
  id: 'UA-122096477-1',
  router,
  debug: {
    enabled: !isProduction,
    sendHitTask: isProduction,
  },
});

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VCheckbox,
    VGrid,
    VTextField,
    VToolbar,
    transitions,
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
