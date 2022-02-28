import { EServices } from "@/types";
import { emailRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import IVForm from "@/utils/types/IVForm";
import { Component, Ref, Vue } from "vue-property-decorator";
import { IAdminAgentsClient, IAgent } from "../../types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";

@Component({
  components: {
    VPasswordField
  }
})
export default class AgentCredentialsEditor extends Vue {
  password = "";
  email = "";
  selectedAgent: number | null = null;
  dialogVisible = false;
  updating = false;
  emailErrors = [];
  passwordErrors = [];

  @Ref()
  agentCredentialsForm!: IVForm;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  emailRule = emailRule;

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  beginEditAgent(agent: IAgent) {
    this.email = agent.email;
    this.selectedAgent = agent.id;
    this.toggleDialog();
  }

  async updateAgentCredentials() {
    if(!this.agentCredentialsForm.validate()) return;
    this.updating = true;
    const response = await this.agentsClient.updateAgentCredentials(this.selectedAgent!, this.email, this.password);
    this.updating = false;
    if(response.status == 200) {
      toast({ message: "Agent credentials updated"});
      this.$emit("saved");
      this.toggleDialog();
      this.selectedAgent = null;
    }
    else {
      toast({ message: response.errors!.summary });
      this.emailErrors = response.errors!.fields.email;
      this.passwordErrors = response.errors!.fields.password;
    }
  }
}