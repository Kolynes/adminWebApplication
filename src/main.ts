import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import "./assets/css/material.scss"
import "@/services";
import ServiceProvider from './utils/services/ServiceProvider';
import { IStoreService } from './services/services';
import EServices from './types/EServices';

Vue.config.productionTip = false;

const serviceProvider = ServiceProvider.getInstance();
const store = serviceProvider.getService<IStoreService>(EServices.store).instance;
store.commit("AdminModule/getAdmin");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
