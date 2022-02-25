import { Component, Mixins, Ref } from "vue-property-decorator";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import { IAdminAgentsClient, IAgent, IAgentEditor } from "../../types";
import AgentEditor from "../../components/agent-editor/AgentEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";

@Component({
  components: {
    TableView,
    AgentEditor
  }
})
export default class Agents extends Mixins(TableMixin) implements ITableView<IAgent> {
  
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
  items = [];

  @Ref()
  agentEditor!: IAgentEditor;

  @service(EServices.adminAgent)
  agentsClient!: IAdminAgentsClient;

  itemClicked(agent: IAgent) {
    this.$router.push(`/dashboard/agents/details?id=${agent.id}`);
  }

  async toggleAgentAvailability(agent: IAgent) {
    toast({ loading: true, message: "Please wait..."});
    const response = await this.agentsClient.toggleAgentAvailability(agent.id);
    if(response.status == 200) {
      this.search();
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
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IAgent>> {
    const response = await this.agentsClient.getAgents(
      searchString, 
      page, 
      pageSize
    );
    if(response.status == 200) {
      return {
        items: response.data,
        numberOfPages: response.numberOfPages || 0
      }
    }
    else {
      toast({ message: response.errors!.summary })
      return {
        items: this.items,
        numberOfPages: this.numberOfPages
      }
    }
  }
}