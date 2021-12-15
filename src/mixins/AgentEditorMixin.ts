import { IFileGetter } from "@/components/file-getter/FileGetter";
import { ISelectRide } from "@/components/select-ride/SelectRide";
import { IAdminAgentsClient } from "@/services/services";
import EServices from "@/types/EServices";
import IAgent from "@/types/IAgent";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref } from "vue-property-decorator";

@Component
export default class AgentEditorMixin extends Vue {
  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  createAgentDialogVisible = false;
  name = "";
  email = "";
  password = "";
  phoneNumber = "";
  profilePhoto: File | null = null;
  availability = false;
  creatingAgent = false;
  selectedAgent: number | null = null;

  @Ref()
  createAgentForm!: IVForm;

  @Ref()
  selectRide!: ISelectRide;

  @Ref()
  fileGetter!: IFileGetter;

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
    this.name = agent.name;
    this.email = agent.email;
    this.phoneNumber = agent.phoneNumber;
    this.selectedAgent = agent.id;
    this.availability = agent.available;
    this.toggleCreateAgentDialog();
  }

  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing profile picture..."})
      const response = await this.agentsClient.changeProfilePhoto(id, file);
      if(response.status == 200)
        toast({ message: "Profile picture changed" });
      else toast({ message: "Failed to change profile picture" });
    }
  }

  async editAgent() {
    if (this.createAgentForm.validate()) {
      this.creatingAgent = true;
      const response = await this.agentsClient.updateAgent(
        this.selectedAgent!,
        this.name,
        this.email,
        this.phoneNumber,
        this.availability
      );
      this.creatingAgent = false;
      if (response.status == 200) {
        toast({ message: "Agent updated" });
        this.toggleCreateAgentDialog();
        this.selectedAgent = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createAgent() {
    if (this.createAgentForm.validate()) {
      this.creatingAgent = true;
      const ride = await this.selectRide.getRide();
      const response = await this.agentsClient.createAgent(
        this.name,
        this.email,
        this.phoneNumber,
        this.profilePhoto!,
        ride.id,
        this.password
      );
      this.creatingAgent = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: "Agent created" });
        this.toggleCreateAgentDialog()
        this.selectedAgent = null
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
