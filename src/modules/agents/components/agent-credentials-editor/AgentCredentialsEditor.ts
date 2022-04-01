import { EServices } from "@/types";
import { emailRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import IVForm from "@/utils/types/IVForm";
import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import { IAdminAgentsClient, IAgent } from "../../types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VPasswordField
  }
})
export default class AgentCredentialsEditor extends Mixins(NetworkManagerMixin) {
  password = "";
  email = "";
  selectedAgent: number | null = null;
  dialogVisible = false;

  @Ref()
  agentCredentialsForm!: IVForm;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  emailRule = emailRule;

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
    if(!this.dialogVisible) {
      this.selectedAgent = null;
      this.agentCredentialsForm.reset();
    }
  }

  beginEditAgent(agent: IAgent) {
    this.email = agent.email;
    this.selectedAgent = agent.id;
    this.toggleDialog();
  }

  @throwsNetworkError()
  async updateAgentCredentials() {
    if(!this.agentCredentialsForm.validate()) return;
    await this.agentsClient.updateAgentCredentials(this.selectedAgent!, this.email, this.password);
    toast({ icon: "mdi-check", iconColor: "green", message: "Agent credentials updated"});
    this.$emit("saved");
    this.toggleDialog();
  }

  @Watch("error.updateAgentCredentials")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}