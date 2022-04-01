import { Component, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminAgentsClient, IAgent, IAgentCredentialsEditor, IAgentEditor } from "../../types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import FileGetter, { IFileGetter } from "@/components/file-getter/FileGetter";
import AgentEditor from "../../components/agent-editor/AgentEditor";
import AgentCredentialsEditor from "../../components/agent-credentials-editor/AgentCredentialsEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    ProfilePhoto,
    FileGetter,
    AgentEditor,
    AgentCredentialsEditor
  }
})
export default class AgentDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  agent: IAgent | null = null;
  loading: IIndexable<boolean> = {
    getAgent: true
  }

  @Ref()
  agentEditor!: IAgentEditor;

  @Ref()
  agentCredentialsEditor!: IAgentCredentialsEditor;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  @Ref()
  fileGetter!: IFileGetter;

  @throwsNetworkError()
  async getAgent() {
    const response = await this.agentsClient.getAgent(this.id);
    this.agent = response.data;
  }

  @throwsNetworkError()
  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if (!file) return;
    toast({ loading: true, message: "Changing profile picture..." })
    await this.agentsClient.changeProfilePhoto(id, file);
    toast({ icon: "mdi-check", iconColor: "green", message: "Profile picture changed" });
    this.getAgent();
  }

  @throwsNetworkError()
  async toggleAgentAvailability(agent: IAgent) {
    toast({ loading: true, message: "Please wait..." });
    await this.agentsClient.toggleAgentAvailability(agent.id);
    this.getAgent();
    toast(false)
    toast({ icon: "mdi-check", iconColor: "green", message: "toggled agent's availability" });
  }

  @throwsNetworkError()
  async deleteAgent(agent: IAgent) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete agent" });
    if (!result) return;
    toast({ loading: true, message: "Deleting agent..." });
    await this.agentsClient.deleteAgent(agent.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Agent deleted" });
    this.$router.back();
  }

  @Watch("error.deleteAgent")
  @Watch("error.toggleAgentAvailability")
  @Watch("error.changeProfilePhoto")
  @Watch("error.getAgent")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getAgent()
  }
}