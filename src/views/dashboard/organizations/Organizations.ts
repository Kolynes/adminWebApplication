import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import IOrganization from "@/types/IOrganization";
import { Component, Mixins, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import OrganizationsEditorMixin from "@/mixins/OrganizationsEditorMixin";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";

@Component({
  components: {
    TableView,
    VPasswordField,
    VFileField
  }
})
export default class Organizations extends Mixins(TableMixin, OrganizationsEditorMixin) implements ITableView<IOrganization> {

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
    },
    {
      text: "Address",
      value: "address"
    }
  ];
  items = [];

  itemClicked(organization: IOrganization) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${organization.id}`);
  }

  deleteOrganization(organization: IOrganization) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.organizationsClient.deleteOrganization(organization.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.typeText} deleted`});
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