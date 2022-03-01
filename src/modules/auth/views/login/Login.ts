import IVForm from "@/utils/types/IVForm";
import { Vue, Component, Ref } from "vue-property-decorator";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { service } from "@/utils/services/ServiceProvider";
import { emailRule, requiredRule } from "@/utils/rules";
import { EServices } from "@/types";
import { EUserType, IAccount, IAuthClient } from "../../types";
import { IAdminUsersClient } from "@/modules/admins/types";
import { IPractitonersClient } from "@/modules/practitioners/types";
import { IOrganizationsClient } from "@/modules/organizations/types";

@Component({
  components: {
    VPasswordField
  }
})
export default class Login extends Vue {
  email = "";
  password = "";
  signingIn = false;

  @service(EServices.auth)
  auth!: IAuthClient;

  @service(EServices.adminUsers)
  adminsClient!: IAdminUsersClient;

  @service(EServices.practitioners)
  practitionersClient!: IPractitonersClient;

  @service(EServices.organizations)
  organizationsClient!: IOrganizationsClient;

  @Ref()
  loginForm!: IVForm;

  requiredRule = requiredRule;
  emailRule = emailRule;

  async login() {
    if (!this.loginForm.validate()) return;
    this.signingIn = true;
    const response = await this.auth.login(
      this.email,
      this.password
    );
    this.signingIn = false;
    if (response.status == 200) {
      const account = response.data as IAccount;
      switch(account.userType) {
        case EUserType.admin:
          await this.adminsClient.getCurrent();
          break;
        case EUserType.organization:
          await this.organizationsClient.getCurrent();
          break;
        case EUserType.practitioner:
          await this.practitionersClient.getCurrent();
          break;
        default: 
          toast({ message: "unknown user"})
      }
      this.$router.replace("/dashboard");
    }
    else toast({ message: response.errors!.summary })
  }
}