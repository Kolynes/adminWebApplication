import Vue from "vue";
import vuex from "vuex";
import AdminModule from "./modules/admins/store/AdminModule";
import AccountModule from "./modules/auth/store/AccountModule";
import OrganizationModule from "./modules/organizations/store/OrganizationModule";
import PractitionerModule from "./modules/practitioners/store/PractitionerModule";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    AdminModule,
    AccountModule,
    OrganizationModule,
    PractitionerModule
  }
});