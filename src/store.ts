import Vue from "vue";
import vuex from "vuex";
import AdminModule from "./modules/auth/store/AdminModule";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    AdminModule,
  }
});