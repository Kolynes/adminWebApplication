import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { EPractitionerTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor } from "../../types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { typeTextPlurals, typeTexts } from "../../constants";
import PractitionerEditor from "../../components/practitioner-editor/PractitionerEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    PractitionerEditor
  }
})
export default class Practitioners extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  @Prop({
    type: String,
    default: EPractitionerTypes.doctor
  })
  type!: EPractitionerTypes;

  @service(EServices.adminPractitioners)
  practitionersClient!: IAdminPractitionersClient;

  @Ref()
  practitionerEditor!: IPractitionerEditor;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

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
      text: "Phone Number",
      value: "phoneNumber"
    },
    {
      text: "Address",
      value: "address"
    },
    {
      text: "Company",
      value: "companyName"
    }
  ];

  itemClicked(practitioner: IPractitioner) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${practitioner.id}`);
  }

  @throwsNetworkError()
  async deletePractitioner(practitioner: IPractitioner) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` });
    if (!result) return;
    toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
    await this.practitionersClient.deletePractitioner(practitioner.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} deleted` });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.practitionersClient.getPractitioners(
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

  @Watch("error.deletePractitioner")
  @Watch("error.getSearchResults")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}