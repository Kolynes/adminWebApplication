import EServices from "@/types/EServices";
import IUser from "@/types/IUser";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import EOrganizationTypes from "@/types/EOrganizationTypes";
import IOrganization from "@/types/IOrganization";
import { IAdminOrganizationsClient } from "@/services/services";

interface ILoaderResponse<T> {
  items: T[];
  hasNextPage: boolean
}

export interface ISelectOrganization {
  getOrganization(): Promise<IOrganization>;
}

@Component({
  components: {
    VScrollView
  }
})
export default class SelectOrganization extends Vue implements ISelectOrganization {
  @Prop({
    type: String,
    required: true
  })
  type!: EOrganizationTypes;

  showDialog = false;
  searchString = "";
  refresh = false;
  searching = false;
  searchTimeout: number | null = null;
  organizationResolve: Function | null = null;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  async getOrganization(): Promise<IOrganization> {
    this.showDialog = true;
    return new Promise<IOrganization>((resolve) => {
      this.organizationResolve = resolve;
    }).then((organization: IOrganization) => {
      this.showDialog = false;
      return organization;
    });
  }

  async loadOrganizations(page: number): Promise<ILoaderResponse<IUser>> {
    this.searching = true;
    const response = await this.organizationsClient.getOrganizations(
      this.type,
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