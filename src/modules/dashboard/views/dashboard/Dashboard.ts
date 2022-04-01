import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import ServiceProvider, { service } from "@/utils/services/ServiceProvider";
import { namespace } from "vuex-class";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue"
import IVForm from "@/utils/types/IVForm";
import { requiredLengthRule, requiredRule } from "@/utils/rules";
import { EServices } from "@/types";
import { EUserType, IAccount, IAuthClient, IUser } from "@/modules/auth/types";
import { IOrganization } from "@/modules/organizations/types";
import { IPractitioner } from "@/modules/practitioners/types";
import IIndexableObject from "@/utils/types/IIndexable";
import { productsLinks } from "@/modules/products/constants";
import { paymentsLinks } from "@/modules/payments/constants";
import { organizationLinks } from "@/modules/organizations/constants";
import { medicalInstitutionsLinks, medicalPersonnelLinks } from "@/modules/practitioners/constants";
import { usersLinks } from "@/modules/admins/constants";
import { logisticsLinks } from "@/modules/agents/constants";
import { DashboardLink } from "../../types";

const AccountModule = namespace("AccountModule");
const AdminModule = namespace("AdminModule");
const OrganizationModule = namespace("OrganizationModule");
const PractitionerModule = namespace("PractitionerModule");

@Component({
  components: {
    VPasswordField,
  }
})
export default class Dashboard extends Vue {
  changePasswordDialogVisible = false
  changingPassword = false;
  oldPassword = "";
  newPassword = "";

  routes: DashboardLink[] = [
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
            if (account.userType == EUserType.practitioner) return true;
            return false;
          }
        },
      ]
    },
    productsLinks,
    paymentsLinks,
    usersLinks,
    logisticsLinks,
    organizationLinks,
    medicalPersonnelLinks,
    medicalInstitutionsLinks
  ];

  routesFiltered: any[] = [];

  get user() {
    switch (this.account.userType) {
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

  toggleRouteHeading(routeHeading: { show: boolean }) {
    routeHeading.show = !routeHeading.show;
  }

  showLogoutDialog() {
    confirm({
      icon: "mdi-power",
      title: "Logout"
    }).then(result => result ? this.logout() : null)
  }

  toggleChangePasswordDialog() {
    this.changePasswordDialogVisible = !this.changePasswordDialogVisible;
  }

  async logout() {
    toast({ loading: true, message: "Please wait" });
    const response = await this.authClient.logout();
    toast(false);
    if (response)
      this.$router.replace("/login");
  }

  async changePassword() {
    if (this.changePasswordForm.validate()) {

    }
  }

  @Watch("$route.path")
  onRouteChange() {
    for (var routeHeading of this.routesFiltered)
      for (var route of routeHeading.routes)
        if (this.$route.path.startsWith(route.path)) {
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