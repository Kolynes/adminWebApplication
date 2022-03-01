import Vue from "vue";
import vuex from "vuex";
import AdminModule from "./modules/admins/store/AdminModule";
import AccountModule from "./modules/auth/store/AccountModule";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    AdminModule,
    AccountModule
  }
});