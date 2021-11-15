import IVForm from "@/types/IVForm";
import { Vue, Component, Ref } from "vue-property-decorator";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { service } from "@/utils/services/ServiceProvider";
import EServices from "@/types/EServices";
import { IAuthClient } from "@/services/services";
import { emailRule, requiredRule } from "@/utils/rules";

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

  @Ref()
  loginForm!: IVForm;

  requiredRule = requiredRule;
  emailRule = emailRule;

  async login() {
    if(this.loginForm.validate()) {
      this.signingIn = true;
      const response = await this.auth.login(
        this.email, 
        this.password
      );
      this.signingIn = false;
      if(response.status == 200)
        this.$router.replace("/dashboard");
      else toast({ message: response.errors!.summary })
    }
  }
}