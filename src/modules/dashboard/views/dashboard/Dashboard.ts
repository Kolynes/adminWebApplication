import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import ServiceProvider, { service } from "@/utils/services/ServiceProvider";
import { namespace } from "vuex-class";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue"
import IVForm from "@/utils/types/IVForm";
import { requiredLengthRule, requiredRule } from "@/utils/rules";
import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import { IAuthClient, IUser } from "@/modules/auth/types";
import { IAdminDashboardClient } from "../../types";

const AdminModule = namespace("AdminModule");

@Component({
  components: {
    VPasswordField,
  },
  beforeRouteEnter(to, from, next) {
    const storeService = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);
    if(storeService.instance.state.AdminModule.admin != undefined)
      next();
    else next("/login");
  }
})
export default class Dashboard extends Vue {
  changePasswordDialogVisible = false
  changingPassword = false;
  oldPassword = "";
  newPassword = "";

  routes = [
    {
      name: "Main",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-view-dashboard", path: "/dashboard/home", name: "Dashboard" },
        { icon: "mdi-check-all", path: "/dashboard/orders", name: "Orders" },
        // { icon: "mdi-credit-card", path: "/dashboard/subscriptions", name: "Subscriptions" },
      ]
    },
    {
      name: "Products",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-cart", path: "/dashboard/drugs", name: "Drugs" },
        { icon: "mdi-package", path: "/dashboard/equipment", name: "Equipment" },
      ]
    },
    {
      name: "Users",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-account-star", path: "/dashboard/admins", name: "Admins" },
        { icon: "mdi-account", path: "/dashboard/customers", name: "Customers" },
      ]
    },
    {
      name: "Logistics",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-account", path: "/dashboard/agents", name: "Delivery Agents" },
        { icon: "mdi-motorbike", path: "/dashboard/rides", name: "Rides" },
        { icon: "mdi-map", path: "/dashboard/trips", name: "Trips" },
      ]
    },
    {
      name: "Organizations",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-pharmacy", path: "/dashboard/pharmacies", name: "Pharmacies" },
        { icon: "mdi-truck-delivery", path: "/dashboard/oems", name: "OEMs" },
      ]
    },
    {
      name: "Medical Personnel",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-hospital", path: "/dashboard/doctors", name: "Doctors" },
        { icon: "mdi-hospital", path: "/dashboard/nurses", name: "Nurses" },
        { icon: "mdi-hospital", path: "/dashboard/physiotherapists", name: "Physiotherapists" },
      ]
    },
    {
      name: "Medical Institutions",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-hospital-building", path: "/dashboard/hospitals", name: "Hospitals" },
        { icon: "mdi-hospital-building", path: "/dashboard/laboratories", name: "Laboratories" },
        { icon: "mdi-hospital-building", path: "/dashboard/ambulances", name: "Ambulance Services" },
      ]
    }
  ];

  accountOptions = [
    // {
    //   name: "Account Profile",
    //   icon: "mdi-account",
    //   click: () => null,
    //   to: "/dashboard/account",
    // },
    {
      name: "Change Password",
      icon: "mdi-lock",
      click: () => this.toggleChangePasswordDialog(),
      to: "",
    },
    {
      name: "Logout",
      icon: "mdi-power",
      click: () => this.showLogoutDialog(),
      to: "",
    },
  ];

  @Ref()
  changePasswordForm!: IVForm;

  @AdminModule.State
  admin!: IUser;

  @service(EServices.auth)
  authClient!: IAuthClient;

  requiredRule = requiredRule;
  requiredLengthRule = requiredLengthRule;

  toggleRouteHeading(routeHeading: {show: boolean}) {
    routeHeading.show = !routeHeading.show;
  }

  showLogoutDialog() {
    confirm({
      icon: "mdi-power",
      title: "Logout"
    }).then(result => result? this.logout() : null)
  }

  toggleChangePasswordDialog() {
    this.changePasswordDialogVisible = !this.changePasswordDialogVisible;
  }

  async logout() {
    toast({loading: true, message: "Please wait"});
    const response = await this.authClient.logout();
    toast(false);
    if(response)
      this.$router.replace("/login");
  }

  async changePassword() {
    if(this.changePasswordForm.validate()) {
      
    }
  }

  @Watch("$route.path")
  onRouteChange() {
    for(var routeHeading of this.routes)
      for(var route of routeHeading.routes)
        if(this.$route.path.startsWith(route.path)){
          routeHeading.show = true;
          routeHeading.active = true;
          break;
        } else {
          routeHeading.active = false;
          routeHeading.show = false;
        }
  }

  mounted() {
    this.onRouteChange();
  }
}