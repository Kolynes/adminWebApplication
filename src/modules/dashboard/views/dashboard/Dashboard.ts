import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import ServiceProvider, { service } from "@/utils/services/ServiceProvider";
import { namespace } from "vuex-class";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue"
import IVForm from "@/utils/types/IVForm";
import { requiredLengthRule, requiredRule } from "@/utils/rules";
import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import { EUserType, IAccount, IAuthClient, IUser } from "@/modules/auth/types";
import { EOrganizationTypes, IOrganization } from "@/modules/organizations/types";
import { IPractitioner } from "@/modules/practitioners/types";
import IIndexableObject from "@/utils/types/IIndexableObject";

const AccountModule = namespace("AccountModule");
const AdminModule = namespace("AdminModule");
const OrganizationModule = namespace("OrganizationModule");
const PractitionerModule = namespace("PractitionerModule");


@Component({
  components: {
    VPasswordField,
  },
  beforeRouteEnter(to, from, next) {
    const storeService = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);
    if(storeService.instance.state.AccountModule.account != undefined)
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
        { 
          icon: "mdi-view-dashboard", 
          path: "/dashboard/home", 
          name: "Dashboard" 
        },
        { 
          icon: "mdi-check-all", 
          path: "/dashboard/orders", 
          name: "Orders", 
          remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
            if(account.userType == EUserType.practitioner) return true;
            return false;
          } 
        },
        // { icon: "mdi-credit-card", path: "/dashboard/subscriptions", name: "Subscriptions" },
      ]
    },
    {
      name: "Products",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.practitioner) return true;
        return false;
      },
      routes: [
        { 
          icon: "mdi-cart", 
          path: "/dashboard/drugs", 
          name: "Drugs",
          remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
            if(account.userType == EUserType.admin) return false;
            if((user as IOrganization).organizationType == EOrganizationTypes.pharmacy) return false;
            return true;
          }
        },
        { 
          icon: "mdi-package", 
          path: "/dashboard/equipment", 
          name: "Equipment",
          remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
            if(account.userType == EUserType.admin) return false;
            if((user as IOrganization).organizationType == EOrganizationTypes.OEM) return false;
            return true;
          } 
        },
      ]
    },
    {
      name: "Users",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        return true;
      },
      routes: [
        { 
          icon: "mdi-account-star", 
          path: "/dashboard/admins", 
          name: "Admins" 
        },
        { 
          icon: "mdi-account", 
          path: "/dashboard/customers", 
          name: "Customers"
        },
      ]
    },
    {
      name: "Logistics",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        return true;
      },
      routes: [
        { 
          icon: "mdi-account", 
          path: "/dashboard/agents", 
          name: "Delivery Agents" 
        },
        { 
          icon: "mdi-motorbike", 
          path: "/dashboard/rides", 
          name: "Rides" 
        },
        { 
          icon: "mdi-map", 
          path: "/dashboard/trips", 
          name: "Trips" 
        },
      ]
    },
    {
      name: "Organizations",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        return true;
      },
      routes: [
        { 
          icon: "mdi-pharmacy", 
          path: "/dashboard/pharmacies", 
          name: "Pharmacies" 
        },
        { 
          icon: "mdi-truck-delivery", 
          path: "/dashboard/oems", 
          name: "OEMs" 
        },
      ]
    },
    {
      name: "Medical Personnel",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        return true;
      },
      routes: [
        { 
          icon: "mdi-hospital", 
          path: "/dashboard/doctors", 
          name: "Doctors" 
        },
        { 
          icon: "mdi-hospital", 
          path: "/dashboard/nurses", 
          name: "Nurses" 
        },
        { 
          icon: "mdi-hospital", 
          path: "/dashboard/physiotherapists", 
          name: "Physiotherapists" 
        },
      ]
    },
    {
      name: "Medical Institutions",
      show: false,
      active: false,
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        return true;
      },
      routes: [
        { 
          icon: "mdi-hospital-building", 
          path: "/dashboard/hospitals", 
          name: "Hospitals" 
        },
        { 
          icon: "mdi-hospital-building", 
          path: "/dashboard/laboratories", 
          name: "Laboratories" 
        },
        { 
          icon: "mdi-hospital-building", 
          path: "/dashboard/ambulances", 
          name: "Ambulance Services" 
        },
      ]
    }
  ];

  routesFiltered: any[] = [];

  get user() {
    switch(this.account.userType) {
      case EUserType.admin:
        return this.admin;
      case EUserType.organization:
        return this.organization;
      case EUserType.practitioner:
        return this.practitioner;
      default:
        throw "invalid account";
    }
  }

  @Ref()
  changePasswordForm!: IVForm;

  @AccountModule.State
  account!: IAccount;

  @AdminModule.State
  admin!: IUser;

  @PractitionerModule.State
  practitioner!: IPractitioner;

  @OrganizationModule.State
  organization!: IOrganization;

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
    for(var routeHeading of this.routesFiltered)
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
    this.routesFiltered = this.routes
    .filter(
      route => !(route.remove && route.remove(this.account, this.user))
    )
    .map(
      route => ({
        ...route,
        routes: route.routes.filter(
          (childRoute: IIndexableObject) => !(childRoute.remove && childRoute.remove(this.account, this.user))
        )
      })
    );
    this.onRouteChange();
  }
}