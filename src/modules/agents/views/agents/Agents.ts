import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import { IAdminAgentsClient, IAgent, IAgentEditor } from "../../types";
import AgentEditor from "../../components/agent-editor/AgentEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    AgentEditor
  }
})
export default class Agents extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  
  headers = [
    {
      text: "Agent ID",
      value: "id"
    },
    {
      text: "Name",
      value: "name"
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Phone Number",
      value: "phoneNumber"
    },
    {
      text: "Available",
      value: "available"
    }
  ];

  @Ref()
  agentEditor!: IAgentEditor;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  itemClicked(agent: IAgent) {
    this.$router.push(`/dashboard/agents/details?id=${agent.id}`);
  }

  @throwsNetworkError()
  async toggleAgentAvailability(agent: IAgent) {
    toast({ loading: true, message: "Please wait..."});
    await this.agentsClient.toggleAgentAvailability(agent.id);
    this.search();
    toast({ icon: "mdi-check", iconColor: "green", message: "toggled agent's availability" });
  }

  @throwsNetworkError()
  async deleteAgent(agent: IAgent) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete agent" });
    if(!result) return;
    toast({ loading: true, message: "Deleting agent..." });
    await this.agentsClient.deleteAgent(agent.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Agent deleted"});
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.agentsClient.getAgents(
      searchString, 
      page, 
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("error.getSearchResults")
  @Watch("error.deleteAgent")
  @Watch("error.toggleAgentAvailability")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}