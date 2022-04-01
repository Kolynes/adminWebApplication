import SelectRide from "@/modules/rides/components/select-ride/SelectRide";
import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Ref, Mixins, Watch } from "vue-property-decorator";
import { IAdminAgentsClient, IAgent, IAgentEditor } from "@/modules/agents/types";
import { EServices } from "@/types";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { ISelectRide } from "@/modules/rides/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VFileField,
    VPasswordField,
    SelectRide
  }
})
export default class AgentEditor extends Mixins(NetworkManagerMixin) implements IAgentEditor {
  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  createAgentDialogVisible = false;
  firstName = "";
  lastName = "";
  email = "";
  city = "";
  password = "";
  phoneNumber = "";
  profilePhoto: File | null = null;
  availability = false;
  selectedAgent: number | null = null;

  @Ref()
  createAgentForm!: IVForm;

  @Ref()
  selectRide!: ISelectRide;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateAgentDialog() {
    this.createAgentDialogVisible = !this.createAgentDialogVisible;
    if (!this.createAgentDialogVisible) {
      this.selectedAgent = null;
      this.createAgentForm.reset();
    }
  }

  beginEditAgent(agent: IAgent) {
    this.firstName = agent.firstName;
    this.lastName = agent.lastName;
    this.email = agent.email;
    this.phoneNumber = agent.phoneNumber;
    this.selectedAgent = agent.id;
    this.city = agent.city.toLowerCase();
    this.availability = agent.available;
    this.toggleCreateAgentDialog();
  }

  @throwsNetworkError()
  async editAgent() {
    if (!this.createAgentForm.validate()) return;
    await this.agentsClient.updateAgent(
      this.selectedAgent!,
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.availability
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Agent updated" });
    this.$emit("saved");
    this.toggleCreateAgentDialog();
  }

  @throwsNetworkError()
  async createAgent() {
    if (!this.createAgentForm.validate()) return;
    const ride = await this.selectRide.getRide();
    if (!ride) return;
    await this.agentsClient.createAgent(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.city,
      this.profilePhoto!,
      ride.id,
      this.password
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Agent created" });
    this.$emit("saved");
    this.toggleCreateAgentDialog();
  }

  @Watch("error.editAgent")
  @Watch("error.createAgent")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}
