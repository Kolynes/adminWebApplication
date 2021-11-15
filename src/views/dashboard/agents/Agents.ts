import { Component, Mixins } from "vue-property-decorator";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import IAgent from "@/types/IAgent";
import AgentEditorMixin from "@/mixins/AgentEditorMixin";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import SelectRide from "@/components/select-ride/SelectRide.vue";

@Component({
  components: {
    TableView,
    VFileField,
    VPasswordField,
    SelectRide
  }
})
export default class Agents extends Mixins(TableMixin, AgentEditorMixin) implements ITableView<IAgent> {
  
  headers = [
    {
      text: "Agent ID",
      value: "id"
    },
    {
      text: "First Name",
      value: "firstName"
    },
    {
      text: "Last Name",
      value: "lastName"
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

  itemClicked(agent: IAgent) {
    this.$router.push(`/dashboard/agents/details?id=${agent.id}`);
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