import { Vue, Component, Watch } from "vue-property-decorator";
import Notifications from "@/views/notifications/Notifications.vue";
import ServiceProvider from "@/utils/services/ServiceProvider";
import { IAuthClient, IStoreService } from "@/services/services";
import EServices from "@/types/EServices";
import { namespace } from "vuex-class";
import IUser from "@/types/IUser";

const AdminModule = namespace("AdminModule");

@Component({
  components: {
    Notifications
  },
  beforeRouteEnter(to, from, next) {
    const storeService = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);
    console.log(storeService.instance.state.AdminModule.admin)
    if(storeService.instance.state.AdminModule.admin != undefined)
      next();
    else next("/login");
  }
})
export default class Dashboard extends Vue {
  authClient = ServiceProvider.getInstance().getService<IAuthClient>(EServices.auth);
  notificationsVisible = false;

  routes = [
    {
      name: "Main",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-view-dashboard", path: "/dashboard/home", name: "Dashboard" },
        { icon: "mdi-check-all", path: "/dashboard/orders", name: "Orders" },
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
      name: "Agents & Rides",
      show: false,
      active: false,
      routes: [
        { icon: "mdi-motorbike", path: "/dashboard/agents", name: "Delivery Agents" },
        { icon: "mdi-motorbike", path: "/dashboard/rides", name: "Rides" },
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

  @AdminModule.State
  admin!: IUser;

  toggleNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
  }

  toggleRouteHeading(routeHeading: {show: boolean}) {
    routeHeading.show = !routeHeading.show;
  }

  showLogoutDialog() {
    confirm({
      icon: "mdi-power",
      title: "Logout"
    }).then(result => result? this.logout() : null)
  }

  async logout() {
    toast({loading: true, message: "Please wait"});
    const response = await this.authClient.logout();
    toast(false);
    if(response.status == 200)
      this.$router.replace("/login");
  }

  @Watch("$route.path")
  onRouteChange() {
    console.log(this.$route.path)
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