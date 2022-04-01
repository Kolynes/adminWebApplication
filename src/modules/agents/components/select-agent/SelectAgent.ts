import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import { IAdminAgentsClient, IAgent, IAgentEditor, ISelectAgent } from "../../types";
import { EServices } from "@/types";
import ILoaderResponse from "@/utils/types/ILoaderResponse";
import AgentEditor from "../agent-editor/AgentEditor";
import { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VScrollView,
    AgentEditor
  }
})
export default class SelectAgent extends Vue implements ISelectAgent {
  showDialog = false;
  searchString = "";
  refresh = false;
  searchTimeout: number | null = null;
  agentResolve: Function | null = null;

  @service(EServices.adminAgent)
  agentClient!: IAdminAgentsClient;
  
  @Ref()
  agentEditor!: IAgentEditor;

  async getAgent(): Promise<IAgent> {
    this.showDialog = true;
    return new Promise<IAgent>((resolve) => {
      this.agentResolve = resolve;
    }).then((user: IAgent) => {
      this.showDialog = false;
      return user;
    });
  }

  @throwsNetworkError()
  async loadAgents(page: number): Promise<ILoaderResponse> {
    const response = await this.agentClient.getActiveAgents(
      this.searchString || "",
      page
    );
    return {
      items: response.data,
      hasNextPage: response.hasNextPage as boolean
    };
  }

  @Watch("searchString")
  onSearchStringChanged() {
    if(this.searchTimeout != null)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => this.refresh = true, 500)
  }

  @Watch("error.loadAgents")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}