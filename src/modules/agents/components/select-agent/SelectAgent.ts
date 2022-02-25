import ServiceProvider, { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import { IAdminAgentsClient, IAgent, IAgentEditor, ISelectAgent } from "../../types";
import { EServices } from "@/types";
import ILoaderResponse from "@/utils/types/ILoaderResponse";
import AgentEditor from "../agent-editor/AgentEditor";

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
  searching = false;
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

  async loadAgents(page: number): Promise<ILoaderResponse<IAgent>> {
    this.searching = true;
    const response = await this.agentClient.getActiveAgents(
      this.searchString || "",
      page
    );
    this.searching = false;
    if(response.status == 200) {
      return {
        items: response.data,
        hasNextPage: response.hasNextPage as boolean
      };
    }
    else return {
      items: [],
      hasNextPage: false
    };
  }

  @Watch("searchString")
  onSearchStringChanged() {
    if(this.searchTimeout != null)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => this.refresh = true, 500)
  }
}