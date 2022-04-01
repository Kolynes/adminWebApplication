import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor } from "../../types";
import OrganizationEditor from "../../components/organization-editor/OrganizationEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { icons, organizationTypeTextPlurals, organizationTypeTexts } from "../../constants";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    OrganizationEditor
  }
})
export default class Organizations extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  @Prop({
    type: String,
    default: EOrganizationTypes.pharmacy
  })
  type!: EOrganizationTypes;

  headers = [
    {
      text: "ID",
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
    }
  ];

  @Ref()
  organizationEditor!: IOrganizationEditor;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  get organizationTypeText(): string {
    return organizationTypeTexts[this.type];
  }

  get organizationTypeTextPlural(): string {
    return organizationTypeTextPlurals[this.type];
  }

  get icon(): string {
    return icons[this.type];
  }

  itemClicked(organization: IOrganization) {
    this.$router.push(`/dashboard/${this.organizationTypeTextPlural.toLowerCase()}/details?id=${organization.id}`);
  }

  @throwsNetworkError()
  async deleteOrganization(organization: IOrganization) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete ${this.organizationTypeText}` });
    if (!result) return;
    toast({ loading: true, message: `Deleting ${this.organizationTypeText.toLowerCase()}...` });
    await this.organizationsClient.deleteOrganization(organization.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.organizationTypeText} deleted` });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.organizationsClient.getOrganizations(
      this.type,
      searchString,
      page,
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }

  @Watch("error.deleteOrganization")
  @Watch("error.getSearchResults")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}