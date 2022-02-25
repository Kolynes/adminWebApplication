import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor } from "../../types";
import OrganizationEditor from "../../components/organization-editor/OrganizationEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { icons, organizationTypeTextPlurals, organizationTypeTexts } from "../../constants";

@Component({
  components: {
    TableView,
    OrganizationEditor
  }
})
export default class Organizations extends Mixins(TableMixin) implements ITableView<IOrganization> {
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
  items = [];

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

  deleteOrganization(organization: IOrganization) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.organizationTypeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.organizationTypeText.toLowerCase()}...` });
        const response = await this.organizationsClient.deleteOrganization(organization.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.organizationTypeText} deleted`});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IOrganization>> {
    const response = await this.organizationsClient.getOrganizations(
      this.type,
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

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}