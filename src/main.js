import Vue from 'vue';
import Vuelidate from 'vuelidate';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
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

import '../static/assets/css/snapspace.css';
import '../node_modules/vuetify/src/stylus/app.styl';

Vue.use(Vuelidate);

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
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
  router,
  render: h => h(App),
});
