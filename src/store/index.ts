import Vue from "vue";
import vuex from "vuex";
import AdminModule from "./AdminModule";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    AdminModule,
  }
});