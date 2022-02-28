import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminAgentsClient, IAgent, IAgentCredentialsEditor, IAgentEditor } from "../../types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import FileGetter, { IFileGetter } from "@/components/file-getter/FileGetter";
import AgentEditor from "../../components/agent-editor/AgentEditor";
import AgentCredentialsEditor from "../../components/agent-credentials-editor/AgentCredentialsEditor";

@Component({
  components: {
    ProfilePhoto,
    FileGetter,
    AgentEditor,
    AgentCredentialsEditor
  }
})
export default class AgentDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  agent: IAgent | null = null;
  loading = true;

  @Ref()
  agentEditor!: IAgentEditor;

  @Ref()
  agentCredentialsEditor!: IAgentCredentialsEditor;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  @Ref()
  fileGetter!: IFileGetter;

  async getAgent() {
    const response = await this.agentsClient.getAgent(this.id);
    this.loading = false;
    if(response.status == 200)
      this.agent = response.data;
    else toast({ message: "Agent not found"});
  }

  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if (file !== null) {
      toast({ loading: true, message: "Changing profile picture..." })
      const response = await this.agentsClient.changeProfilePhoto(id, file);
      if (response.status == 200) {
        toast({ message: "Profile picture changed" });
        this.getAgent();
      }
      else toast({ message: "Failed to change profile picture" });
    }
  }

  async toggleAgentAvailability(agent: IAgent) {
    toast({ loading: true, message: "Please wait..."});
    const response = await this.agentsClient.toggleAgentAvailability(agent.id);
    if(response.status == 200) {
      this.getAgent();
      toast(false)
      toast({ message: "toggled agent's availability" });
    }
    else toast({ message: response.errors!.summary })
  }

  deleteAgent(agent: IAgent) {
    confirm({ icon: "mdi-delete", title: "Delete agent" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting agent..." });
        const response = await this.agentsClient.deleteAgent(agent.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Agent deleted"});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() { 
    this.getAgent()
  }
}