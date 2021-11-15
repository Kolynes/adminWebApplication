import { IAdminAgentsClient } from "@/services/services";
import EServices from "@/types/EServices";
import IUser from "@/types/IUser";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";

interface ILoaderResponse<T> {
  items: T[];
  hasNextPage: boolean
}

export interface ISelectAgent {
  getAgent(): Promise<IUser>;
}

@Component({
  components: {
    VScrollView
  }
})
export default class SelectAgent extends Vue {
  showDialog = false;
  searchString = "";
  refresh = false;
  searching = false;
  searchTimeout: number | null = null;
  agentResolve: Function | null = null;

  @service(EServices.adminAgent)
  agentClient!: IAdminAgentsClient;

  async getAgent(): Promise<IUser> {
    this.showDialog = true;
    return new Promise<IUser>((resolve) => {
      this.agentResolve = resolve;
    }).then((user: IUser) => {
      this.showDialog = false;
      return user;
    });
  }

  async loadAgents(page: number): Promise<ILoaderResponse<IUser>> {
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