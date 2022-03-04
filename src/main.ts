import "@/services";
import "./assets/css/material.scss"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import ServiceProvider from './utils/services/ServiceProvider';
import { IStoreService } from './services/types';
import { EServices } from './types';

Vue.config.productionTip = false;

const serviceProvider = ServiceProvider.getInstance();
const store = serviceProvider.getService<IStoreService>(EServices.store).instance;
store.commit("AccountModule/getAccount");
store.commit("AdminModule/getAdmin");
store.commit("OrganizationModule/getOrganization");
store.commit("PractitionerModule/getPractitioner");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
