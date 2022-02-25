import { IUser } from "@/modules/auth/types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor, ISelectOrganization } from "../../types";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import ILoaderResponse from "@/utils/types/ILoaderResponse";
import OrganizationEditor from "../organization-editor/OrganizationEditor";
import { icons } from "../../constants";

@Component({
  components: {
    VScrollView,
    OrganizationEditor
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

  @Ref()
  organizationEditor!: IOrganizationEditor;

  get icon(): string {
    return icons[this.type];
  }

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